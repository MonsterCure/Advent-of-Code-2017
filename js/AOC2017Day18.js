function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split('\n').map(rows => rows.split(' '));

    function Program(id) {
        this.id = id;
        this.registers = {
            p: id
        };
        this.queue = [];
        this.lastSound;
        this.i = 0;
        this.waiting = false;
    }

    Program.prototype = {
        set: function (a, b) {
            this.registers[a] = isNaN(b) ? this.registers[b] : +b;
        },
        add: function (a, b) {
            this.registers[a] += isNaN(b) ? this.registers[b] : +b;
        },
        mul: function (a, b) {
            this.registers[a] *= isNaN(b) ? this.registers[b] : b;
        },
        mod: function (a, b) {
            this.registers[a] %= isNaN(b) ? this.registers[b] : b;
        },
        jgz: function (a, b) {
            if ((isNaN(a) ? this.registers[a] : a) > 0) {
                this.i += (isNaN(b) ? this.registers[b] : b) - 1;
            }
        },
        snd: function (a) {
            this.lastSound = isNaN(a) ? this.registers[a] : +a;
        },
        rcv: function (a) {
            if (isNaN(a) ? this.registers[a] : a) {
                result.innerText += 'Last sound: ' + this.lastSound;
            }
            this.i = -1;
        }
    };

    (function () {
        var program = new Program(0);

        for (; program.i >= 0 && program.i < puzzle.length; program.i++) {
            program[puzzle[program.i][0]](puzzle[program.i][1], puzzle[program.i][2]);
        }

    }());

    (function () {
        var counter = 0;
        var A = new Program(0);
        var B = new Program(1);

        A.snd = function (a) {
            B.queue.push(isNaN(a) ? +this.registers[a] : +a);
        };

        B.snd = function (a) {
            counter++;
            A.queue.push(isNaN(a) ? +this.registers[a] : +a);
        };

        Program.prototype.rcv = function (a) {
            if (this.queue.length) {
                this.registers[a] = this.queue.shift();
                this.waiting = false;
            } else {
                this.waiting = true;
                this.i--;
            }
        };

        for (; A.i >= 0 && B.i >= 0 && A.i < puzzle.length && B.i < puzzle.length; A.i++, B.i++) {
            A[puzzle[A.i][0]](puzzle[A.i][1], puzzle[A.i][2]);
            B[puzzle[B.i][0]](puzzle[B.i][1], puzzle[B.i][2]);

            if (A.waiting && B.waiting) {
                break;
            }
        }

        result.innerText += '; ' + 'Sent by program B: ' + counter;

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