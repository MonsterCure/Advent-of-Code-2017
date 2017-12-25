function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split('\n').map(rows => rows.split('/').map(Number));

    let maxWeightA = 0,
        maxWeightB = 0,
        maxLength = 0;

    function buildBridge(bridge, components, end, weight) {
        for (let i = 0, a, b, newArr; i < components.length; i++) {
            [a, b] = components[i];
            if (a == end || b == end) {
                newArr = components.slice(0);
                newArr.splice(i, 1);
                buildBridge([...bridge, [a, b]], newArr, a + b - end, a + b + weight);
            }
        }

        maxWeightA = Math.max(maxWeightA, weight);
        maxLength = Math.max(maxLength, bridge.length);

        if (bridge.length == maxLength) {
            maxWeightB = Math.max(maxWeightB, weight);
        }
    };

    buildBridge([], puzzle, 0, 0);
    result.innerText = maxWeightA + ', ' + maxWeightB;
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