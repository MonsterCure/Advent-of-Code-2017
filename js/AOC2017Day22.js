function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split('\n');

    let map = {},
        x,
        y;

    for (y = 0; y < puzzle.length; y++) {
        for (x = 0; x < puzzle[y].length; x++) {
            map[x + '#' + y] = puzzle[y][x];
        }
    }

    function exe(steps, map, mutations) {
        let i,
            state,
            pos = {x: 12, y: 12},
            dirs = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}],
            dir = 0,
            count = 0;

        for (i = 0; i < steps; i++) {
            state = map[pos.x + '#' + pos.y];
            dir = (dir + {
                undefined: 3,
                '.': 3,
                'W': 0,
                '#': 1,
                'F': 2
            }[state]) % 4;

            map[pos.x + '#' + pos.y] = mutations[state];

            count += mutations[state] == '#';
            pos.x += dirs[dir].x;
            pos.y += dirs[dir].y;
        }
        return count;
    };

    result.innerText += exe(10000, Object.create(map), {
        undefined: '#',
        '.': '#',
        '#': '.'
    });

    result.innerText += ', ' + exe(10000000, Object.create(map), {
        undefined: 'W',
        '.': 'W',
        'W': '#',
        '#': 'F',
        'F': '.'
    });
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