function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let rules = {};
    let grid;

    puzzleOriginal.split('\n').forEach(rows => {
        let tokens = rows.split(' => ');
        rules[tokens[0]] = tokens[1];
    });

    function generateArt(totalReps) {
        grid = ['.#.', '..#', '###'];
        for (let loop = 0; loop < totalReps; loop++) {
            let sub = getSubgrids();
            for (let i = 0; i < sub.length; i++) {
                sub[i] = rule(sub[i]);
            }
            grid = reform(sub);
        }
    }

    function rule(row) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
                let morphed = morph(row, j, i);
                if (rules.hasOwnProperty(morphed)) {
                    return rules[morphed];
                }
            }
        }
    }

    function morph(row, rotate, flip) {
        let oldRows = row.split('/');
        if (flip) {
            oldRows.reverse();
        }
        for (let k = 0; k < rotate; k++) {
            let newRows = [];
            for (i = 0; i < oldRows.length; i++) {
                let newRow = "";
                for (let j = oldRows.length - 1; j >= 0; j--) {
                    newRow += oldRows[j][i];
                }
                newRows.push(newRow);
            }
            oldRows = newRows;
        }
        return oldRows.join('/');
    }

    function getSubgrids() {
        let num = grid.length % 2 == 0 ? 2 : 3;
        let rows = [];
        for (let i = 0; i < grid.length; i += num) {
            for (let j = 0; j < grid.length; j += num) {
                let row = "";
                for (let k = 0; k < num; k++) {
                    row += grid[i + k].substr(j, j + num) + "/";
                }
                rows.push(row.substr(0, row.length - 1));
            }
        }
        return rows;
    }

    function reform(arr) {
        let newGrid = [];
        let num = Math.sqrt(arr.length);
        let rowLen = arr[0].match(/\//g).length + 1;
        for (let i = 0; i < arr.length; i += num) {
            for (let j = 0; j < rowLen; j++) {
                let row = "";
                for (let k = 0; k < num; k++) {
                    row += arr[i + k].split('/')[j];
                }
                newGrid.push(row);
            }
        }
        return newGrid;
    }

    generateArt(5);
    var count = grid.reduce((a, b) => a + b.match(/#/g).length, 0);
    result.innerText = count;

    generateArt(18);
    var count = grid.reduce((a, b) => a + b.match(/#/g).length, 0);
    result.innerText += ', ' + count;

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