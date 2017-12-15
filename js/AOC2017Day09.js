function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let sum = 0;
    let groupSum = 0;
    let garbageSum = 0;

    puzzle = puzzleOriginal.split('');

    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i] == '{') {
            groupSum++;
            sum += groupSum;
        } else if (puzzle[i] == '}') {
            groupSum--;
        } else if (puzzle[i] == '<') {
            i++;
            while (puzzle[i] != '>') {
                if (puzzle[i] == '!') {
                    i++;
                } else {
                    garbageSum++;
                }
                i++;
            }
        }
    }
    result.innerText = sum + ', ' + garbageSum;

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