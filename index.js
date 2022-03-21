let myLibrary = [];

function Book(title,author,pages,read=false) {
    this.title=title,
    this.author=author,
    this.pages=pages,
    this.read=read
}
Book.prototype.isRead=function() {
    return this.read;
}
Book.prototype.changeReadState=function(){
    this.read=!this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayLibrary();
}
function removeBookFromLibrary(idBook) {
    myLibrary.splice(idBook,1);
}
addBookToLibrary(new Book("Title","Author",63));
function displayLibrary(){
    let data="";
    myLibrary.forEach((book,index) => {
        data+=`
        <div class='book' id=${index}>
            <p class='deleteBook'>Delete</p>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>Pages:${book.pages}</p>
            <p>Read:</p><input class='bookRead' type='checkbox' ${book.isRead()?'checked':''}>
        </div>
        `;
    });
    document.getElementById("library").innerHTML=data;
    document.querySelectorAll(".deleteBook").forEach(book =>{
        book.addEventListener(
            "click",
            (e)=>{
                removeBookFromLibrary(e.target.parentElement.id);
                displayLibrary();
            }
        )
    });
    document.querySelectorAll(".bookRead").forEach(book=>{
        book.addEventListener(
            "change",
            (e)=>{
                myLibrary[e.target.parentElement.id].changeReadState();
            }
        )
    });
}
function displayForm(){
    let data=`
    <form id='inputBook'>
        <input type='text' placeholder='title' name='title' required>
        <input type='text' placeholder='author' name='author' required>
        <input type='number' placeholder='169' name='pages' required>
        Read<input type='checkbox' name='read'>
        <input type='submit' value='Add book'>
    </form>
    `;
    document.getElementById("library").innerHTML=data;
    document.getElementById("inputBook").addEventListener(
        "submit",
        (e)=>{
            e.preventDefault();
            addBookToLibrary(new Book(document.forms.inputBook.title.value, document.forms.inputBook.author.value,document.forms.inputBook.pages.value,document.forms.inputBook.read.checked))
        }
    )
}
document.getElementById("newBook").addEventListener(
    "click",
    ()=>{
        displayForm();
    }
);