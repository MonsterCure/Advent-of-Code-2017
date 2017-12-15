function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let banks = [];
    let banksRedistributed = [];
    let max = -Infinity;
    let maxIndex = 0;
    let sum = 0;

    banks = puzzleOriginal.split('\t').map(Number);

    while (!(largestBank = banksRedistributed[banks])) {
        banksRedistributed[banks] = sum;
        maxIndex = 0;
        for (var i = 0; i < banks.length; i++) {
            if (banks[i] > banks[maxIndex]) {
                maxIndex = i;
            }
        }
        max = banks[maxIndex];
        banks[maxIndex] = 0;
        while (max > 0) {
            maxIndex++;
            if (maxIndex >= banks.length) {
                maxIndex = 0;
            }
            banks[maxIndex]++;
            max--;
        }
        sum++;
    }

    result.innerText = sum + ', ' + (sum - (banksRedistributed[banks] - banksRedistributed.length));

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