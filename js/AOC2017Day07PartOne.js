function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let puzzle = [];
    let name = [];
    let name1 = [];
    let towers = [];
    let towers1 = [];
    let base = '';

    puzzle = puzzleOriginal.split('\n');

    for (let i = 0; i < puzzle.length; i++) {
        let puzzleChild = puzzle[i].split('->');
        name.push(puzzleChild[0]);
        towers.push(puzzleChild[1]);
    }

    for (let i = 0; i < name.length; i++) {
        let nameChild = name[i].split(' ');
        name1.push(nameChild[0]);
    }

    for (let i = 0; i < towers.length; i++) {
        if (towers[i] !== undefined) {
            let towersChild = towers[i].trim().split(',');
            for (let i = 0; i < 7; i++) {
                if (towersChild[i] !== undefined) {
                    towers1.push(towersChild[i].trim());
                }
            }
        }
    }

    base = name1.filter(function (item) {
        return !towers1.includes(item);
    });

    result.innerHTML = base;
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