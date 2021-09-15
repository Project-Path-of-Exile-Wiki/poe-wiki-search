import { redirectFromFandom, redirectFromGoogle } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://pathofexile.fandom.com/wiki/*"
// These Google patterns are written this way to prevent recursively matching on the redirect destination.
// Redirects will be to `/search?q=site:poewiki.net` which a naive pattern of `q=*poe*wiki*` will match and continuously redirect for.
const googlePattern1 = "https://*.google.com/search?*q=*poe+*wiki*"
const googlePattern2 = "https://*.google.com/search?*q=*poewiki+*"
const googlePattern3 = "https://*.google.com/search?*q=*+poewiki*"

// Instruction for the browser to redirect based on pattern.
// `chrome` used instead of `browser` for compat since Firefox supports
// both chrome and browser, but chrome(ium) only supports chrome prefix afaik.
chrome.webRequest.onBeforeRequest.addListener(
    redirectFromFandom,
    {
        urls: [fandomPattern],
    },
    ["blocking"],
)

chrome.webRequest.onBeforeRequest.addListener(
    redirectFromGoogle,
    {
        urls: [googlePattern1, googlePattern2, googlePattern3],
    },
    ["blocking"],
)
