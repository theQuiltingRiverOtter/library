function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    const { title, author, pages, read } = this;
    return `${title} by ${author}, ${pages} pages, read: ${read}`;
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 356, 'yes');
console.log(hobbit.info());