# polyominosolver
CMPE/SE 133 Team 06 Project

#### PolyominoSolver is a mathematical tool capable of automatically performing polyomino fitting.

It features a set of tools intended to make it quick and easy to solve any polyfit problem.

[TRY IT HERE.](https://paradoxrevolver.github.io/polyominosolver/)

## *"What's polyomino fitting?"*

Polyomino fitting is somewhat self-explanatory. You have a region that you want to put a set of polyominoes into, and you find an orientation of your polyominoes that will fit within that region without overlapping each other or sticking out. [Like this.](https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pentomino_Puzzle_Solutions.svg/400px-Pentomino_Puzzle_Solutions.svg.png)

Of course, unlike this example, not all fields are rectangular, and not all polyominoes are pentominoes (polyominoes with five squares). A polyfit problem can be significantly more or less complex.

## *"What does PolyominoSolver help me do?"*

PolyominoSolver aims to simplify the process of polyomino fitting as much as possible by offering an intuitive user interface and an efficient automatic solver for polyfit problems.

## *"Why would I want polyomino fitting done automatically?"*

Trying to complete a fitting problem on pencil and paper is a task of trial and error, and one that can take hours to find a single solution. For larger polyominoes and oddly-shaped fields, the ability for a person to find a solution can be daunting. This program uses an algorithm to complete that process much more quickly, finding solutions with a number of smart shortcuts.

## *"How do I use this program?"*

PolyominoSolver is compromised of a pair of screens. You can access either of these screens by clicking one of the tabs in the header.

The Polyomino tab is used for constructing and saving polyominoes. The Field tab is where you design a field for polyominoes to fit into, perform polyomino fitting, and view the solutions that the program generated.

Below the grids on both of these screens are the same two containers, the Palette and the Bank. These are called the Polykeepers, as their job is simply to hold onto polyominoes between the Polyomino and Field screens.

### The Polyomino Grid

In order to design a polyomino that the program can use, simply click or drag across the grid. Click the pink save button when you have the polyomino you'd like to use in your polyfit problem, or clear the board with the clear button. You can adjust the size of the grid for larger polyominoes by clicking the plus or minus button to the top right of the grid.

When you save a polyomino, it will travel into the Palette assuming that the polyomino you designed is a valid polyomino and does not already exist in Palette.

### The Polykeepers (The Palette and the Bank)

When a set of unique polyominoes are entered into the Palette, you can click these polyominoes to send them into the Bank. Holding shift and clicking will send that polyomino back up into the Polyomino grid, and holding control and clicking will delete the polyomino from the Palette. You can also right click a polyomino in the Palette to get a list of all of these options.

The polyominoes inside of the Bank are not unique, and will stack on top of one another with a pink indicator symbol. The polyominoes in the Bank are the ones actually used by the solver, so remember to Bank several polyominoes from the Palette before you try solving in the field. Clicking a polyomino in the Bank will attempt to send it back to the Palette if it doesn't exist in the Palette (in case you accidentally delete a Palette polyomino and didn't mean to). Holding shift and clicking will increase the count of the polyomino in the Bank by one, while holding control and clicking will decrease the count by one or delete the polyomino completely if there is only one of it left. Similar to the Palette, you can right click a polyomino in the Bank to get a list of all of these options.

### The Field Grid

Here, you design the field to fit polyominoes into. You can draw on the grid in exactly the same fashion as the Polyomino grid, as well as adjust the size in the top right. Pressing the Flood button will fill every square on the field, in case you need a quick, large square or rectangular field. Pressing Clear will remove every square. When you press solve, the program will attempt to solve using the polyominoes in the Bank and the region on the Field grid. There are several things that must be true before the solving will actually start:

- There must be at least one polyomino in the Bank
- There must be enough squares in the field to house all the polyominoes in the Bank (there can be more space than needed)
- If the field is separated into different sections, each section must be large enough to hold at least one polyomino

When all of these things are true, the solver will go to work. The pink stop button will light up, and the other buttons will no longer be clickable. When the solver is done, it will present all its solutions or tell you that there were no solutions that could be found. All the solutions are presented in the Field grid, and a slider directly below it will let you scroll through the solutions individually. When you're done looking at solutions, press the stop button to return to the field drawing mode.

## CREDIT TO:

Ariel Flesler for HashMap.js