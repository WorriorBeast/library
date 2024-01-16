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
    const read = document.querySelector('[name="read"]:checked').value;

    const book = new Book(textInput[0].value, textInput[1].value, textInput[2].value, textInput[3].value,
                pages.value, read);

    e.preventDefault();            

    if (book.checkPageInput() == false) {
        book.showErrorInput();

    } else {
        dialog.close();
        book.capitalizeWord();

        library.push(book);
        book.removeError();

        this.reset();
        displayBook();
        checkForDarkImage();
    }
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
    }

    for (i = 0; i < splitAuthor.length; i++) {
        splitAuthor[i] = splitAuthor[i].at(0).toUpperCase() + splitAuthor[i].slice(1);
    }

    for (i = 0; i < splitGenre.length; i++) {
        splitGenre[i] = splitGenre[i].at(0).toUpperCase() + splitGenre[i].slice(1);
    }

    for (i = 0; i < splitLanguage.length; i++) {
        splitLanguage[i] = splitLanguage[i].at(0).toUpperCase() + splitLanguage[i].slice(1);
    }

    this.title = splitTitle.join(' ');
    this.author = splitAuthor.join(' ');
    this.genre = splitGenre.join(' ');
    this.language = splitLanguage.join(' ');
};

Book.prototype.checkPageInput = function() {
    if (!Number.isInteger(Number(this.pages))) {
        return false;
    } else if (this.pages.includes('.')) {
        let pageArray = this.pages.split('.')
        this.pages = pageArray[0];
    }
};

Book.prototype.showErrorInput = function() {
    const errorMsg = document.createElement('div');
    const fieldSetRef = document.querySelector('fieldset');

    errorMsg.classList.toggle('error-input');
    errorMsg.textContent = 'Please enter a whole number or leave blank';

    const errorNode = document.querySelector('.error-input');

    if (!document.contains(errorNode)) form.insertBefore(errorMsg, fieldSetRef);
};

Book.prototype.removeError = function() {
    const errorMsg = document.querySelector('.error-input');

    if (document.contains(errorMsg)) form.removeChild(errorMsg);
};

function displayBook() {
    const bookContainer = document.querySelector('.book-container');
    const bookItem = document.createElement('div');

    bookItem.classList.toggle('book-item');
    bookContainer.appendChild(bookItem);

    displayBookCover()
    displayExtraBookInfo();
}

function displayBookCover() {
    const index = library.length - 1;
    const bookNode = document.querySelector('.book-item:last-child');
    const bookCover = document.createElement('div');

    bookCover.classList.toggle('book-cover');
    bookCover.style.cssText = `background-image: url(${randomBookCover()})`;
    bookNode.appendChild(bookCover);

    const bookInfo = document.createElement('div');

    bookInfo.classList.toggle('info');
    bookNode.appendChild(bookInfo);

    const bookCoverNode = document.querySelector('.book-item:last-child .book-cover');
    const titleElement = document.createElement('div');
    
    titleElement.classList.toggle('title');
    titleElement.textContent = library[index].title;
    bookCoverNode.appendChild(titleElement);

    const authorElement = document.createElement('div');

    authorElement.classList.toggle('author');
    authorElement.textContent = library[index].author;
    bookCoverNode.appendChild(authorElement);

    addEditControls();
}

function displayExtraBookInfo() {
    const index = library.length - 1;
    const infoContainer = document.querySelector('.book-item:last-child .info');
    const genreElement = document.createElement('div');
    
    genreElement.classList.toggle('additional-info');
    genreElement.textContent = 'Genre: ' + library[index].genre;
    infoContainer.appendChild(genreElement);

    const languageElement = document.createElement('div');

    languageElement.classList.toggle('additional-info');
    languageElement.textContent = 'Language: ' + library[index].language;
    infoContainer.appendChild(languageElement);

    const pagesElement = document.createElement('div');

    pagesElement.classList.toggle('additional-info');
    if (library[index].pages !== '') {
        pagesElement.textContent = 'Pages: ' + library[index].pages;
    } else {
        pagesElement.textContent = 'Pages: Unknown';
    }
    infoContainer.appendChild(pagesElement);

    const readElement = document.createElement('div');

    readElement.classList.toggle('additional-info');
    readElement.textContent = 'Read: ' + library[index].read;
    infoContainer.appendChild(readElement);
}

function randomBookCover() {
    let imageFilePath = ['./book-cover-images/europeana-pink-white-flower.jpeg',
    './book-cover-images/luca-nicoletti-white-and-black.jpeg',
    './book-cover-images/masaaki-komori-cherry-blossom.jpeg',
    './book-cover-images/birmingham-museums-trust-woman-white-dress.jpeg',
    './book-cover-images/peter-forster-person-face.jpeg',
    './book-cover-images/nikolas-noonan-storm.jpeg',
    './book-cover-images/simon-lee-bubbles-floating.jpeg',
    './book-cover-images/alex-mihu-handprint-on-window.jpeg'];

    let randomImage = imageFilePath[Math.floor(Math.random() * imageFilePath.length)];

    return randomImage;
}

function checkForDarkImage() {
    const imageNode = document.querySelector('.book-item:last-child div[style]');
    const accessStyle = window.getComputedStyle(imageNode, null);
    const imageUrl = accessStyle.getPropertyValue('background-image');
    
    const titleNode = document.querySelector('.book-item:last-child .book-cover .title');
    const authorNode = document.querySelector('.book-item:last-child .book-cover .author');

    let darkImage = ['url("file:///Users/Emmanuel/repos/library/book-cover-images/alex-mihu-handprint-on-window.jpeg")',
    'url("file:///Users/Emmanuel/repos/library/book-cover-images/luca-nicoletti-white-and-black.jpeg")',
    'url("file:///Users/Emmanuel/repos/library/book-cover-images/nikolas-noonan-storm.jpeg")',
    'url("file:///Users/Emmanuel/repos/library/book-cover-images/peter-forster-person-face.jpeg")'];

    if (darkImage.includes(imageUrl)) {
        titleNode.style.cssText = 'color: red';
        authorNode.style.cssText = 'color: red';
    }
}

function addEditControls() {
    const bookDisplay = document.querySelector('.book-item:last-child .book-cover');
    const titleReference = document.querySelector('.book-item:last-child .book-cover .title');
    const editContainer = document.createElement('div');

    editContainer.classList.toggle('book-controls');
    bookDisplay.insertBefore(editContainer, titleReference);

    const controlsNode = document.querySelector('.book-item:last-child .book-cover .book-controls');
    const deleteBtn = document.createElement('button');

    deleteBtn.classList.toggle('delete-btn');
    deleteBtn.textContent = 'X';
    controlsNode.appendChild(deleteBtn);

    const toggleRead = document.createElement('button');

    toggleRead.classList.toggle('read-btn');
    toggleRead.textContent = 'READ';
    controlsNode.appendChild(toggleRead);
}