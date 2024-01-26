type Type1<T> = T extends (...args: any[]) => infer U ? U : never;
type Type2<T> = T extends (arg: infer U, ...args: any[]) => infer V ? [V, U] : never;
