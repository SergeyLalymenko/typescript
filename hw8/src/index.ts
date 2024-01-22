interface ITest {
    name: string;
    age: number;
    mother: {
        name: string;
        age: number;
    }
}

type TDeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? TDeepReadonly<T[K]> : T[K];
};

type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};

// const obj: DeepRequireReadonly<ITest> = {
//     name: 'Alex',
//     age: 20,
//     mother: {
//         name: 'Name',
//         age: 22,
//     },
// };

// Не понимаю касательно DeepRequireReadonly, если в интерфейсе ITest укаазть mother как необязательный параметр, то в итоге при создании переменной const obj ему будет вообще все равно на то что лежит в mother, туда можно даже число передать

type UpperCaseKeys<T> = {
    [K in keyof T as Capitalize<K & string>]: T[K] extends object ? UpperCaseKeys<T[K]> : T[K];
};

interface ITest2 {
    name: string;
    age: number;
}

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: {
        configurable: boolean;
        enumerable: boolean;
        get: () => T[K];
        set: (value: T[K]) => void;
    };
};

// Возможно ли сделать чтобы в ObjectToPropertyDescriptor ключи были не просто get/set , а getName/setName ?
