import { redirectFromFandom, searchQueryFromRequest } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://pathofexile.fandom.com/wiki/*"
// These Search Engine patterns are written this way to prevent recursively matching on the redirect destination.
// Redirects will be generated to include `?q=site:poewiki.net`, 
// which a naive pattern of `q=*poe*wiki*` will again match (recursively) and continue trying to redirect for (bad).
const searchEnginePatterns = [
    //Google
    "https://*.google.com/search?*q=*poe+*wiki*",
    "https://*.google.com/search?*q=*poewiki+*",
    "https://*.google.com/search?*q=*+poewiki*",

    //DuckDuckGo
    "https://duckduckgo.com/?*q=*poe+*wiki*",
    "https://duckduckgo.com/?*q=*poewiki+*",
    "https://duckduckgo.com/?*q=*+poewiki*",
    "https://*.duckduckgo.com/?*q=*poe+*wiki*",
    "https://*.duckduckgo.com/?*q=*poewiki+*",
    "https://*.duckduckgo.com/?*q=*+poewiki*",

    //Bing - Currently bing doesn't find any results with "site:poewiki.net", GJ BING!
    "https://*.bing.com/search?*q=*poe+*wiki*",
    "https://*.bing.com/search?*q=*poewiki+*",
    "https://*.bing.com/search?*q=*+poewiki*",

    //Yahoo
    //FIXME: Yahoo does not work with 'url.searchParams' and would need special implementation to filter the search url
    "https://*.yahoo.com/search?*p=*poe+*wiki*",
    "https://*.yahoo.com/search?*p=*poewiki+*",
    "https://*.yahoo.com/search?*p=*+poewiki*"

    //FIXME:
        //Baidu is using bloated search queries, needs investigation
        //Yandex.ru has captchas :(
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
    searchQueryFromRequest,
    {
        urls: searchEnginePatterns,
    },
    ["blocking"],
)