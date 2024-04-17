'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      if(req.body.puzzle==undefined||req.body.coordinate==undefined||req.body.value==undefined){
        res.json({error:'Required field(s) missing'});
      }
      else if(req.body.coordinate.match(/^[A-I][1-9]$/)!=req.body.coordinate){         // Check for valid coordinates
        res.json({error: 'Invalid coordinate'});
      }else if(![1,2,3,4,5,6,7,8,9].includes(Number(req.body.value))){         // Check for correct value
        res.json({error: 'Invalid value'});
      }
      else{
        let puzzle=req.body.puzzle;
        let row=['A','B','C','D','E','F','G','H','I'].indexOf(req.body.coordinate[0]);
        let col=req.body.coordinate[1]-1;
        let value=req.body.value;
        try{
          solver.validate(puzzle);

          var canBePlaced=true;
          var result={};
          // Check for conflicts for that value at that coordinate
          let rowConflict=!solver.checkRowPlacement(puzzle,row,col,value);
          let colConflict=!solver.checkColPlacement(puzzle,row,col,value);
          let regConflict=!solver.checkRegionPlacement(puzzle,row,col,value);
          if(!rowConflict&&!colConflict&&!regConflict){
            res.json({valid:true});
          }else{
            result.valid=false;
            result.conflict=[];
            if(rowConflict) result.conflict.push('row');
            if(colConflict) result.conflict.push('column');
            if(regConflict) result.conflict.push('region');
          
            res.json(result);
          }
          
          res.json({valid:canBePlaced})
        }catch(e){
          res.json({error:e.message});
        }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(req.body.puzzle==undefined){
        res.json({ error: 'Required field missing' });
      }
      else{
        let puzzle=req.body.puzzle;
        try{
          solver.validate(puzzle);
          try{
            let solvedPuzzle=solver.solve(puzzle);
            res.json({solution:solvedPuzzle});
          }catch(e){
            res.json({error:'Puzzle cannot be solved'});
          }
        }catch(e){
          res.json({error:e.message});
        }
      }    
    });
};
