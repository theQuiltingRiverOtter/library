const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read === "yes" || read === 'y' || read === 'Yes' || read === "YES" || read === 'Y') {
        this.read = true;
    }
    else {
        this.read = false;
    }
}

Book.prototype.info = function () {
    const { title, author, pages, read } = this;
    return `${title} by ${author}, ${pages} pages, read: ${read}`;
}


const container = document.querySelector(".container");

function createCard(object) {
    const { title, author, pages, read } = object;
    const card = document.createElement("div");
    card.dataset.id = `${title}`;
    card.classList.add("card");
    const header = document.createElement("h4");
    header.innerText = title;
    header.classList.add('header')
    const body = document.createElement("div");
    const authorSpan = document.createElement("p");
    const pagesSpan = document.createElement("p");
    const readSpan = createToggleSwitch(title, read);
    authorSpan.innerText = author;
    pagesSpan.innerText = pages;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    body.append(authorSpan);
    body.append(pagesSpan);
    body.append(readSpan);
    card.append(header);
    card.append(body);
    card.append(deleteBtn);
    container.append(card);

}

function createToggleSwitch(title, read) {
    const toggle = document.createElement("p");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    label.dataset.id = title;
    checkbox.type = 'checkbox';
    label.classList.add('switch');
    checkbox.classList.add("checkbox");
    checkbox.classList.add("round");
    const span = document.createElement("span");
    span.classList.add("slider");
    if (read) {
        checkbox.checked = true;
    }
    label.append(checkbox);
    label.append(span);
    toggle.append(label);
    return toggle;
}

function addBoooksToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
    createCard(newBook);
}



function deleteCard(e) {
    let parent = e.target.parentElement;
    if (parent.nodeName === "BUTTON") {
        parent = parent.parentElement;
    }
    const bookTitle = parent.dataset.id;
    const bookIndex = library.findIndex(book => book.title === bookTitle);
    if (bookIndex >= 0) {
        library.splice(bookIndex, 1);
    }
    parent.remove();
    console.log(library);
}
function toggleReadStatus(e) {
    const bookID = e.target.parentElement.dataset.id;
    const bookIndex = library.findIndex(book => book.title === bookID);
    if (bookIndex >= 0) {
        if (library[bookIndex].read) {
            library[bookIndex].read = false;
        }
        else {
            library[bookIndex].read = true;
        }
    }
}
function getValues(e) {
    const title = e.target.title.value;
    const author = e.target.author.value;
    const pages = e.target.pages.value;
    const read = e.target.read.value;
    addBoooksToLibrary(title, author, pages, read);
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            deleteCard(e);
        });
    })
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", function (e) {
            toggleReadStatus(e);
        })
    })
    e.target.title.value = '';
    e.target.author.value = '';
    e.target.pages.value = '';
    e.target.read.value = '';
}

const newBookBtn = document.querySelector("#newBook");
const form = document.querySelector('#myForm');
newBookBtn.addEventListener("click", function () {
    form.style.display = 'block';

});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    getValues(e);
    form.style.display = 'none';
});