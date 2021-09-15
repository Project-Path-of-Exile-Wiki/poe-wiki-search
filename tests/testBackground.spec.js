const { redirect } = require("../src/handler")

describe("redirect", () => {
    it.each([
        { url: "https://pathofexile.fandom.com/wiki/contagion", expected: "https://poewiki.net/wiki/contagion" },
    ])("Properly returns new wiki url from provided - $url", ({ url, expected }) => {
        const actual = redirect({ url }).redirectUrl
        expect(actual).toBe(expected)
    })
})