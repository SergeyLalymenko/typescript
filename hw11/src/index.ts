interface IPalindrome {
    value: number,
    steps: number,
}

function getPalindrome(num: number, step: number = 0): IPalindrome {
    if (step > 999) {
        return {
            value: 0,
            steps: Infinity,
        }
    }

    if (isPalindrome(num)) {
        return {
            value: num,
            steps: step,
        }
    }

    return getPalindrome(num + getReversedNumber(num), ++step);
}

function isPalindrome(num: number): boolean {
    if (num < 10) return false;

    return num === getReversedNumber(num);
}

function getReversedNumber(num: number): number {
    return Number(String(num).split('').reverse().join(''));
}


type TCombination = number[];
type TCombinations = TCombination[];

function getPermutations(array: number[]): TCombinations {
    if (!array.length) return [];

    const combinations: TCombinations = addCombinations([[array[0]]], 1, array);

    return combinations;
}

function addCombinations(combinations: TCombinations, currentIndex: number, array: number[]): TCombinations {
    if (currentIndex >= array.length) {
        return combinations;
    }

    const additionalNum: number = array[currentIndex];

    const newCombinations: TCombinations = combinations.reduce((acc: TCombinations, combination: TCombination): TCombinations => {
        const newIterableCombinations: TCombinations = [];

        for (let i: number = 0; i <= combination.length; i++) {
            const preparedCombination: TCombination = JSON.parse(JSON.stringify(combination));

            preparedCombination.splice(i, 0, additionalNum);
            newIterableCombinations.push(preparedCombination);
        }

        return [
            ...acc,
            ...newIterableCombinations,
        ]
    }, [])

    return addCombinations(newCombinations, ++currentIndex, array);
}
