// This is the URL we will use to append all your searches to.
// If your search query directly matches a name of a wiki page - you will get taken
// to this page directly. If not - you will be taken to a search results page.
const defaultWikiURL = "https://www.poewiki.net/w/index.php?search="

// This just selects the search input box in the extension popup when the popup opens.
// This way we reduce your action-to-search count to just `hotkey+search+ENTER`.
const getSearchInput = () => document.querySelector("#searchWikiInput")

const getRedirectCheckbox = () => document.querySelector("#redirectFandom")

// Function to focus on the search box.
const focusSearch = (searchInput) => searchInput.focus()

// Trivial validator saying - if a search query is empty after trimming any whitespace
// at the start and end of your query - no point to even execute it.
const validateQuery = (query) => query.trim() !== "" ? true : false

/**
 * Main handler method responsible for what happens when the extension popup fires.
 * 
 * Any sub-handlers to go into this method.
 */
const handler = () => {
    const searchInput = getSearchInput()
    focusSearch(searchInput)

    // While typing in the search input, we listen for a keyUP event for the key ENTER.
    // If this is registered - we assume you pressed ENTER and proceed.
    searchInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            // Get the value of your search input
            const query = searchInput.value
            // Check if empty or not
            const valid = validateQuery(query)
            if (valid) {
                // If not empty - ask your browser to open a new tab/window (based on your browser setting)
                // which takes you to the wiki search / page.
                chrome.tabs.create({url: `${defaultWikiURL}${query}`})
                // Close the popup.
                window.close()
            }
            
        }
    })

    const redirectFandom = getRedirectCheckbox()

    // Load saved setting
    chrome.storage.sync.get("redirectFromFandom", function(data) {
        redirectFandom.checked = data.redirectFromFandom;
    })

    redirectFandom.addEventListener('change', function () {
        if (this.checked) {
            chrome.storage.sync.set({"redirectFromFandom": true})
        } else {
            chrome.storage.sync.set({"redirectFromFandom": false})
        }
    })
}

// Execute the handler method when the popup opens, so the event listener
// gets registered for the ENTER key.
handler()