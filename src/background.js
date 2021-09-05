// Any requests beginning with these patterns get intercepted.
const fandomPattern = "https://pathofexile.fandom.com/*"
const googlePattern = "https://*.google.com/search?*q=poe+*" 

// This function will check where we are going,
// and redirect us to the new wiki, but retain our target page.
// This is not 100% tested, any bug reports are welcome!
function redirectFromFandom(requestDetails) {
    // Get the URL of where we are going, split it at `/`
    const splitTarget = requestDetails.url.split("/")
    // We assume that the last part of our split URL is the destination target.
    const target = splitTarget.slice(-1)[0]
    // We simply replace the destination target over the new wiki URL.
    // Then send it back to the browser to finish the request with.
    return {
        redirectUrl: `https://poewiki.net/wiki/${target}`
    }
}

// When we are making a Google search beginning with "poe ",
// this function will prepend "site:poewiki.net" to the search.
function redirectFromGoogle(requestDetails) {
    // Parse the query string parameters into an object
    const queryString = new URLSearchParams(requestDetails.url)
    // Grab the search query itself and remove the "poe " at the beginning
    const searchQuery = queryString.get("q").replace(/^poe /, "")
    
    // Return the redirect url with "site:poewiki.net" prepended to the search query
    return {
        redirectUrl: `https://google.com/search?q=site:poewiki.net+${searchQuery}`
    }
}

// Instruction for the browser to redirect based on pattern.
// `chrome` used instead of `browser` for compat since Firefox supports
// both chrome and browser, but chrome(ium) only supports chrome prefix afaik.
chrome.webRequest.onBeforeRequest.addListener(
    redirectFromFandom,
    {urls:[fandomPattern]},
    ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
    redirectFromGoogle,
    {urls:[googlePattern]},
    ["blocking"]
)