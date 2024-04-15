'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
    console.log(req.query.input)
    let inputString=req.query.input;
    // Get the units
    const inputUnit=convertHandler.getUnit(inputString);
    // Get the numerical input
    const inputNum=convertHandler.getNum(inputString);
    // get the returnUnit
    const outUnit=convertHandler.getReturnUnit(inputUnit);
    if(outUnit=="invalid unit"||inputNum=='invalid number'){
      if(inputNum=='invalid number'){
        if(outUnit=='invalid unit'){
          res.send('invalid number and unit');
        }
        res.send('invalid number');
      }
      res.send('invalid unit');
    }
    // Get the returnNum
    const returnNum=convertHandler.convert(inputNum,inputUnit);
    // Get the final string
    const outputString=convertHandler.getString(inputNum,inputUnit,returnNum,outUnit);
    res.json({ initNum: Number(inputNum), initUnit: inputUnit, returnNum: Number(returnNum.toFixed(5)), returnUnit: outUnit, string: outputString });
  })
};


