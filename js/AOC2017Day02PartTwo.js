function foo() {

    let result = document.getElementById('result1');
    let puzzleOriginal = document.getElementById('input1').value;
    let puzzle = [];
    let sum = 0;

    puzzle = puzzleOriginal.split('\n').map(function (rows) {
        return rows.split('\t').map(Number);
    });

    sum = puzzle.map(function (rows) {
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (rows[i] % rows[j] == 0 && rows[i] !== rows[j]) {
                    return rows[i] / rows[j];
                }
            }
        }
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

    puzzle = puzzleOriginal.split('\t');
    
    puzzle = puzzle.map(function (item) {
        return parseInt(item, 10);
    });

    puzzle.forEach(function (element) {
        for (var i = 0; i < puzzle.length; i++) {
            if (element % puzzle[i] == 0 && element !== puzzle[i]) {
                sum += element / puzzle[i];
            }
        }
    });

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