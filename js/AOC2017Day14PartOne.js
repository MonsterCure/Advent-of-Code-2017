function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let sum = 0;

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
            regions.push(('0000000' + list.slice(i, i + 16).reduce((a, b) => a ^ b).toString(2)).slice(-8));
        }
        
        return regions.join('');
    }

    for (let i = 0; i < 128; i++) {
        sum += hash(puzzle + '-' + i).replace(/0+/g, '').length;
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