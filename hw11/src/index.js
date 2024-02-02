var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function getPalindrome(num, step) {
    if (step === void 0) { step = 0; }
    if (step > 999) {
        return {
            value: 0,
            steps: Infinity,
        };
    }
    if (isPalindrome(num)) {
        return {
            value: num,
            steps: step,
        };
    }
    return getPalindrome(num + getReversedNumber(num), ++step);
}
function isPalindrome(num) {
    if (num < 10)
        return false;
    return num === getReversedNumber(num);
}
function getReversedNumber(num) {
    return Number(String(num).split('').reverse().join(''));
}
function getPermutations(array) {
    if (!array.length)
        return [];
    var combinations = addCombinations([[array[0]]], 1, array);
    return combinations;
}
function addCombinations(combinations, currentIndex, array) {
    if (currentIndex >= array.length) {
        return combinations;
    }
    var additionalNum = array[currentIndex];
    var newCombinations = combinations.reduce(function (acc, combination) {
        var newIterableCombinations = [];
        for (var i = 0; i <= combination.length; i++) {
            var preparedCombination = JSON.parse(JSON.stringify(combination));
            preparedCombination.splice(i, 0, additionalNum);
            newIterableCombinations.push(preparedCombination);
        }
        return __spreadArray(__spreadArray([], acc, true), newIterableCombinations, true);
    }, []);
    return addCombinations(newCombinations, ++currentIndex, array);
}
