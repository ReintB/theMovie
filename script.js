const API_KEY = "98d7f0fca3472a579949440fb4d838af"

let page = 1;
const API_URL = () =>  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function updatePage() {
    getMovies(API_URL())
    currentPage.innerHTML = page
}

function nextPage() {
    if(page >= 1) {
        page += 1
        updatePage();
    }
}

function prevPage () {
    if(page > 1) {
        page -= 1
        updatePage();
    }
}

next.addEventListener("click", () => {
    nextPage()
})

prev.addEventListener("click", () => {
    prevPage()
})

function showMovies(movies) {
    moviesElement.innerHTML = ''
    movies.forEach(movie => {
        const { title, poster_path, overview, release_date, popularity } = movie
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie")

        movieCard.innerHTML = `
        <img src ="${API_IMAGE_URL + poster_path}" alt="movieImage"/>
        <div class="detail">
            <h3>${title}</h3>
            <p>Release Date: ${release_date}</p>
            <p>Popularity  : ${popularity}%</p>
            <p>${overview.substring(0, 150)}...</p>
        </div>
        `
        moviesElement.appendChild(movieCard)
    })
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery = search.value

    if(searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value = ''
    }
})

updatePage()

title.addEventListener("click", () => {
    location.reload()
})