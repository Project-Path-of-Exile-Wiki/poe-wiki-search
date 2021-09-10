import { redirectFromFandom, redirectFromGoogle, redirectFromDdg } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://pathofexile.fandom.com/wiki/*"
const googlePattern = "https://*.google.com/search?*q=poe+*"
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
        urls: [googlePattern],
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