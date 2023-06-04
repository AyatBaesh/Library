const addBook = document.querySelector('#addBook');
const submitButton = document.querySelector('#submit');
const formContainer = document.querySelector('#formContainer');
const books = document.querySelector('.books');
const exists = document.querySelector('.exists');
const overlay = document.querySelector('#overlay');
let deleteButtons = [];
let myLibrary =[];
let id = 0;

class Book {
    constructor(title, author, pages, read, id){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.id = id
    }
    equals (book) {
        if(this.title === book.title && this.author === book.author){
            return true;
        }
        return false;
    }
}
function addBookToLibrary(newBook){
    let alreadyExists = false;
    myLibrary.forEach((book) => {
        if(book.equals(newBook)){
            alreadyExists = true;
        };
    });
    if(alreadyExists === true){
        exists.style.display = 'block';
        alreadyExists = false;
        return;
    }
    exists.style.display = 'none';
    myLibrary.push(newBook);
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `<p>Title: ${newBook.title}</p>
                        <p>Author: ${newBook.author}</p>
                        <p>Pages: ${newBook.pages}</p>
                        <button class = "readStatus btn"></button>
                        <button class = "delete btn" id = "${newBook.id}">Remove</button>`
    let readStatus = bookCard.querySelector('.readStatus');

    switch (newBook.read){
        default:
            throw new Error('How did that happened?');
        case true: 
            readStatus.innerText = 'Read';
            readStatus.style.backgroundColor = 'rgb(173, 247, 182)';
            break;
        
        case false: 
            readStatus.innerText = 'Not read';
            readStatus.style.backgroundColor = 'rgb(255, 192, 159)';
            break;
        
    }
    readStatus.addEventListener('click',(event) => {
        switch (readStatus.innerText){
            default:
                throw new Error('How did that happened?');
            case 'Read': 
                readStatus.innerText = 'Not read';
                readStatus.style.backgroundColor = 'rgb(255, 192, 159)';
                break;  
            case 'Not read': 
            readStatus.innerText = 'Read';
            readStatus.style.backgroundColor = 'rgb(173, 247, 182)';
                break;
            
        }
    });
    books.appendChild(bookCard);
}
function removeBook(deleteButton, id){
    myLibrary = myLibrary.filter((book) => book.id != id);
    let parentBook = deleteButton.parentNode;
    books.removeChild(parentBook);
}
addBook.addEventListener('click', () => {
    formContainer.style.display = 'grid';
    overlay.style.display = 'block';
});
formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    let newBook = new Book(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        document.querySelector('#pages').value,
        document.querySelector('#read').checked,
        id
        );
    addBookToLibrary(newBook);
    deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click',() => {
            let buttonId = button.getAttribute('id');
            removeBook(button, buttonId);
        })
    })
    document.querySelector('#title').value = '';
    document.querySelector('#author').value='';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    if(exists.style.display === 'block'){
        return
    }
    formContainer.style.display = 'none';
    overlay.style.display = 'none';
    id++;
});
overlay.onclick = () => {
        formContainer.style.display = 'none';
        overlay.style.display = 'none';
}

