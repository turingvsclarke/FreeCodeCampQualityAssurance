const Solver = require('./controllers/sudoku-solver.js');
const puzzles=require('./controllers/puzzle-strings.js');
let solver=new Solver();
let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';   // Valid puzzle with many spaces empty
let puzzleString1='566913724342687519197254386685479231219538467734162895926345178473891652851726943';  // Valid puzzle with conflicts
let puzzleString2='568913724342687519197254386685479231219538467734162895926345178473891652851726943'; // Valid solution
let puzzleString3='5..913724342687519197254386685479231219538467734162895926345178473891652851726943';  // Valid puzzle with one space missing
let puzzleString4='5..91372.3...8.5.9.9.25..8668547.23121953846773416289592634517.473891652851726943'; // Puzzle with three spaces empty
let puzzleString5='5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'; // Puzzle with many spaces empty

puzzles.forEach(x=>{
  if(solver.solve(x[0])!=x[1]){
    console.log('Puzzle not solved');
  }
})