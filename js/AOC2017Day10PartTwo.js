function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    let list = [...Array(256).keys()];

    puzzle = puzzleOriginal.split('').map(v => v.charCodeAt(0));
    puzzle.push(17, 31, 73, 47, 23);

    function reverse(array, i, j) {
        while (i < j) {
            [array[i % array.length], array[j % array.length]] = [array[j % array.length], array[i % array.length]];
            i++;
            j--;
        }
    };

    for (let start = 0, skip = 0, i = 0; i < 64 * puzzle.length; i++) {
        reverse(list, start, start + puzzle[i % puzzle.length] - 1);
        start = (start + puzzle[i % puzzle.length] + skip++) % list.length;
    }

    for (var hash = '', i = 0; i < list.length; i += 16) {
        hash += ('0' + list.slice(i, i + 16).reduce((xor, cur) => xor ^ cur).toString(16)).slice(-2);  //substr(-2);
    }

    result.innerText += hash;
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