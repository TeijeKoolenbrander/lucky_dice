# 骰盅 lucky_dice v1.1

A private WeChat Mini Program that replaces the physical dice cup for 吹牛 / 大话骰.
Shake, peek at your five dice, and play out loud. The rolls are rigged. Full design is in [SPEC.md](SPEC.md).

## Modes

The launch screen shows a title, a **PLAY** button and a help link. Each one opens a mode:

| Tap | Mode | Behaviour |
|---|---|---|
| **PLAY** | Lucky | Good hand ~91% of the time, but bad rolls still happen |
| **摇骰子** (title) | Insane | Always four or five of a kind (1s are wild) |
| **玩法说明** (help link) | Cheat | Fair roll that you can secretly override |

**Cheat override:** long-press 摇 to arm it (you feel a double vibration). The screen then acts as a 3×2 grid. Tap once for the quantity and once for the face, and the hand is set. See SPEC §2.3 for the zone layout.

**Cup controls:** tap 摇 to roll. Swipe up to reveal the dice and swipe down to hide them.

## Development

No dependencies and no build step.

```sh
npm test            # run the node:test suite against core/
npm run stats       # print each mode's distribution over 200k hands
```

To run the app, open WeChat DevTools, choose 导入项目, and select the repo root.

- `core/` holds the pure roll logic. It makes no `wx.*` calls.
- `core/config.js` holds every tunable probability and timing.
- `pages/` holds the UI: `home` is the launch screen and `cup` is the play screen.

