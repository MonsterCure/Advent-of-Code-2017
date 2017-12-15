function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let puzzleWord = [];
    let puzzleWord1 = [];
    let puzzleWord2 = [];
    let puzzleWord3 = [];
    let sum = 0;
    let sum1 = 0;    

    puzzle = puzzleOriginal.split('\n');

    for (var i = 0; i < puzzle.length; i++) {
        puzzleWord = puzzle[i].split(' ');

        puzzleWord1 = Array.from(new Set(puzzleWord));

        if (puzzleWord.length == puzzleWord1.length) {
            sum = sum + 1;
        }
    }
    
    function orderLetters(puzzleWord) {
        return Array.from(puzzleWord).sort().join('');
    }

    for (const line of puzzle) {
        const puzzleWord1 = line.trim().split(/\s+/);
        const puzzleWord2 = puzzleWord1.map(orderLetters);
        const puzzleWord3 = new Set(puzzleWord2);
        if (puzzleWord3.size === puzzleWord2.length) {
            sum1++;
        }
    }

    result.innerText = sum + ', ' + sum1;
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