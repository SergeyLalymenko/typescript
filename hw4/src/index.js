var calculator = {
    add: function (a, b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    multiply: function (a, b) { return a * b; },
    divide: function (a, b) { return a / b; },
};
function calculate(calculator, operation, operands) {
    return calculator[operation].apply(calculator, operands);
}
console.log(calculate(calculator, 'divide', [6, 2]));
