"use strict";

let elForm = document.querySelector(".js-form");
let elFormInput = document.getElementById("js-input");
let elMoviesList = document.querySelector(".js-movies-list");
let elMoviesPaginations = document.querySelector(".js-movies-paginations");
let elMoviesPage = document.querySelector(".js-movies-page");


let filmTitle = "hulk";
let page = 1;


let movieUrl = `https://omdbapi.com/?apikey=a75504ec&s=${filmTitle}&page=${page}`

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    elMoviesPage.textContent = "Page: 1"
    page = 1

    filmTitle = elFormInput.value
    movieUrl = `https://omdbapi.com/?apikey=a75504ec&s=${filmTitle}&page=${page}`

    FetchPosts(movieUrl)

    elFormInput.value = ""
})


for (let index = 1; index <= 10; index++) {
    elMoviesPaginations.innerHTML += `
        <button class = "btn btn-outline-primary" onClick ="moviesPage(${index})">${index}</button>
    `
}

function moviesPage(index) {
    elMoviesPage.textContent = `Page: ${index}`
    page = index;

    movieUrl = `https://omdbapi.com/?apikey=a75504ec&s=${filmTitle}&page=${page}`

    FetchPosts(movieUrl)
}

FetchPosts(movieUrl)

async function FetchPosts (Url) {
    await fetch(Url)
    .then(response => response.json())
    .then(data => filmsMap(data))

}


function filmsMap (movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
    elMoviesList.innerHTML = null

    movies.Search.forEach(move => {
        let elItem = document.createElement("li");
        elItem.className = "col-md-4";

        let elItemCard = document.createElement("div");
        elItemCard.className = "card h-100";

        let elItemCardImg = document.createElement("img");
        elItemCardImg.className = "card-img";
        elItemCardImg.src = move.Poster

        let elItemCardTitle= document.createElement("h5");
        elItemCardTitle.className = "card-title mt-2 px-2";
        elItemCardTitle.innerHTML = `Year: <b>${move.Title}</b>`

        let elItemCardYear= document.createElement("p");
        elItemCardYear.className = "card-text pb-2 px-2 mb-0 fs-5";
        elItemCardYear.innerHTML = `Year: <b>${move.Year}</b>`

        let elItemCardType= document.createElement("p");
        elItemCardType.className = "card-text pb-2 px-2 mb-0 fs-5";
        elItemCardType.innerHTML =`Ctaegorie: <b>${move.Type}</b>`

        elItemCard.append( elItemCardImg, elItemCardTitle, elItemCardYear, elItemCardType)
        elItem.appendChild(elItemCard);
        elMoviesList.appendChild(elItem)
    })
}