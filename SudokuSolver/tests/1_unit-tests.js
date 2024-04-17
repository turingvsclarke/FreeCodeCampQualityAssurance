const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver=new Solver();
let puzzles=require('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {
    // Test 1 Valid Puzzle String
    test('#validPuzzleString',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let coordinate='E5';
        let value=6;
        assert.isString(solver.validate(puzzleString));
    });

    // Test 2 Invalid characters
    test('#invalidPuzzleString',function(){
        let puzzleString='..9h..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.throws(()=>{solver.validate(puzzleString)},'Invalid characters in puzzle','Invalid character error');
    });


    // Test 3 Length issue
    test('#invalidPuzzleLength',function(){
        let puzzleString='..95..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.throws(()=>{solver.validate(puzzleString)},'Expected puzzle to be 81 characters long','Invalid character error');
    });

    // Test 4 Row placement 
    test('#validRowPlacement',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let args=[2,4,1];
        assert.isTrue(solver.checkRowPlacement(puzzleString,...args),'Valid row placement');
    });

    // Test 5 Invalid row placement
    test('#invalidRowPlacement',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let args=[0,8,9];
        assert.isFalse(solver.checkRowPlacement(puzzleString,...args),'Invalid row placement');
    });

    // Test 6 Column placement 
    test('#validColPlacement',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let args=[0,8,6];
        assert.isTrue(solver.checkColPlacement(puzzleString,...args),'Valid column placement');
    });

    // Test 7 Invalid column placement
    test('#invalidColPlacement',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let args=[2,4,1];
        assert.isFalse(solver.checkColPlacement(puzzleString,...args),'Invalid column placement');
    });

    // Test 8 Valid region placement
    test('#validRegPlacement',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let args=[0,1,1];
        assert.isTrue(solver.checkRegionPlacement(puzzleString,...args),'Invalid region placement');
    });

    // Test 9 Invalid region placement
    test('#invalidRegPlacement',function(){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let args=[6,3,3];
        assert.isFalse(solver.checkRegionPlacement(puzzleString,...args),'Invalid region placement');
    });

    // Test 10 Valid puzzle string
    test('#invalidPuzzle',function(){
        let puzzle=puzzles[0][0];
        assert.isString(solver.solve(puzzle),'Solver returns solution string');
    });

    // Test 11 Unsolvable puzzle fails solver
    test('#invalidPuzzle',function(){
        let puzzle='22'+puzzles[0][0].substring(2);
        assert.throws(()=>solver.solve(puzzle),'Puzzle cannot be solved','Unable to solve puzzle');
    });

    // Test 12 Solvable puzzle
    test('#solvePuzzle',function(){
        let puzzle=puzzles[0][0];
        assert.equal(solver.solve(puzzle),puzzles[0][1],'Solves puzzle correctly');
    });
});
