import { redirectFromFandom, redirectFromSearchEngine } from "./redirects.js"

describe("Fandom redirect", () => {
    it.each([
        {
            url: "https://calamitymod.fandom.com/wiki/Faster_Attacks_Support",
            expected: "https://calamitymod.wiki.gg/wiki/Faster_Attacks_Support",
        },
        {
            url: "https://calamitymod.fandom.com/wiki/Ascendancy_class",
            expected: "https://calamitymod.wiki.gg/wiki/Ascendancy_class",
        },
        {
            url: "https://calamitymod.fandom.com/wiki/Path_of_Exile_Wiki",
            expected: "https://calamitymod.wiki.gg/wiki/Path_of_Exile_Wiki",
        },
    ])("Given $url, redirect to $expected", ({ url, expected }) => {
        const actual = redirectFromFandom({ url })
        expect(actual.redirectUrl).toBe(expected)
    })
})

describe("Test queries against all Search Engines redirect", () => {
    // Setup different Search Engine urls to test against
    const googleUrls = [
        "https://google.com/search?",
        "https://www.google.com/search?"
    ]

    const duckduckgoUrls = [
        "https://duckduckgo.com/?",
        "https://www.duckduckgo.com/?"
    ]

    // The base redirect result URL to expect from each search engine
    const redirectBaseUrls = {
        google: "https://www.google.com/search?q=site:calamitymod.wiki.gg+",
        duckduckgo: "https://www.duckduckgo.com/?q=site:calamitymod.wiki.gg+"
    }

    // Run the tests for a given search engine
    runTestQueries(googleUrls, "google")
    runTestQueries(duckduckgoUrls, "duckduckgo")

    function runTestQueries(urlCollection, searchEngine) {
        const redirectBaseUrl = redirectBaseUrls[searchEngine]

        urlCollection.forEach(baseUrl =>
            it.each([
                {
                    url: baseUrl + "q=calamity+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks"
                },
                // Noisy query parameters cases
                {
                    url: baseUrl + "client=firefox-b-1-d&q=calamitywiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=calamitywiki+faster+attacks&rlz=1CDSA2EA_enUS653US116&oq=calamity+test+wiki&aqs=chrome..6213i57j64.1j7&sourceid=chrome&ie=UTF-8",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=calamitywiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                // Wildcard *calamity*wiki* cases
                {
                    url: baseUrl + "q=calamity+wiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=calamity++wiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=calamity+faster+attacks+wiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+calamity+attacks+wiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+attacks+calamity+wiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+attacks+calamitywiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+calamitywiki+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                // Making sure words that happen to contain "calamity", "wiki" or "calamitywiki" do not get filtered
                {
                    url: baseUrl + "q=calamity+acalamity+calamitya+acalamitya+awiki+wikia+awikia+wiki+acalamitywiki+calamitywikia+acalamitywikia+calamityawiki",
                    expected: redirectBaseUrl + "acalamity+calamitya+acalamitya+awiki+wikia+awikia+acalamitywiki+calamitywikia+acalamitywikia+calamityawiki",
                },
            ])(searchEngine + " - Given $url, redirect to $expected", ({ url, expected }) => {
                const actual = redirectFromSearchEngine({ url })
                expect(actual.redirectUrl).toBe(expected)
            })
        )
    }
})
