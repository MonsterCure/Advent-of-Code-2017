function foo() {
    let result = document.getElementById('result1');
    let puzzleOriginal = document.getElementById('input1').value;
    let puzzle = [];
    let sum = 0;
    
    puzzle = puzzleOriginal.split('');

    for (var i = 0; i < puzzle.length; i++) {

        if (i < puzzle.length / 2 && Number(puzzle[i]) == Number(puzzle[i + puzzle.length / 2])) {
            sum = sum + Number(puzzle[i]);
        }
        if (i >= puzzle.length / 2 && i < puzzle.length && Number(puzzle[i]) == Number(puzzle[i - puzzle.length / 2])) {
            sum = sum + Number(puzzle[i]);
        }

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