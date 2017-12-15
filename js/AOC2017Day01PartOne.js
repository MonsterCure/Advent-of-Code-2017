function foo() {
    let result = document.getElementById('result1');
    let puzzleOriginal = document.getElementById('input1').value;
    let puzzle = [];
    let sum = 0;

    puzzle = puzzleOriginal.split('');
    
    if (Number(puzzle[0]) == Number(puzzle[puzzle.length - 1])) {
        sum = sum + Number(puzzle[0]);
    }

    for (var i = 0; i < puzzle.length; i++) {
        if (Number(puzzle[i]) == Number(puzzle[i + 1])) {
            sum = sum + Number(puzzle[i]);
        }
    }

    result1.innerText = sum;
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