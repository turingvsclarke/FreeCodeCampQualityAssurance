class SudokuSolver {
  

  validate(puzzleString){
    if(/[^0-9.]/.test(puzzleString)){
      throw new Error('Invalid characters in puzzle');
    }else if(puzzleString.length!=81){
      throw new Error('Expected puzzle to be 81 characters long');
    }else{
      for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
          let index=9*row+col;
          if(puzzleString[index]!='.'){
            let args=[puzzleString,row,col,puzzleString[index]];
            // If any of the placements are wrong, throw an error 
            if((!this.checkRowPlacement(...args))||(!this.checkColPlacement(...args))||(!this.checkRegionPlacement(...args))){
              throw new Error('Puzzle cannot be solved');
            }
          }
        }
      }
      return puzzleString;
    } 
  }

  // Returns true if value can go in that row. False otherwise
  checkRowPlacement(puzzleString, row, column, value) {
    const valIndex=9*row+column;
    if(puzzleString[valIndex]!='.'&&puzzleString[valIndex]!=value) return false;
    for(let i=0;i<9;i++){
      let index=9*row+i;
      if(puzzleString[index]==value&&index!=valIndex){
        return false;
      }
    }
    return true;
  }

  // Returns true if value can go in that col. False otherwise
  checkColPlacement(puzzleString, row, column, value) {
    const valIndex=9*row+column;
    //console.log('The index is '+valIndex);
    if(puzzleString[valIndex]!='.'&&puzzleString[valIndex]!=value) return false;
    //console.log('The space is not filled with a different number');
    for(let i=0;i<9;i++){
      let index=9*i+column;
      //console.log('Checking index '+index);
      if((puzzleString[index]==value)&&(index!=valIndex)){
        //console.log('Value at this index is '+puzzleString[index]);
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const valIndex=9*row+column;
    if(puzzleString[valIndex]!='.'&&puzzleString[valIndex]!=value) return false;
    // Find the upper left corner of the region. 
    const corner=3*9*Math.floor(row/3)+3*Math.floor(column/3);

    // Move left or down 0-2 spaces and look for the given value
    for(let i=0;i<3;i++){
      // Check all three rows bounding that region
      let coordinate=corner+9*i;
      for(let j=0;j<3;j++){
        // Check all three columns bounding that region
        // Because the string is translated into puzzle reading left to right, 9 times the row+column yields the square
        if(puzzleString[coordinate+j]==value&&(coordinate+j)!=valIndex){
            return false;
          }
      }
    }
    return true;
  }

  solve(puzzleString) {
    // If the puzzle has empty spaces, add a number, then solve the resulting string. If not, validate the string and return it.
    let emptyIndex=puzzleString.indexOf('.');
    if(emptyIndex>=0){
      for(let i=1;i<10;i++){
        try{
          // Insert the new value into the string at that index and validate the puzzle
          var newPuzzle=puzzleString.substring(0,emptyIndex)+i+puzzleString.substring(emptyIndex+1);
          // This can throw an error
          this.validate(newPuzzle);
          // This can throw an error
          var solvedPuzzle=this.solve(newPuzzle);
          return solvedPuzzle;
        }catch(e){
          //console.log(e.message);
          //console.log("Attempted to put a "+i+" at space "+emptyIndex);
          //console.log("The puzzle looks like: "+puzzleString);
          if(i==9){
            //console.log('We have tried all the values from 0 to 9');
            throw new Error(e.message);
          }
        }
      }
    }else{
      // Check to see if the puzzle is valid. Throws error if not a valid solution
      this.validate(puzzleString);
      return puzzleString;
    }
  }
}

module.exports = SudokuSolver;

