const addBook = document.querySelector('#addBook');
const submitButton = document.querySelector('#submit');
const formContainer = document.querySelector('#formContainer');
const books = document.querySelector('.books');
const exists = document.querySelector('.exists');
let deleteButtons = [];
let myLibrary =[];
let id = 0;

function Book(title, author, pages, read, id){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.id = id

}
function addBookToLibrary(newBook){
    let alreadyExists = false;
    myLibrary.forEach((book) => {
        if(book.title === newBook.title && book.author === newBook.author){
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
    // deleteButtons.push(bookCard.querySelector('.delete'));
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
                console.log(readStatus.innerText);
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

console.log(`deleteButtons: ${deleteButtons}`)

function removeBook(deleteButton, id){
    myLibrary = myLibrary.filter((book) => book.id != id);
    let parentBook = deleteButton.parentNode;
    books.removeChild(parentBook);
}

addBook.addEventListener('click', () => {
    formContainer.style.display = 'grid';
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
            console.log('remove clicked')
            let buttonId = button.getAttribute('id');
            removeBook(button, buttonId);
        })
    })
    document.querySelector('#title').value = '';
    document.querySelector('#author').value='';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    console.log(exists.style.display);
    if(exists.style.display === 'block'){
        return
    }
    formContainer.style.display = "none";
    id++;
    console.log(`id:${id}`)
});

