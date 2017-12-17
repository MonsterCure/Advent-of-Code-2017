function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split(',');

    let programs = 'abcdefghijklmnop'.split('');
    let dances = [];

    const regex = /(s|x|p)([\d|\w]+)(?:\/(\d+|\w))?/;

    function spin(i) {
        programs = programs.splice(-i, i).concat(programs);
    };

    function swap(a, b) {
        let temp = programs[a];
        programs[a] = programs[b];
        programs[b] = temp;
    };

    function swapPartners(a, b) {
        swap(programs.indexOf(a), programs.indexOf(b));
    };

    var moves = {
        s: spin,
        x: swap,
        p: swapPartners
    };

    for (var dancesCount = 0;; dancesCount++) {
        for (let i = 0; i < puzzle.length; i++) {
            let turn = puzzle[i].match(regex);
            let funcName = moves[turn[1]];
            funcName(turn[2], turn[3]);
        }
        let order = programs.join('');
        if (!dances.indexOf(order)) {
            break;
        }
        dances.push(order);
    }
    
    result.innerText = dances[0] + ', ' + dances[(1e9 % dancesCount) - 1];

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