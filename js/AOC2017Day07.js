function foo() {

    let puzzleOriginal = document.getElementById('input1').value;
    let result = document.getElementById('result1');
    let puzzle = [];

    puzzle = puzzleOriginal.split('\n');

    function parse(subTowers) {
        return subTowers.match(/(\w+) \((\d+)\)(?: -> (.+))?/)
    }

    const towerMap = puzzle.map(parse).reduce((object, [, key, weight, nodes]) =>
        Object.assign(object, { [key]: { key, weight: +weight, nodes: nodes && nodes.split(', ') } }), {});
    console.log(towerMap);

    const towers = Object.values(towerMap);
    console.log(towers);

    function isNotAChild({ key }) {
        return function ({ nodes }) {
            return !nodes || !nodes.includes(key);
        }
    }

    const head = towers.filter(function (a) {
        return towers.every(isNotAChild(a));
    })[0];
    console.log(head);


    function getNormalWeight([x, y, z]) {
        if (x === y) {
            return x = x;
        } else {
            return x = z;
        }
    }

    const findWrongWeight = a => (norm => ({ i: a.findIndex(x => x !== norm), norm }))(getNormalWeight(a));

    function sum(a) {
        return a.reduce(function (acc, x) {
            return acc + x, 0;
        })
    }

    function correctError({ weight, nodes }) {
        if (!nodes) {
            return [weight, 0];
        }
        const rec = nodes.map(key => correctError(towerMap[key]));
        const ws = rec.map(res => res[0]);
        const fix = (rec.find(res => res[1]) || [])[1] || 0;
        const { i, norm } = findWrongWeight(ws);
        if (fix || i < 0 || !norm) return [weight + ws[0] * ws.length, fix];
        return [weight + sum(ws) + norm - ws[i], towerMap[nodes[i]].weight + norm - ws[i]];
    };

    result.innerText = head.key + ', ' + correctError(head)[1];

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