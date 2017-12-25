function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split('\n');

    let state = puzzle[0].match(/Begin.+(.)./)[1];
    let steps = Number(puzzle[1].match(/(\d+)/)[1]);
    let tape = new Map,
        pos = 0,
        count = 0;

    let rules = {};

    let states = puzzle.slice(3).join ` `.split(/In/g).slice(1)
        .map(str => str.match(/(\b\w\b|left|right)/g))
        .map(([state, value1, write1, move1, next1, value2, write2, move2, next2]) => {
            rules[state] = [
                [+write1, move1 === 'left' ? -1 : 1, next1],
                [+write2, move2 === 'left' ? -1 : 1, next2]
            ]
        });

    while (steps--) {
        let [value, dir, nextState] = rules[state][tape.get(pos) || 0];
        tape.set(pos, value);
        pos += dir;
        state = nextState;
    }

    for (let t of tape.values()) {
        count += t;
    }

    result.innerText = count;
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