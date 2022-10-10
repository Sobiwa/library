let myLibrary = [];
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

film.prototype.info = function () {
    return `${this.title} directed by ${this.director}, ${runtime} minutes, ${watched}`
}

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

// function createFilmCard

submitBtn.addEventListener('click', addFilmToLibrary)

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