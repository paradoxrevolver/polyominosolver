# polyominosolver
CMPE/SE 133 Team 06 Project

#### PolyominoSolver is an online mathematical tool capable of automatically performing polyomino fitting.

It features a set tools intended to make it quick and easy to solve a polyfit problem for any set of polyominoes for any shape of field.

[TRY IT ONLINE.](https://paradoxrevolver.github.io/polyominosolver/)

## *"What's polyomino fitting?"*

Polyomino fitting is somewhat self-explanatory. You have a region that you want to put a set of polyominoes in, and you find some orientation of your polyominoes that will fit within that region without overlapping or sticking out. [Like this.](https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pentomino_Puzzle_Solutions.svg/400px-Pentomino_Puzzle_Solutions.svg.png)

Of course, unlike this example, not all fields are rectangular, and not all polyominoes are pentominoes (polyominoes with five squares).

## *"Why would I want this done automatically?"*

Trying to complete a fitting problem on pencil and paper is often a task of trial and error. For larger polyominoes and oddly-shaped fields, the ability for a person to find a solution to the problem can get daunting. This program intends to mimic that process extremely quickly, brute forcing solutions with a number of smart shortcuts.

### Credit to:

Ariel Flesler for HashMap.js