const defaultWikiURL = "https://www.poewiki.net/w/index.php?search="
const getSearchInput = () => document.querySelector("#searchWikiInput")
const focusSearch = (searchInput) => searchInput.focus()
const validateQuery = (query) => query.trim() !== "" ? true : false

/**
 * Main handler method responsible for what happens when the extension popup fires.
 * 
 * Any sub-handlers to go into this method.
 */
const handler = () => {
    const searchInput = getSearchInput()
    focusSearch(searchInput)

    searchInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            const query = searchInput.value.trim()
            const valid = validateQuery(query)
            if (valid) {
                window.open(`${defaultWikiURL}${query}`, "_blank").focus()
                window.close()
            }
            
        }
    })
}

handler()