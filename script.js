const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fbb52d1783cff800c027bf209d18fcf&page1'
const IMG_path = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7fbb52d1783cff800c027bf209d18fcf&query="'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


//Get intial Movies 

getmovies(API_URL)

async function getmovies(url){
    const res = await fetch(url)
    const data = await res.json()
    showmovies(data.results)
}

function showmovies(movies){

    main.innerHTML = ''
    movies.forEach((movie) => {

        const {title, poster_path, vote_average, overview} = movie

        const movieEL = document.createElement('div')
        movieEL.classList.add('movie')

        movieEL.innerHTML = `
        
        
            <img src="${IMG_path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getclassbyrate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
    
        
        `

        main.appendChild(movieEL)
        
    });



}



function getclassbyrate(vote){

    if(vote > 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const searchterm = search.value

    if(searchterm && searchterm !== ''){
        getmovies(SEARCH_API + searchterm)

        search.value = ''
    }else{
        window.location.reload()
    }

})