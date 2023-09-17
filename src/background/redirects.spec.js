import { redirectFromFandom, redirectFromSearchEngine } from "./redirects.js"

describe("Fandom redirect", () => {
    it.each([
        {
            url: "https://baldursgate.fandom.com/wiki/Acid_Splash",
            expected: "https://www.bg3.wiki/wiki/Acid_Splash",
        },
        {
            url: "https://baldursgate.fandom.com/wiki/Classes",
            expected: "https://www.bg3.wiki/wiki/Classes",
        },
        {
            url: "https://baldursgate.fandom.com/wiki/Baldur's_Gate_Wiki",
            expected: "https://www.bg3.wiki/",
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
        google: "https://www.google.com/search?q=site:bg3.wiki+",
        duckduckgo: "https://www.duckduckgo.com/?q=site:bg3.wiki+"
    }

    // Run the tests for a given search engine
    runTestQueries(googleUrls, "google")
    runTestQueries(duckduckgoUrls, "duckduckgo")

    function runTestQueries(urlCollection, searchEngine) {
        const redirectBaseUrl = redirectBaseUrls[searchEngine]

        urlCollection.forEach(baseUrl =>
            it.each([
                {
                    url: baseUrl + "q=bg3+acid+splash",
                    expected: redirectBaseUrl + "acid+splash"
                },
                // Noisy query parameters cases
                {
                    url: baseUrl + "client=firefox-b-1-d&q=bg3wiki+acid+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=bg3wiki+acid+splash&rlz=1CDSA2EA_enUS653US116&oq=bg3+test+wiki&aqs=chrome..6213i57j64.1j7&sourceid=chrome&ie=UTF-8",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=bg3wiki+acid+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                // Wildcard *bg3*wiki* cases
                {
                    url: baseUrl + "q=bg3+wiki+acid+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=bg3++wiki+acid+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=bg3+acid+splash+wiki",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=acid+bg3+splash+wiki",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=acid+splash+bg3+wiki",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=acid+splash+bg3wiki",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=acid+bg3wiki+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=acid+bg3.wiki+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                {
                    url: baseUrl + "q=bg3.wiki+acid+splash",
                    expected: redirectBaseUrl + "acid+splash",
                },
                // Making sure words that happen to contain "bg3", "wiki" or "bg3wiki" do not get filtered
                {
                    url: baseUrl + "q=bg3+abg3+bg3a+abg3a+awiki+wikia+awikia+wiki+abg3wiki+bg3wikia+abg3wikia+bg3awiki",
                    expected: redirectBaseUrl + "abg3+bg3a+abg3a+awiki+wikia+awikia+abg3wiki+bg3wikia+abg3wikia+bg3awiki",
                },
            ])(searchEngine + " - Given $url, redirect to $expected", ({ url, expected }) => {
                const actual = redirectFromSearchEngine({ url })
                expect(actual.redirectUrl).toBe(expected)
            })
        )
    }
})
