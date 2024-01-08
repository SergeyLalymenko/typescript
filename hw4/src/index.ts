interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}

type TOperands = [number, number];

const calculator: ICalculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}

function calculate(calculator: ICalculator, operation: keyof ICalculator, operands: TOperands): number {
    return calculator[operation](...operands);
}



interface IAuthor {
    id: number;
    name: string;
}

interface IBook {
    title: string;
    author: IAuthor;
    id: number;
}

interface IBookService {
    authors: IAuthor[];
    books: IBook[];
    addAuthor(author: IAuthor): void;
    addBook(book: IBook): void;
    getIsAuthorById(id: IAuthor['id']): boolean;
    getAuthorById(id: IAuthor['id']): IAuthor | undefined;
    getBookById(id: IBook['id']): IBook | undefined;
    getBooksByAuthorId(id: IAuthor['id']): IBook[];
    removeBooksByAuthorId(id: IAuthor['id']): void;
    removeAuthorById(id: IAuthor['id']): void;
    removeBookById(id: IBook['id']): void;
}

class BookService implements IBookService {
    authors;
    books;

    constructor(authors: IAuthor[], books: IBook[]) {
        this.authors = authors;
        this.books = books;
    }

    addAuthor(author: IAuthor): void { // почему если не прописать тип IAuthor, то тс не понимает что это за тип? В интерфейсе же описано что сюда приходит IAuthor
        const isAuthor: boolean = this.getIsAuthorById(author.id);
        if (isAuthor) return;

        this.authors = [...this.authors, author];
    }

    addBook(book: IBook): void {
        const isAuthor: boolean = this.getIsAuthorById(book.author.id);

        if (!isAuthor) {
            this.addAuthor(book.author);
        }

        this.books = [...this.books, book];
    }

    getIsAuthorById(id: IAuthor['id']): boolean {
        return !!this.authors.find((author) => author.id === id);
    }

    getAuthorById(id: IAuthor['id']): IAuthor | undefined {
        return this.authors.find((author) => author.id === id);
    }

    getBookById(id: IBook['id']): IBook | undefined {
        return this.books.find((book) => book.id === id);
    }

    getBooksByAuthorId(id: IAuthor['id']): IBook[] {
        return this.books.filter(({ author }) => author.id === id);
    }

    removeBooksByAuthorId(id: IAuthor['id']): void {
        const isAuthor: boolean = this.getIsAuthorById(id);
        if (!isAuthor) return;

        this.books = this.books.filter((book) => book.author.id !== id);
    }

    removeAuthorById(id: IAuthor['id']): void {
        const isAuthor: boolean = this.getIsAuthorById(id);
        if (!isAuthor) return;

        this.removeBooksByAuthorId(id);
        this.authors = this.authors.filter((author) => author.id !== id);
    }

    removeBookById(id: IBook['id']): void {
        this.books = this.books.filter((book) => book.id !== id);
    }
}

const bookService: BookService = new BookService(
    [
        {
            id: 1,
            name: 'author name1',
        },
        {
            id: 2,
            name: 'author name2',
        },
    ],
    [
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
    ],
);
