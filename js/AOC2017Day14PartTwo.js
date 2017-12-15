function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    const disk = [];
    let sum = 0;
    const stack = [];

    puzzle = puzzleOriginal.trim();
    
    function hash(input) {
        const puzzle = [...input].map((c) => c.charCodeAt(0)).concat(17, 31, 73, 47, 23);
        const list = [...Array(256).keys()];
        let start = 0,
            skip = 0,
            span = [];
        for (let i = 0; i < 64; i++) {
            for (const len of puzzle) {
                if (len > list.length) {
                    continue;
                }
                for (let j = start; j < start + len; j++) {
                    span.push(list[j % list.length]);
                }
                for (let j = start; j < start + len; j++) {
                    list[j % list.length] = span.pop();
                }
                start = (start + len + skip++) % list.length;
            }
        }

        const regions = [];
        for (let i = 0; i < list.length; i += 16) {
            regions.push(...('0000000' + list.slice(i, i + 16).reduce((a, b) => a ^ b).toString(2)).substr(-8));
        }

        return regions.map(Number).map(Boolean);
    }

    for (let i = 0; i < 128; i++) {
        disk.push(hash(puzzle + '-' + i));
    }

    for (let i = 0; i < disk.length; i++) {
        for (let j = 0; j < disk[i].length; j++) {
            if (!disk[i][j]) {
                continue;
            }
            sum++;
            stack.push([i, j]);
            while (stack.length) {
                const [x, y] = stack.pop();
                disk[x][y] = false;
                if (disk[x - 1] && disk[x - 1][y]) {
                    stack.push([x - 1, y]);
                }
                if (disk[x + 1] && disk[x + 1][y]) {
                    stack.push([x + 1, y]);
                }
                if (disk[x][y - 1]) {
                    stack.push([x, y - 1]);
                }
                if (disk[x][y + 1]) {
                    stack.push([x, y + 1]);
                }
            }
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