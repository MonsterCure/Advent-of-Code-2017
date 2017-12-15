function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    puzzle = puzzleOriginal.split(',').map(Number);
    let list = [...Array(256).keys()];

    function reverse(array, i, j) {
        while (i < j) {
            [array[i % array.length], array[j % array.length]] = [array[j % array.length], array[i % array.length]];
            i++;
            j--;
        }
    };

    for (let start = 0, skip = 0, i = 0; i < puzzle.length; i++) {
        reverse(list, start, start + puzzle[i] - 1);
        start = (start + puzzle[i] + skip++) % list.length;
    }

    result.innerText = list[0] * list[1];
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