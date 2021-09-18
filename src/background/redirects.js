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
        redirectUrl: `https://www.poewiki.net/wiki/${target}`,
    }
}

// When we are making a Google search containing the words "poe", "wiki" or "poewiki",
// this function will prepend "site:poewiki.net" to the search, filtering out "poe", "wiki" and "poewiki".
function redirectFromGoogle(requestDetails) {
    // Grab the search query itself and remove the "poe " at the beginning
    const url = new URL(requestDetails.url)
    const searchQuery = url.searchParams
        .get("q")
        .split(" ")
        // Filter "empty" words (caused from consecutive spaces in the query), and the poewiki words we use to match redirects for.
        .filter(qParam => qParam !== "" && !["poe", "wiki", "poewiki"].includes(qParam))
        .join("+")

    // Return the redirect url with "site:poewiki.net" prepended to the search query
    return {
        redirectUrl: `https://www.google.com/search?q=site:poewiki.net+${searchQuery}`,
    }
}

function redirectFromDdg(requestDetails) {
    const url = new URL(requestDetails.url)
    const searchQuery = url.searchParams
        .get("q")
        .replace(/ /g, "+")
        .replace(/^poe\+/, "")

    return {
        redirectUrl: `https://www.duckduckgo.com/?q=site:poewiki.net+${searchQuery}`,
    }
}

export { redirectFromFandom, redirectFromGoogle, redirectFromDdg }
