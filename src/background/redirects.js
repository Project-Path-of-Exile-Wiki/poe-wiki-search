// We could use URLSearchParams instead of this, but it doesn't work well for unit testing.
// Manually parsing the query string works just fine and we can test.
// https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getQueryVariable(url, variable) {
    var query = url.split("?")[1]
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1])
        }
    }
}

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
        redirectUrl: `https://poewiki.net/wiki/${target}`,
    }
}

// When we are making a Google search beginning with "poe ",
// this function will prepend "site:poewiki.net" to the search.
function redirectFromGoogle(requestDetails) {
    // Grab the search query itself and remove the "poe " at the beginning
    const searchQuery = getQueryVariable(requestDetails.url, "q").replace(/^poe\+/, "")

    // Return the redirect url with "site:poewiki.net" prepended to the search query
    return {
        redirectUrl: `https://www.google.com/search?q=site:poewiki.net+${searchQuery}`,
    }
}

export {
    getQueryVariable,
    redirectFromFandom,
    redirectFromGoogle,
}
