// Book Class : Represents a book

class Book{

    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

// UI Class : Handle UI tasks

class UI{

    static displayBooks(){

        // const StoreBooks = [
        // {
        //     title : 'Book One',
        //     author : 'Harvey Specter',
        //     isbn : '123456'
        // },

        // {
        //     title : 'Book Two',
        //     author : 'Mike Ross',
        //     isbn : '789123'
        // }
    //]

    // const books = StoreBooks;

    const books = Store.getBooks();

    books.forEach(book => UI.addBookToList(book));

    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm-delete">X</a></td>
        `;

        list.appendChild(row);

    }

    static deleteBook(el){

        if(el.classList.value.indexOf('delete') > -1){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlerts(message, className){

        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        // vanish in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';     
        document.querySelector('#author').value = ''; 
        document.querySelector('#isbn').value = ''; 
    }

}


// Store Class : Handles Storage
class Store{

    static getBooks(){
        let books;
        if(localStorage.getItem('books') == null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBooks(book){

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event : Display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;     
    const author = document.querySelector('#author').value; 
    const isbn = document.querySelector('#isbn').value; 

    // validate

    if(title === '' || author === '' || isbn === ''){
        UI.showAlerts('Please fill in all the fields', 'danger');
    } else {

        // instantiate a book
        const book  = new Book(title, author, isbn);

        // add book to UI
        UI.addBookToList(book);

        // add book to store
        Store.addBooks(book);

        // show success message
        UI.showAlerts('Book Added!!!', 'success');

        // clear all fields
        UI.clearFields();

    }

});

// Event : Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    
    UI.deleteBook(e.target);

    // remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlerts('Book Removed!!!', 'success');

});
