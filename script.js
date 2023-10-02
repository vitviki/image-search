const access_key = "_scn7mUoJFBNBVUkXCU7wq33H24hqJEKsilhudjHUNo"

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;

const searchImages = async () => {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_key}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1) {
        searchResult.innerHTML = '';
    }
    const results = data.results;
    
    results.map((result) => {
        const image = document.createElement('img');
        image.src=result.urls.small;
        const image_link = document.createElement('a');
        image_link.href = result.links.html;
        image_link.target = "_blank";
        image_link.appendChild(image);

        searchResult.appendChild(image_link);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
})