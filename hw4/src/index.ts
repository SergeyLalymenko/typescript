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

console.log(calculate(calculator, 'divide', [6, 0]));
