import { redirectFromFandom, searchQueryFromRequest } from "./redirects.js"

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
    //Setup different Search Engine urls to test against
    const googleUrls = [
        "https://www.google.com/search?",
        "https://google.com/search?",
    ]

    const duckduckgoUrls = [
        "https://duckduckgo.com/?",
        "https://www.duckduckgo.com/?"
    ]
    
    const bingUrls = [
        "https://www.bing.com/search?",
        "https://bing.com/search?"
    ]

    const yahooUrls = [
        "https://www.yahoo.com/search?",
        "https://yahoo.com/search?",
        "https://search.yahoo.com/search?"
    ]

    //The base redirect result URL to expect from each search engine
    const redirectHost = new Map()
    redirectHost.set("google", "https://www.google.com/search?q=site:poewiki.net+")
    redirectHost.set("duckduckgo", "https://www.duckduckgo.com/?q=site:poewiki.net+")
    redirectHost.set("bing", "https://www.bing.com/search?q=site:poewiki.net+") 
    redirectHost.set("yahoo", "https://www.yahoo.com/search?q=site:poewiki.net+")

    //Run the tests for a given search engine
    runTestQueries(googleUrls, "google")
    runTestQueries(duckduckgoUrls, "duckduckgo")
    runTestQueries(bingUrls, "bing")
    runTestQueries(yahooUrls, "yahoo")

    function runTestQueries(urlCollection, searchEngine) {
        urlCollection.forEach(urlHost =>
            it.each([
                {
                    url: urlHost + "q=poe+faster+attacks",
                    expected: redirectHost.get(searchEngine) + "faster+attacks"
                },
                // Noisy query parameters cases
                {
                    url: urlHost + "client=firefox-b-1-d&q=poewiki+faster+attacks",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=poewiki+faster+attacks&rlz=1CDSA2EA_enUS653US116&oq=poe+test+wiki&aqs=chrome..6213i57j64.1j7&sourceid=chrome&ie=UTF-8",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=poewiki+faster+attacks",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                // Wildcard *poe*wiki* cases
                {
                    url: urlHost + "q=poe+wiki+faster+attacks",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=poe++wiki+faster+attacks",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=poe+faster+attacks+wiki",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=faster+poe+attacks+wiki",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=faster+attacks+poe+wiki",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=faster+attacks+poewiki",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                {
                    url: urlHost + "q=faster+poewiki+attacks",
                    expected: redirectHost.get(searchEngine) + "faster+attacks",
                },
                // Making sure words that happen to contain "poe", "wiki" or "poewiki" do not get filtered
                {
                    url: urlHost + "q=poe+apoe+poea+apoea+awiki+wikia+awikia+wiki+apoewiki+poewikia+apoewikia+poeawiki",
                    expected: redirectHost.get(searchEngine) + "apoe+poea+apoea+awiki+wikia+awikia+apoewiki+poewikia+apoewikia+poeawiki",
                },
            ])(searchEngine + " - Given $url, redirect to $expected", ({ url, expected }) => {
                const actual = searchQueryFromRequest({ url })
                expect(actual.redirectUrl).toBe(expected)
            })
        )
    }
})
