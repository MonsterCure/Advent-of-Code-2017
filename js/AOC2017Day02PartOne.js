function foo() {

    let result = document.getElementById('result1');
    let puzzleOriginal = document.getElementById('input1').value;
    let puzzle = [];
    let sum = 0;

    puzzle = puzzleOriginal.split('\n').map(function (rows) {
        return rows.split('\t').map(Number);
    });

    sum = puzzle.map(function (rows) {
        return Math.max(...rows) - Math.min(...rows);
    }).reduce(function (a, b) {
        return a + b;
    });

    result.innerText = sum;


    // OR (calculate row by row, without separating the input into rows)
    /*
    let result = document.getElementById('result1');
    let puzzleOriginal = document.getElementById('input1').value;
    let puzzle = [];
    let sum = 0;
    let sum1 = 0;
    let max = -Infinity;
    let min = +Infinity;

    puzzle = puzzleOriginal.split('\t');
    
    puzzle = puzzle.map(function (item) {
        return parseInt(item, 10);
    });

    for (var i = 0; i < puzzle.length; i++) {
        if (puzzle[i] > max) {
            max = puzzle[i];
        }
        if (puzzle[i] < min) {
            min = puzzle[i];
        }
        sum1 += puzzle[i];
    }

    sum = max - min;
    result.innerText = sum;
    */

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