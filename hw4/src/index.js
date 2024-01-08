var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var calculator = {
    add: function (a, b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    multiply: function (a, b) { return a * b; },
    divide: function (a, b) { return a / b; },
};
function calculate(calculator, operation, operands) {
    return calculator[operation].apply(calculator, operands);
}
var BookService = /** @class */ (function () {
    function BookService(authors, books) {
        this.authors = authors;
        this.books = books;
    }
    BookService.prototype.addAuthor = function (author) {
        var isAuthor = this.getIsAuthorById(author.id);
        if (isAuthor)
            return;
        this.authors = __spreadArray(__spreadArray([], this.authors, true), [author], false);
    };
    BookService.prototype.addBook = function (book) {
        var isAuthor = this.getIsAuthorById(book.author.id);
        if (!isAuthor) {
            this.addAuthor(book.author);
        }
        this.books = __spreadArray(__spreadArray([], this.books, true), [book], false);
    };
    BookService.prototype.getIsAuthorById = function (id) {
        return !!this.authors.find(function (author) { return author.id === id; });
    };
    BookService.prototype.getAuthorById = function (id) {
        return this.authors.find(function (author) { return author.id === id; });
    };
    BookService.prototype.getBookById = function (id) {
        return this.books.find(function (book) { return book.id === id; });
    };
    BookService.prototype.getBooksByAuthorId = function (id) {
        return this.books.filter(function (_a) {
            var author = _a.author;
            return author.id === id;
        });
    };
    BookService.prototype.removeBooksByAuthorId = function (id) {
        var isAuthor = this.getIsAuthorById(id);
        if (!isAuthor)
            return;
        this.books = this.books.filter(function (book) { return book.author.id !== id; });
    };
    BookService.prototype.removeAuthorById = function (id) {
        var isAuthor = this.getIsAuthorById(id);
        if (!isAuthor)
            return;
        this.removeBooksByAuthorId(id);
        this.authors = this.authors.filter(function (author) { return author.id !== id; });
    };
    BookService.prototype.removeBookById = function (id) {
        this.books = this.books.filter(function (book) { return book.id !== id; });
    };
    return BookService;
}());
var bookService = new BookService([
    {
        id: 1,
        name: 'author name1',
    },
    {
        id: 2,
        name: 'author name2',
    },
], [
    {
        title: 'book title1',
        id: 1,
        author: {
            id: 1,
            name: 'author name1',
        },
    },
    {
        title: 'book title2',
        id: 2,
        author: {
            id: 1,
            name: 'author name1',
        },
    },
    {
        title: 'book title3',
        id: 3,
        author: {
            id: 2,
            name: 'author name2',
        },
    },
]);
