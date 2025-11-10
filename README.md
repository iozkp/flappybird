# My Website

## Getting Started

- Setup the recommended extensions
- Install [volta](https://volta.sh/) to manage Node.js versions.
- Run `npm install` to install dependencies.

## Credits

A special thanks to https://github.com/ImKennyYip/flappy-bird for the reference implementation.

## Plans for moving bird (notes)

1. Draw the background.
2. Draw the bird in the middle.
3. When the user presses space:
   - Move the bird up.
4. Let the bird fall slowly (because of gravity).
5. Redraw everything again and again.

## Week 07 — Pipe Planning

### Pipe Data

- Each pipe will have: `x position`, `width`, `gap`, and `top height`.
- All pipes will be stored in an array.
- Each frame, all pipes move left.
- When one leaves the screen, a new pipe appears.

### Pseudocode

for each pipe in pipes:
move left
draw top and bottom pipe

if last pipe is far enough:
add new pipe

### Notes

- I’ll spawn pipes based on distance.
- All pipes reset when the game restarts.
