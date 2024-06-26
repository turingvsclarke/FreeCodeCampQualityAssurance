'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
    console.log(req.query.input)
    let inputString=req.query.input;
    var inputNum;
    var inputUnit;
    // Get the numerical input
    var error;
    try{
      inputNum=convertHandler.getNum(inputString);
    }catch(e){
      error=e.message;
    }
    // get the units
    try{
      inputUnit=convertHandler.getUnit(inputString);
    }catch(outputError){
      if(error){
        error+=' and unit';
      }else{
        error=outputError.message;
      }
    }
    if(error){
      res.send(error);
    }

    // Get the return unit
    const returnUnit=convertHandler.getReturnUnit(inputUnit);
    
    // Get the returnNum
    const returnNum=convertHandler.convert(inputNum,inputUnit);
    // Get the final string
    const outputString=convertHandler.getString(inputNum,inputUnit,returnNum,returnUnit);
    res.json({ initNum: Number(inputNum), initUnit: inputUnit, returnNum: Number(returnNum.toFixed(5)), returnUnit: returnUnit, string: outputString });
  })
};


