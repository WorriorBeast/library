const addBookBtn = document.querySelector('.add-book');
const dialog = document.querySelector('dialog');

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});