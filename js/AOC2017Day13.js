function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];
    const layers = [];
    let severity = 0;
    let delay = 0,
        searching = true;

    puzzle = puzzleOriginal.trim();

    for (const line of puzzle.split('\n')) {
        const [depth, range] = line.split(':').map(Number);
        layers[depth] = range;
    }

    for (let i = 0; i < layers.length; i++) {
        let cycleSize = (layers[i] - 1) * 2;
        if (layers[i] === undefined) {
            continue;
        }
        if (i % cycleSize === 0) {
            severity += layers[i] * i;
        }
    }

    while (searching) {
        searching = false;
        for (let i = 0; i < layers.length; i++) {
        let cycleSize = (layers[i] - 1) * 2;        
            if (layers[i] === undefined) {
                continue;
            }
            if ((i + delay) % cycleSize === 0) {
                searching = true;
                delay++;
                break;
            }
        }
    }

    result.innerText = severity + ', ' + delay;
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