function foo() {
    let puzzle = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    const regex = /^([a-z0-9]+) (inc|dec) (-?\d+) if ([a-z0-9]+) (.+) (-?\d+)$/;
    const registers = {};
    let max = -Infinity;

    puzzle.split('\n')
        .forEach(instruction => {
            const [, regKey, incDec, incDecAmount, ifKey, ifOp, ifAmount] = regex.exec(instruction);

            if (!(regKey in registers)) {
                registers[regKey] = 0;
            }

            if (!(ifKey in registers)) {
                registers[ifKey] = 0;
            }

            if (eval(`${registers[ifKey]} ${ifOp} ${ifAmount}`)) {
                registers[regKey] += (incDec == 'inc') ? +incDecAmount : -incDecAmount;
                max = Math.max(max, registers[regKey]);
            }
        });

    result.innerText = Math.max(...Object.values(registers)) + ', ' + max;
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