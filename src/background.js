// Any requests beggining with this pattern get intercepted.
let pattern = "https://pathofexile.fandom.com/*"

// This function will check where we are going,
// and redirect us to the new wiki, but retain our target page.
// This is not 100% tested, any bug reports are welcome!
function redirect(requestDetails) {
    console.log("Redirecting: " + requestDetails.url)
    const split_target = requestDetails.url.split("/")
    const target = split_target[split_target.length - 1]
    return {
        redirectUrl: `https://poewiki.net/wiki/${target}`
    }
}

// Instruction for the browser to redirect based on pattern.
// `chrome` used instead of `browser` for compat since Firefox supports
// both chrome and browser, but chrome(ium) only supports chrome prefix afaik.
chrome.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:[pattern]},
    ["blocking"]
)