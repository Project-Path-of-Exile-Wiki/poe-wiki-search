const { getQueryVariable, redirectFromFandom, redirectFromGoogle } = require("./redirectors.js")

describe("getQueryVariable", () => {
    it.each([
        { url: "https://www.test.com/coding?hello=world", variable: "hello", expected: "world" },
        {
            url: "https://www.test.com/coding?hello=world&and=another",
            variable: "and",
            expected: "another",
        },
        {
            url: "https://www.test.com/coding?hello=world&numbers=123&and=another",
            variable: "numbers",
            expected: "123",
        },
        {
            url: "https://test.com/coding?hello=world&numbers=123&and=another",
            variable: "numbers",
            expected: "123",
        },
    ])("Properly parses '$variable' from $url", ({ url, variable, expected }) => {
        const actual = getQueryVariable(url, variable)
        expect(actual).toBe(expected)
    })
})

describe("Fandom redirect", () => {
    it.each([
        {
            url: "https://pathofexile.fandom.com/wiki/Faster_Attacks_Support",
            expected: "https://poewiki.net/wiki/Faster_Attacks_Support",
        },
        {
            url: "https://pathofexile.fandom.com/wiki/Ascendancy_class",
            expected: "https://poewiki.net/wiki/Ascendancy_class",
        },
    ])("Given $url, redirect to $expected", ({ url, expected }) => {
        const actual = redirectFromFandom({ url })
        expect(actual.redirectUrl).toBe(expected)
    })
})

describe("Google Search redirect", () => {
    it.each([
        {
            url: "https://www.google.com/search?q=poe+faster+attacks",
            expected: "https://www.google.com/search?q=site:poewiki.net+faster+attacks",
        },
        {
            url: "https://www.google.com/search?client=firefox-b-1-d&q=poe+faster+attacks",
            expected: "https://www.google.com/search?q=site:poewiki.net+faster+attacks",
        },
        {
            url: "https://www.google.com/search?q=poe+faster+attacks&rlz=1CDSA2EA_enUS653US116&oq=poe+test+wiki&aqs=chrome..6213i57j64.1j7&sourceid=chrome&ie=UTF-8",
            expected: "https://www.google.com/search?q=site:poewiki.net+faster+attacks",
        },
        {
            url: "https://google.com/search?q=poe+faster+attacks",
            expected: "https://www.google.com/search?q=site:poewiki.net+faster+attacks",
        },
    ])("Given $url, redirect to $expected", ({ url, expected }) => {
        const actual = redirectFromGoogle({ url })
        expect(actual.redirectUrl).toBe(expected)
    })
})
