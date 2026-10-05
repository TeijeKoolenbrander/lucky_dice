/**
 * Small presentation helpers. Shared by both pages.
 * No game logic lives here — that is all in core/.
 */

/** Scattered starfield dots for the background. */
function sparkles(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const size = 3 + Math.random() * 5;
    out.push({
      id: i,
      style:
        `left:${(Math.random() * 100).toFixed(2)}%;` +
        `top:${(Math.random() * 92).toFixed(2)}%;` +
        `width:${size.toFixed(1)}rpx;height:${size.toFixed(1)}rpx;` +
        `opacity:${(0.18 + Math.random() * 0.5).toFixed(2)};`,
    });
  }
  return out;
}

/**
 * Pip layout per face, as a 3x3 grid read left-to-right, top-to-bottom.
 * 1 and 4 are red; the rest blue — standard Chinese dice colouring.
 */
const PIPS = {
  1: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  2: [1, 0, 0, 0, 0, 0, 0, 0, 1],
  3: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  4: [1, 0, 1, 0, 0, 0, 1, 0, 1],
  5: [1, 0, 1, 0, 1, 0, 1, 0, 1],
  6: [1, 0, 1, 1, 0, 1, 1, 0, 1],
};

/** Turn a hand into something WXML can render directly. */
function toDice(hand) {
  return hand.map(function (value, i) {
    return {
      id: i,
      value: value,
      cells: PIPS[value],
      red: value === 1 || value === 4,
    };
  });
}

module.exports = { sparkles, toDice, PIPS };
