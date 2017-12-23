function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split('\n').map(rows => rows.split(' '));

    function Program(id) {
        this.id = id;
        this.registers = {
            p: id,
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: 0,
            h: 0
        };
        this.i = 0;
        this.counter = 0;
    }

    Program.prototype = {
        set: function (a, b) {
            this.registers[a] = isNaN(b) ? this.registers[b] : +b;
        },
        sub: function (a, b) {
            this.registers[a] -= isNaN(b) ? this.registers[b] : +b;
        },
        mul: function (a, b) {
            this.registers[a] *= isNaN(b) ? this.registers[b] : b;
            this.counter++;
            result.innerText = this.counter;
        },
        jnz: function (a, b) {
            if ((isNaN(a) ? this.registers[a] : a) !== 0) {
                this.i += (isNaN(b) ? this.registers[b] : b) - 1;
            }
        }
    };

    (function () {
        var program = new Program(0);

        for (; program.i >= 0 && program.i < puzzle.length; program.i++) {
            program[puzzle[program.i][0]](puzzle[program.i][1], puzzle[program.i][2]);
        }

        let newRegs = {
            b: program.registers['b'],
            c: program.registers['c'],
            d: 0,
            f: 0,
            g: 0,
            h: 0
        }

        newRegs['b'] = newRegs['b'] * 100 + 100000;
        newRegs['c'] = newRegs['b'] + 17000;

        do {
            newRegs['f'] = 1;
            newRegs['d'] = 2;
            for (let d = newRegs['d']; d * d < newRegs['b']; ++d) {
                if (newRegs['b'] % d === 0) {
                    newRegs['f'] = 0;
                    break;
                }
            }
            if (newRegs['f'] === 0) {
                newRegs['h']++;
                newRegs['g'] = newRegs['b'] - newRegs['c'];
            }
            newRegs['b'] += 17;
        } while (newRegs['g'] !== 0)

        result.innerText += ', ' + newRegs['h'];
    }());
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