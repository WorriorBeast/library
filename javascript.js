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

    book.capitalizeWord();
    
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

Book.prototype.capitalizeWord = function() {
    let bookTitle = this.title;
    let splitTitle = bookTitle.split(' ');

    let bookAuthor = this.author;
    let splitAuthor = bookAuthor.split( ' ');

    let bookGenre = this.genre;
    let splitGenre = bookGenre.split(' ');

    let bookLanguage = this.language;
    let splitLanguage = bookLanguage.split(' ');

    for (i = 0; i < splitTitle.length; i++) {
        splitTitle[i] = splitTitle[i].at(0).toUpperCase() + splitTitle[i].slice(1);

        splitAuthor[i] = splitAuthor[i].at(0).toUpperCase() + splitAuthor[i].slice(1);
        
        splitGenre[i] = splitGenre[i].at(0).toUpperCase() + splitGenre[i].slice(1);
        
        splitLanguage[i] = splitLanguage[i].at(0).toUpperCase() + splitLanguage[i].slice(1);
    }

    this.title = splitTitle.join(' ');
    this.author = splitAuthor.join(' ');
    this.genre = splitGenre.join(' ');
    this.language = splitLanguage.join(' ');
};