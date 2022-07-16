import { redirectFromFandom, redirectFromSearchEngine } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://calamitymod.fandom.com/wiki/*"
// These Search Engine patterns are written this way to prevent recursively matching on the redirect destination.
// Redirects will be generated to include `?q=site:poewiki.net`, 
// which a naive pattern of `q=*poe*wiki*` will again match (recursively) and continue trying to redirect for (bad).

// Search engine patterns
const googlePatterns = [
    "https://*.google.com/search?*q=*calamity+*wiki*",
    "https://*.google.com/search?*q=*calamitywiki+*",
    "https://*.google.com/search?*q=*+calamitywiki*"
]

const duckduckgoPatterns = [
    "https://duckduckgo.com/?*q=*calamity+*wiki*",
    "https://duckduckgo.com/?*q=*calamitywiki+*",
    "https://duckduckgo.com/?*q=*+calamitywiki*",
    "https://*.duckduckgo.com/?*q=*calamity+*wiki*",
    "https://*.duckduckgo.com/?*q=*calamitywiki+*",
    "https://*.duckduckgo.com/?*q=*+calamitywiki*"
]

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
    redirectFromSearchEngine,
    {
        urls: [...googlePatterns, ...duckduckgoPatterns],
    },
    ["blocking"],
)