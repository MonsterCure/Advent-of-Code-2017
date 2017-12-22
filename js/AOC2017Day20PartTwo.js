function foo() {
    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle;

    puzzle = puzzleOriginal.split('\n').map(rows => rows.split(', ').map(coords => coords.slice(3).slice(0, -1).split(',').map(Number)));

    var xyz = ([x, y, z], [dx, dy, dz]) => [x + dx, y + dy, z + dz];
    var manhDist = ([x, y, z]) => Math.abs(x) + Math.abs(y) + Math.abs(z);
    var spos = ([a, b, c], [x, y, z]) => (a == x && b == y && c == z)
    var distances = [];
    var seen = [];

    for (let i = 0; i < 1000; i++) {

        puzzle.forEach((particle, index) => {
            var pos = particle[0];
            var vel = particle[1];
            var acc = particle[2];

            particle[1] = xyz(vel, acc);
            particle[0] = xyz(pos, particle[1]);

            distances[index] = manhDist(particle[0]);
            seen.push(particle[0][0] + '/' + particle[0][1] + '/' + particle[0][2]);
        });

        seen.forEach((val, index) => {
            var a = seen.indexOf(val);
            if(a != index){
                puzzle[a] = null;
                puzzle[index] = null;
            }
        });
        puzzle = puzzle.filter(c => c != null);
        seen = [];

    }

    result.innerText = puzzle.length;

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