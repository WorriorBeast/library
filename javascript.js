const addBookBtn = document.querySelector('.add-book');
const dialog = document.querySelector('dialog');

const form = document.querySelector('form');
const textInput = document.querySelectorAll('[type="text"]');
const pages = document.querySelector('[type="tel"]');

let library = [];

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    dialog.close();

    const read = document.querySelector('[name="read"]:checked').value;

    const book = new Book(textInput[0].value, textInput[1].value, textInput[2].value, textInput[3].value,
                pages.value, read);

    library.push(book);

    this.reset();
});

function Book(title, author, genre, language, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.language = language;
    this.pages = pages;
    this.read = read;
}