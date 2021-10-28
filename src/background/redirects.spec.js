import { redirectFromFandom, redirectFromSearchEngine } from "./redirects.js"

describe("Fandom redirect", () => {
    it.each([
        {
            url: "https://pathofexile.fandom.com/wiki/Faster_Attacks_Support",
            expected: "https://www.poewiki.net/wiki/Faster_Attacks_Support",
        },
        {
            url: "https://pathofexile.fandom.com/wiki/Ascendancy_class",
            expected: "https://www.poewiki.net/wiki/Ascendancy_class",
        },
        {
            url: "https://pathofexile.fandom.com/wiki/Path_of_Exile_Wiki",
            expected: "https://www.poewiki.net/wiki/Path_of_Exile_Wiki",
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
        google: "https://www.google.com/search?q=site:poewiki.net+",
        duckduckgo: "https://www.duckduckgo.com/?q=site:poewiki.net+"
    }

    // Run the tests for a given search engine
    runTestQueries(googleUrls, "google")
    runTestQueries(duckduckgoUrls, "duckduckgo")

    function runTestQueries(urlCollection, searchEngine) {
        const redirectBaseUrl = redirectBaseUrls[searchEngine]

        urlCollection.forEach(baseUrl =>
            it.each([
                {
                    url: baseUrl + "q=poe+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks"
                },
                // Noisy query parameters cases
                {
                    url: baseUrl + "client=firefox-b-1-d&q=poewiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=poewiki+faster+attacks&rlz=1CDSA2EA_enUS653US116&oq=poe+test+wiki&aqs=chrome..6213i57j64.1j7&sourceid=chrome&ie=UTF-8",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=poewiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                // Sanitize some special characters
                {
                    url: baseUrl + "q=\"poewiki\"+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=\"poe+wiki\"+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=\"\poe+\'\.wiki\"+faster\'+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                // Wildcard *poe*wiki* cases
                {
                    url: baseUrl + "q=poe+wiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=poe++wiki+faster+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=poe+faster+attacks+wiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+poe+attacks+wiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+attacks+poe+wiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+attacks+poewiki",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                {
                    url: baseUrl + "q=faster+poewiki+attacks",
                    expected: redirectBaseUrl + "faster+attacks",
                },
                // Making sure words that happen to contain "poe", "wiki" or "poewiki" do not get filtered
                {
                    url: baseUrl + "q=poe+apoe+poea+apoea+awiki+wikia+awikia+wiki+apoewiki+poewikia+apoewikia+poeawiki",
                    expected: redirectBaseUrl + "apoe+poea+apoea+awiki+wikia+awikia+apoewiki+poewikia+apoewikia+poeawiki",
                },
            ])(searchEngine + " - Given $url, redirect to $expected", ({ url, expected }) => {
                const actual = redirectFromSearchEngine({ url })
                expect(actual.redirectUrl).toBe(expected)
            })
        )
    }
})
