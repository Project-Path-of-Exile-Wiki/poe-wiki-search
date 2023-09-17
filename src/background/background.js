import { redirectFromFandom, redirectFromSearchEngine } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://baldursgate.fandom.com/wiki/*"
// These Search Engine patterns are written this way to prevent recursively matching on the redirect destination.
// Redirects will be generated to include `?q=site:bg3.wiki`, 
// which a naive pattern of `q=*bg3*wiki*` will again match (recursively) and continue trying to redirect for (bad).

// Search engine patterns
const googlePatterns = [
    "https://*.google.com/search?*q=*bg3+*wiki*",
    "https://*.google.com/search?*q=*bg3wiki+*",
    "https://*.google.com/search?*q=*+bg3wiki*",
    "https://*.google.com/search?*q=*bg3.wiki+*",
    "https://*.google.com/search?*q=*+bg3.wiki*"
]

const duckduckgoPatterns = [
    "https://duckduckgo.com/?*q=*bg3+*wiki*",
    "https://duckduckgo.com/?*q=*bg3wiki+*",
    "https://duckduckgo.com/?*q=*+bg3wiki*",
    "https://duckduckgo.com/?*q=*bg3.wiki+*",
    "https://duckduckgo.com/?*q=*+bg3.wiki*",
    "https://*.duckduckgo.com/?*q=*bg3+*wiki*",
    "https://*.duckduckgo.com/?*q=*bg3wiki+*",
    "https://*.duckduckgo.com/?*q=*+bg3wiki*",
    "https://*.duckduckgo.com/?*q=*bg3.wiki+*",
    "https://*.duckduckgo.com/?*q=*+bg3.wiki*"
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