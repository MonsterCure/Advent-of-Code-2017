function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let containedPrograms = [];

    puzzle = puzzleOriginal.split('\n').map(function (rows) {
        return rows.split(' <-> ')[1].split(", ").map(Number);
    });

    function pipes(a) {
        if (containedPrograms.includes(a)) {
            return 0;
        } else {
            containedPrograms.push(a);
            return puzzle[a].reduce(function (a, b) {
                return a + pipes(b);
            }, 1);
        }
    }

    puzzle = puzzle.map(function (a, b) {
        return pipes(b);
    });

    result.innerText = puzzle[0] + ', ' + puzzle.filter(function (a) {
        return a > 0;
    }).length;

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