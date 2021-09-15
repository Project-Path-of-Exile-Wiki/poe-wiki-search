// This function will check where we are going,
// and redirect us to the new wiki, but retain our target page.
// This is not 100% tested, any bug reports are welcome!
module.exports.redirect = (requestDetails) => {
    // Get the URL of where we are going, split it at `/`
    const split_target = requestDetails.url.split("/")
    // We assume that the last part of our split URL is the destination target.
    const target = split_target[split_target.length - 1]
    // We simply replace the destination target over the new wiki URL.
    // Then send it back to the browser to finish the request with.
    return {
        redirectUrl: `https://poewiki.net/wiki/${target}`
    }
}