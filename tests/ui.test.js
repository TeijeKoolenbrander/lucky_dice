const test = require('node:test');
const assert = require('node:assert');

const { toDice, PIPS } = require('../utils/ui');
const { zoneAt, zoneToQuantity, zoneToFace } = require('../core/cheat');

test('every face draws as many pips as its value', () => {
  for (let v = 1; v <= 6; v++) {
    const drawn = PIPS[v].reduce((a, b) => a + b, 0);
    assert.strictEqual(drawn, v, `face ${v} draws ${drawn} pips`);
  }
});

test('pip layouts are symmetric', () => {
  // Reading the 3x3 grid backwards must give the same layout.
  for (let v = 1; v <= 6; v++) {
    assert.deepStrictEqual(PIPS[v], [...PIPS[v]].reverse(), `face ${v}`);
  }
});

test('1 and 4 render red, everything else blue', () => {
  const dice = toDice([1, 2, 3, 4, 5]);
  assert.deepStrictEqual(
    dice.map((d) => d.red),
    [true, false, false, true, false]
  );
});

test('toDice keeps the hand order and values', () => {
  const dice = toDice([6, 1, 3, 3, 2]);
  assert.deepStrictEqual(dice.map((d) => d.value), [6, 1, 3, 3, 2]);
  assert.strictEqual(dice.length, 5);
});

test('zone geometry maps the screen to the 3x2 grid', () => {
  const W = 400;
  const H = 900; // rows at 0-300, 300-600, 600-900

  const cases = [
    [100, 50, 0], // top left
    [300, 50, 1], // top right
    [100, 400, 2], // mid left
    [300, 400, 3], // mid right
    [100, 800, 4], // bottom left
    [300, 800, 5], // bottom right
  ];
  for (const [x, y, expected] of cases) {
    assert.strictEqual(zoneAt(x, y, W, H), expected, `(${x},${y})`);
  }
});

test('zone geometry clamps a touch past the bottom edge', () => {
  assert.strictEqual(zoneAt(10, 99999, 400, 900), 4);
  assert.strictEqual(zoneAt(390, 99999, 400, 900), 5);
});

test('the column split is exactly at the midline', () => {
  assert.strictEqual(zoneAt(199, 50, 400, 900), 0);
  assert.strictEqual(zoneAt(200, 50, 400, 900), 1);
});

test('worked example: three 1s is mid-left then top-left', () => {
  const W = 400;
  const H = 900;
  // "tap three, then one"
  const qtyZone = zoneAt(100, 400, W, H); // mid left
  const faceZone = zoneAt(100, 50, W, H); // top left
  assert.strictEqual(zoneToQuantity(qtyZone), 3);
  assert.strictEqual(zoneToFace(faceZone), 1);
});
