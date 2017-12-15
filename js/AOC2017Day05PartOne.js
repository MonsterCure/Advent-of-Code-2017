function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let steps = [];
    let sum = 0;

    steps = puzzleOriginal.split('\n').map(Number);

    for (var i = 0; i < steps.length;) {
        let jumps = steps[i]++;
        i += jumps;
        sum++;
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