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
        redirectUrl: `https://www.bg3.wiki/wiki/${target}`,
    }
}

// When we are making a search query containing the words "bg3", "wiki", "bg3wiki" or "bg3.wiki",
// this function will prepend "site:bg3.wiki" to the search, filtering out "bg3", "wiki", "bg3wiki" or "bg3.wiki".
function redirectFromSearchEngine(requestDetails) {
    const url = new URL(requestDetails.url)
    const searchQuery = url.searchParams
        .get("q")
        .split(" ")
        // Filter "empty" words (caused from consecutive spaces in the query), and the bg3.wiki words we use to match redirects for.
        .filter(qParam => qParam !== "" && !["bg3", "wiki", "bg3wiki", "bg3.wiki"].includes(qParam))
        .join("+")

    let searchEngine = 'https://www.google.com/search?q=site:bg3.wiki+';

    switch (url.host) {
        case "duckduckgo.com":
        case "www.duckduckgo.com":
            searchEngine = 'https://www.duckduckgo.com/?q=site:bg3.wiki+'
            break;
    }
    const redirectResult = searchEngine + searchQuery

    // Return the redirect url with "site:bg3.wiki" prepended to the search query
    return {
        redirectUrl: redirectResult
    }

}

export { redirectFromFandom, redirectFromSearchEngine }
