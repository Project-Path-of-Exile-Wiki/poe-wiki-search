import { redirectFromFandom, redirectFromSearchEngine } from "./redirects.js"

// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://pathofexile.fandom.com/wiki/*"
// These Search Engine patterns are written this way to prevent recursively matching on the redirect destination.
// Redirects will be generated to include `?q=site:poewiki.net`, 
// which a naive pattern of `q=*poe*wiki*` will again match (recursively) and continue trying to redirect for (bad).

// Search engine patterns
const googlePatterns = [
    "https://*.google.com/search?*q=*poe+*wiki*",
    "https://*.google.com/search?*q=*poewiki+*",
    "https://*.google.com/search?*q=*+poewiki*"
]

const duckduckgoPatterns = [
    "https://duckduckgo.com/?*q=*poe+*wiki*",
    "https://duckduckgo.com/?*q=*poewiki+*",
    "https://duckduckgo.com/?*q=*+poewiki*",
    "https://*.duckduckgo.com/?*q=*poe+*wiki*",
    "https://*.duckduckgo.com/?*q=*poewiki+*",
    "https://*.duckduckgo.com/?*q=*+poewiki*"
]

chrome.webRequest.onBeforeRequest.addListener(
    redirectFromSearchEngine,
    {
        urls: [...googlePatterns, ...duckduckgoPatterns],
    },
    ["blocking"],
)


// Load settings from storage
chrome.storage.sync.get("redirectFromFandom", function (data) {
    let redirectSetting = data.redirectFromFandom
    validateSetting(redirectSetting)
})


function validateSetting(data) {
    // No settings exists yet, let's create it!
    if (data == undefined || data == null) {
        chrome.storage.sync.set({ "redirectFromFandom": true })
    }

    // Enable redirect listeners
    if (data == true) {
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
        // Update extension icon to show redirect ON
        browser.browserAction.setIcon({path: "/icons/favicon.png"});
    }
    // Disable redirect listeners
    else {
        chrome.webRequest.onBeforeRequest.removeListener(
            redirectFromFandom,
            {
                urls: [fandomPattern],
            },
            ["blocking"],
        )
        // Update extension icon to show redirect OFF
        browser.browserAction.setIcon({path: "/icons/favicon-off.png"});
    }
}

// Keep track of when Storage has changed
chrome.storage.onChanged.addListener(storageChanges);

function storageChanges(changes) {

    let changedItems = Object.keys(changes);
    for (let item of changedItems) {
        if (item = "redirectFromFandom") {
            validateSetting(changes[item].newValue)
        }
    }
}