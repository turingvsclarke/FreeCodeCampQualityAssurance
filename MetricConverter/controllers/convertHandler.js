function ConvertHandler() {
  
  this.getNum = function(input) {
    // Return the first part of the input string
    let inputNum=input.match(/^\d*.*\d/);
    if(inputNum==null){
      return 1;
    }else{
      // Test for fractions 
      let num=inputNum[0];
      if(num.indexOf('/')>0){
        num=num.substring(0,num.indexOf('/'))/num.substring(num.indexOf('/')+1);
      }
      return ((num*1)||num==0)?num:'invalid number';
    }
  };
  
  this.getUnit = function(input) {
    // Return the second part
   let inputUnit=input.match(/[a-zA-Z]*$/)[0];
   return inputUnit.toUpperCase()=='L'?'L':inputUnit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit.toUpperCase()){
      case 'GAL': 
        return 'L';
      case 'L':
        return 'gal';
      case 'MI':
        return 'km';
      case 'LBS':
        return 'kg';
      case 'KG':
        return 'lbs';
      case 'KM':
        return 'mi';
      default:
        return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit.toUpperCase()){
      case 'GAL': 
        return 'gallons';
      case 'L':
        return 'liters';
      case 'MI':
        return 'miles';
      case 'LBS':
        return 'pounds';
      case 'KG':
        return 'kilograms';
      case 'KM':
        return 'kilometers';
      default:
        return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if(initNum==0){
      return 0;
    }
    if(initNum==''){
      initNum=1;
    }
    switch(initUnit.toUpperCase()){
      case 'GAL': 
        return initNum*galToL;
      case 'L':
        return initNum/galToL;
      case 'MI':
        return initNum*miToKm;
      case 'LBS':
        return initNum*lbsToKg;
      case 'KG':
        return initNum/lbsToKg;
      case 'KM':
        return initNum/miToKm;
      default:
        return 'invalid unit';
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum+" "+this.spellOutUnit(initUnit)+" converts to "+returnNum.toFixed(5)+" "+this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
