function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let x = 0;
    let y = 0;
    let z = 0;
    let distance = 0;
    let distances = [];
    let max = -Infinity;

    puzzle = puzzleOriginal.split(',');

    for (let i = 0; i < puzzle.length; i++) {
        switch (puzzle[i]) {
            case 'n':
                y += 1;
                z -= 1;
                break;
            case 'ne':
                x += 1;
                z -= 1;
                break;
            case 'se':
                x += 1;
                y -= 1;
                break;
            case 's':
                y -= 1;
                z += 1;
                break;
            case 'sw':
                x -= 1;
                z += 1;
                break;
            case 'nw':
                x -= 1;
                y += 1;
                break;
        }
        distance = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
        // distance = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
        distances.push(distance);
    }

    for (let i = 0; i < distances.length; i++) {
        if (distances[i] > max) {
            max = distances[i];
        }
    }

    result.innerText = distance + ', ' + max;
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