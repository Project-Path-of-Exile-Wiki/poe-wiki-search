import { redirectFromFandom, redirectFromGoogle, redirectFromDdg } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://pathofexile.fandom.com/wiki/*"
// These Google patterns are written this way to prevent recursively matching on the redirect destination.
// Redirects will be generated to `/search?q=site:poewiki.net`, 
// which a naive pattern of `q=*poe*wiki*` will again match (recursively) and continue trying to redirect for (bad).
const googlePatterns = [
    "https://*.google.com/search?*q=*poe+*wiki*",
    "https://*.google.com/search?*q=*poewiki+*",
    "https://*.google.com/search?*q=*+poewiki*"
]
const duckduckgoPattern = "https://duckduckgo.com/?*q=poe+*"

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
        urls: googlePatterns,
    },
    ["blocking"],
)

chrome.webRequest.onBeforeRequest.addListener(
    redirectFromDdg,
    {
        urls: [duckduckgoPattern],
    },
    ["blocking"],
)