interface I1 {
    [key: string]: string | number;
}

interface I2 {
    [key: string]: (...args: any[]) => void;
}

interface I3 {
    [key: number]: number | string | ((a: number, b: number) => number);
}

interface I4 {
    name: string;
    age: number;
    callback1: () => void;
    callback2: (arg1: number, arg2: string) => void;
    [key: string]: number | string | ((...args: any[]) => void);
    [key: number]: number;
}

interface I5 {
    [key: string]: string | number | boolean;
    [key: number]: number;
}

interface I6 extends I5 {
    name: string;
    0: number;
    age: number;
    is: boolean;
}

type T = number | string;

interface I7 {
    [key: string]: T;
}

function f(obj: I7): boolean {
    const values: T[] = Object.values(obj);

    return !values.find((value: T): boolean => typeof value !== 'number');
}
