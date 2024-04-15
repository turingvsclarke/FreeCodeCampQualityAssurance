function ConvertHandler() {
  
  this.getNum = function(input) {
    // Return the first part of the input string
    let inputNum=String(input).match(/^\d*.*\d/);
    if(inputNum==null){
      return 1;
    }else{
      // Test for fractions 
      let num=inputNum[0];
      if(num.indexOf('/')>0){
        num=num.substring(0,num.indexOf('/'))/num.substring(num.indexOf('/')+1);
      }
      if((num*1)||num==0){
        return Number(Number(num).toFixed(5));
      }
      throw new Error('invalid number');
  }
  };
  
  this.getUnit = function(input) {
    // Return the second part
   let inputUnit=input.match(/[a-zA-Z]*$/)[0];
   this.getReturnUnit(inputUnit);
   return inputUnit.toUpperCase()=='L'?'L':inputUnit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    var returnUnit;
    switch(initUnit.toUpperCase()){
      case 'GAL': 
      returnUnit= 'L';
      break;
      case 'L':
        returnUnit= 'gal';
        break;
      case 'MI':
        returnUnit= 'km';
        break;
      case 'LBS':
        returnUnit= 'kg';
        break;
      case 'KG':
        returnUnit= 'lbs';
        break;
      case 'KM':
        returnUnit= 'mi';
        break;
      default:
        throw new Error('invalid unit');
    }
    return returnUnit;
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
        return new Error('invalid unit');
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
    var output;
    switch(initUnit.toUpperCase()){
      case 'GAL': 
        output=initNum*galToL;
        break;
      case 'L':
        output=initNum/galToL;
        break;
      case 'MI':
        output=initNum*miToKm;
        break;
      case 'LBS':
        output=initNum*lbsToKg;
        break;
      case 'KG':
        output=initNum/lbsToKg;
        break;
      case 'KM':
        output=initNum/miToKm;
        break;
      default:
        return 'invalid unit';
    }
    return Number(output.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum+" "+this.spellOutUnit(initUnit)+" converts to "+returnNum+" "+this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
