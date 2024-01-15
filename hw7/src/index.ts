type TCondition<T> = (item: T) => boolean;

interface IArrayItem {
    isValid: boolean;
}

function filterArray<T>(array: T[], condition: TCondition<T>): T[] {
    return array.filter(condition);
}

filterArray<IArrayItem>([
    {
        isValid: true,
    },
    {
        isValid: false,
    }
], ({ isValid }) => isValid);



interface IStack<T> {
    stack: T[];
    push(item: T): void;
    pop(): void;
    peek(): T;
}

class Stack<T> implements IStack<T> {
    public stack: T[];

    constructor(...args: T[]) {
        this.stack = args.reverse();
    }

    push(item: T): void {
        this.stack.push(item);
    }

    pop(): void {
        this.stack.pop();
    }

    peek(): T {
        return this.stack[0];
    }
}

const stack: Stack<number> = new Stack(1, 2);



type TDictionary = {
    [key: string | number | symbol]: any;
}

interface IDictionary<T> {
    data: T;
    get(item: keyof T): any;
    set(item: T): void;
    has(item: keyof T): boolean;
}

class Dictionary<T extends object> implements IDictionary<T> {
    public data: T;

    constructor(...args: T[]) {
        this.data = args.reduce((acc: T, item: T): T => {
            return {
                ...acc,
                ...item
            }
        }, {} as T);
    }

    get(key: keyof T): any {
        return this.data[key];
    }

    set(item: T): void {
        this.data = {
            ...this.data,
            ...item
        }
    }

    has(key: keyof T): boolean {
        return key in this.data;
    }
}

const dictionary: Dictionary<TDictionary> = new Dictionary();
