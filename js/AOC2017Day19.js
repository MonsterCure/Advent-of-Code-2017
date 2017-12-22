function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle;

    puzzle = puzzleOriginal.split('\n').map(rows => rows.split(''));

    let x = puzzle[0].findIndex(v => v !== ' ');
    let y = -1;
    let dx = 0;
    let dy = 1;
    let letters = '';
    let steps = 0;
    loop: while (++steps) {
        x += dx;
        y += dy;
        const symbol = puzzle[y][x];
        switch (symbol) {
            case '|':
            case '-':
                break;
            case '+':
                if (dx === 0) {
                    if (puzzle[y][x - 1] !== ' ') {
                        dx = -1;
                    } else {
                        dx = 1;
                    }
                    dy = 0;
                } else if (dy === 0) {
                    if (puzzle[y - 1][x] !== ' ') {
                        dy = -1;
                    } else {
                        dy = 1;
                    }
                    dx = 0;
                }
                break;
            case ' ':
                break loop;
                break;
            default:
                letters += symbol;
        }
    }
    result.innerText = letters + ', ' + --steps;
}

document.getElementById('sbtbtn1').addEventListener('click', function (e) {
    foo();
});

document.getElementById('sbtbtn1').addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        foo();
    }
}, false);