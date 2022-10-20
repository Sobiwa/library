let myLibrary = [];
let sortByValue = "date";
const libraryDisplay = document.querySelector('.library');
const addButton = document.querySelector('.add');
const inputForm = document.querySelector('.form-pop');
const actualForm = document.querySelector('.actual-form')
const seenCheckbox = document.querySelector("#seen");
const rating = document.querySelector(".rating");
const cancelBtn = document.querySelector(".cancel");
const submitBtn = document.querySelector(".submitBtn");
const sortBySelect = document.querySelector("#sort");

const titleInput = document.querySelector("#title");
const directorInput = document.querySelector("#director");
const genreInput = document.querySelector("#genre");
// const ratingInput = document.querySelector("input[name='score']:checked").value;


function film(title, director, genre, seen, rating, date) {
    this.title = title
    this.director = director
    this.genre = genre
    this.seen = seen
    this.rating = rating
    this.date = date
}

film.prototype.seenToggle = function () {
    if (this.seen === "yes") {
        this.seen = "no"
        this.rating = '';
        let starContainer = this.card.querySelector('.star-container');
        starContainer.remove();
    } else {
        this.seen = "yes"
        let starContainer0 = document.createElement('div');
        starContainer0.classList.add("star-container", "selectable");
        for (p = 0; p < 5; p++) {
            let currentIteration = p + 1;
            let star = document.createElement('span');
            star.classList.add('mdi', "mdi-star-outline");
            star.addEventListener('click', () => {
                starContainer0.remove();
                this.rating = currentIteration;
                this.displayRatingAsStars();
            })
            starContainer0.appendChild(star);
        }
        this.card.appendChild(starContainer0);
    }
}

film.prototype.deleteCard = function () {
    let arrayPosition = myLibrary.indexOf(this);
    myLibrary.splice(arrayPosition, 1);
}

film.prototype.displayRatingAsStars = function () {
    let starContainer = document.createElement('div');
    starContainer.classList.add("star-container");
    let howManyStars = this.rating;
    for (p = 0; p < howManyStars; p++) {
        let star = document.createElement('span');
        star.classList.add('mdi', "mdi-star");
        starContainer.appendChild(star);
    }
    this.card.appendChild(starContainer);
}

film.prototype.createCard = function () {
    this.card = document.createElement("div");
    this.card.classList.add('film-card');
    for (const property in this) {
        if (this.hasOwnProperty(property) && this[property] &&
            property !== 'date' && property !== 'card') {
            if (property === "seen") {
                let seenCheck = document.createElement(`input`);
                let seenCheckLabel = document.createElement('label');
                seenCheckLabel.setAttribute("for", "seen-check-id");
                seenCheckLabel.textContent = "seen?";
                seenCheck.setAttribute("id", "seen-check-id");
                seenCheck.setAttribute("type", "checkbox")
                seenCheck.classList.add('seen-check');
                if (this[property] === "yes") {
                    seenCheck.checked = true;
                }
                seenCheck.addEventListener('click', () => {
                    this.seenToggle();
                })
                this.card.appendChild(seenCheckLabel);
                seenCheckLabel.appendChild(seenCheck);
            } else if (property === 'rating') {
                this.displayRatingAsStars();
            }
            else {
                let pContainer = document.createElement('div');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                p1.textContent = `${property}`;
                p2.textContent = `${this[property]}`;
                pContainer.appendChild(p1);
                pContainer.appendChild(p2);
                this.card.appendChild(pContainer);
            }
        }
    }
    let exit = document.createElement('div');
    exit.classList.add('exit', 'mdi', 'mdi-delete');
    exit.addEventListener('click', () => {
        this.deleteCard();
        refreshFilmCards();
        sortByAndCreate();
    })
    this.card.appendChild(exit);
    libraryDisplay.appendChild(this.card);
}

function addFilmToLibrary() {
    let title = titleInput.value;
    let director = directorInput.value;
    let genre = genreInput.value;
    let dateAdded = Date();
    let seen;
    let rating = '';
    if (!seenCheckbox.checked) {
        seen = "no";
    } else seen = "yes";
    if (seen === 'yes') {
        if (document.querySelector("input[name='score']:checked")) {
            rating = document.querySelector("input[name='score']:checked").value;
        } else rating = '';
    }
    const newFilm = new film(title, director, genre, seen, rating, dateAdded);
    myLibrary.unshift(newFilm);
}

function createFilmCards(library) {
    for (i = 0; i < library.length; i++) {
        library[i].createCard(); 
    }
}

function sortByAndCreate() {
    let currentLibrary = [...myLibrary].sort((a, b) => a[sortByValue].toString().localeCompare(b[sortByValue].toString()));
    refreshFilmCards();
    createFilmCards(currentLibrary);
}

function refreshFilmCards() {
    const allCards = document.querySelectorAll(".film-card");
    allCards.forEach(card => {
        card.remove();
    })
    if (seenCheckbox.checked) {
        rating.classList.add('hide');
    }
    actualForm.reset();
    inputForm.classList.add('hide');
}


sortBySelect.addEventListener('change', (e) => {
    sortByValue = e.target.value;
    sortByAndCreate();
})

submitBtn.addEventListener('click', () => {
    addFilmToLibrary();
    sortByAndCreate();
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