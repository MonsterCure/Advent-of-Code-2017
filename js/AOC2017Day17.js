function foo() {
    let puzzle = document.getElementById('input1').value;
    let result = document.getElementById('result1');

    let steps = Number(puzzle),
        buffer = [0],
        bufferLength = 1,
        currentPos = 0,
        value;

    for (var i = 1; i <= 2017; i++) {
        currentPos += 1 + steps;
        currentPos %= buffer.length;
        buffer.splice(currentPos, 0, i);
    }

    result.innerText = buffer[currentPos + 1];

    for (var i = 1; i <= 50e6; i++) {
        currentPos = 1 + (currentPos + steps) % bufferLength;
        if (currentPos == 1) {
            value = bufferLength;
        }
        bufferLength++;
    }

    result.innerText += ', ' + value;
}

document.getElementById('sbtbtn1').addEventListener('click', function (e) {
    e.preventDefault();
    foo();
});

document.getElementById('sbtbtn1').addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        foo();
    }
}, false);