function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let firstNumbers = [0, 1, 1, 2, 4, 5, 10, 11, 23, 25];

    function sumOfSteps(number) {
        let sqRoot = Math.ceil(Math.sqrt(number));
        let sqRoot1 = sqRoot % 2;
        if (sqRoot1 !== 0) {
            sqRoot1 = sqRoot;
        } else {
            sqRoot1 = sqRoot + 1;
        }
        let sqRoot2 = (sqRoot1 - 1) / 2;
        let point1 = number - ((sqRoot1 - 2) ** 2);
        let point2 = point1 % (sqRoot1 - 1);
        return sqRoot2 + Math.abs(point2 - sqRoot2);
    }

    result.innerText += sumOfSteps(puzzleOriginal);

    const currentNumber = i => (x => x + (1 - x % 2))(Math.ceil(Math.sqrt(i)));

    function getNumber(i) {

        if (i in firstNumbers) {
            return firstNumbers[i];
        }

        firstNumbers[i] = getNumber(i - 1);

        let largestOddNumber = currentNumber(i) - 2;
        let num1 = largestOddNumber ** 2;
        let num2 = (largestOddNumber - 2) ** 2;
        let num3 = (largestOddNumber + 2) ** 2;

        function placeOnSide(num5) {
            return (num5 - num1) % (largestOddNumber + 1);
        }

        function side(num5) {
            return Math.ceil((num5 - num1) / (largestOddNumber + 1));
        }

        function downTheDiagonal(sideNum) {
            return num2 + sideNum * (largestOddNumber - 1);
        }

        if (i === num1 + 1) {
            firstNumbers[i] += getNumber(num2 + 1);
        } else if (i === num3 - 1) {
            firstNumbers[i] += getNumber(num1 - 1) + getNumber(num1) + getNumber(num1 + 1);
        } else if (i === num3) {
            firstNumbers[i] += getNumber(num1) + getNumber(num1 + 1);
        } else if (placeOnSide(i) === 0) {
            firstNumbers[i] += getNumber(downTheDiagonal(side(i)));
        } else if (placeOnSide(i) === largestOddNumber) {
            const num4 = downTheDiagonal(side(i));
            firstNumbers[i] += getNumber(num4) + getNumber(num4 - 1);
        } else if (placeOnSide(i) === 1) {
            const num4 = downTheDiagonal(side(i - 1));
            firstNumbers[i] += getNumber(num4) + getNumber(num4 + 1) + getNumber(i - 2);
        } else {
            const num5 = downTheDiagonal(side(i) - 1) + placeOnSide(i) - 1;
            firstNumbers[i] += getNumber(num5 - 1 === num2 ? num1 : num5 - 1) + getNumber(num5) + getNumber(num5 + 1);
        }

        return firstNumbers[i];

    };

    let [value, i] = [0, 0];
    while (value < puzzleOriginal) value = getNumber(++i);
    result.innerText += `, ${value}`;
}

document.getElementById('sbtbtn1').addEventListener('click', function (e) {
    e.preventDefault();
    foo();
});

document.getElementById('sbtbtn1').addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        foo();
    }
}, false);