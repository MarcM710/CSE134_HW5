const client = algoliasearch("4MN6WZN5KG", "741e1a021676331433c8eaa8e76a40d6"); // Replace APP_ID and API_KEY with your own values
const index = client.initIndex("cse134_hw4"); // Replace INDEX_NAME with your own index name
function search(query) {
    index
        .search({
            query,
        })
        .then(({ hits }) => {
            const searchResults = document.querySelector("#search-results");
            searchResults.innerHTML = "";

            if (hits.length === 0) {
                const noResults = document.createElement("li");
                noResults.textContent = "No results found.";
                searchResults.appendChild(noResults);
            } else {
                for (let hit of hits) {
                    const li = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = hit.url; // Replace "url" with the name of the field in your index that contains the URL of the search result
                    link.textContent = hit.title; // Replace "title" with the name of the field in your index that contains the title of the search result
                    li.appendChild(link);
                    searchResults.appendChild(li);
                }
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

const searchBox = document.querySelector("#search-box");
searchBox.addEventListener("input", (event) => {
    const query = event.target.value;
    search(query);
});

const toggleSearchBtn = document.querySelector("#toggle-search-btn");
const searchContainer = document.querySelector(".search-container");

toggleSearchBtn.addEventListener("click", () => {
    searchContainer.classList.toggle("hidden");
});

