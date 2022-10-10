let myLibrary = [];
const libraryDisplay = document.querySelector('.library');
const addButton = document.querySelector('.add');
const inputForm = document.querySelector('.form-pop');
const seenCheckbox = document.querySelector("#seen");
const rating = document.querySelector(".rating");
const cancelBtn = document.querySelector(".cancel");
const submitBtn = document.querySelector(".submitBtn")

const titleInput = document.querySelector("#title");
const directorInput = document.querySelector("#director");
const genreInput = document.querySelector("#genre");
const seenInput = document.querySelector("#seen");
// const ratingInput = document.querySelector("input[name='score']:checked").value;


function film(title, director, genre, seen, rating) {
    this.title = title
    this.director = director
    this.genre = genre
    this.seen = seen
    this.rating = rating
}

// film.prototype.info = function () {
//     return `${this.title} directed by ${this.director}, ${runtime} minutes, ${watched}`
// }

function addFilmToLibrary() {
    let title = titleInput.value;
    let director = directorInput.value;
    let genre = genreInput.value;
    let seen;
    let rating;
    if (!seenInput.checked) {
        seen = "no";
    } else seen = "yes";
    if (seen === 'yes') {
        if (document.querySelector("input[name='score']:checked")) {
        rating = document.querySelector("input[name='score']:checked").value;
        } else rating = "unrated";
    }
    const newFilm = new film(title, director, genre, seen, rating);
    myLibrary.push(newFilm);
}

function createFilmCards() {
    let filmCard = [];
    for(i = 0; i < myLibrary.length; i++) {
        filmCard[i] = document.createElement("div");
        filmCard[i].classList.add('film-card')
        // filmCard[i].textContent = '';
        for (const property in myLibrary[i]) {
            if (myLibrary[i][property]) {
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.textContent = `${property}:`;
            p2.textContent = `${myLibrary[i][property]}`;
            filmCard[i].appendChild(p1);
            filmCard[i].appendChild(p2);
            }
        }
        libraryDisplay.appendChild(filmCard[i]);
    }
}

submitBtn.addEventListener('click', () => {
    addFilmToLibrary();
    createFilmCards();
})

addButton.addEventListener('click', () => {
    inputForm.classList.toggle('hide');
})

seenCheckbox.addEventListener('click', () => {
    rating.classList.toggle('hide');
})

cancelBtn.addEventListener("click", () => {
    inputForm.classList.toggle('hide');
})


// const book1 = new book('The Hobbit', 'J.R.R. Tolkien', 295, 'read');
// console.log(book1.info());