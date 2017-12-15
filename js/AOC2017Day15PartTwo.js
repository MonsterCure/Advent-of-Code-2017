function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    const factorA = 16807;
    const factorB = 48271;
    const divisor = 2147483647;
    let sum = 0;

    puzzle = puzzleOriginal.split(', ');
    let startA = puzzle[0];
    let startB = puzzle[1];

    for (let i = 0; i < 5E6; i++) {
        do {
            startA = (startA * factorA) % divisor;
        } while (startA % 4 !== 0);
        do {
            startB = (startB * factorB) % divisor;
        } while (startB % 8 !== 0);

        sum += (startA & 0xFFFF) == (startB & 0xFFFF)
    }

    result.innerText = sum;

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