function ConvertHandler() {
  
  this.getNum = function(input) {
    // Return the first part of the input string
    return input.match(/^(\d*|\d+\.\d*/)[0];
  };
  
  this.getUnit = function(input) {
    // Return the second part
    return input.substring(this.getNum(input));
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit.toUpperCase()){
      case 'GAL': 
        return 'L';
      case 'L':
        return 'GAL';
      case 'MI':
        return 'KM';
      case 'LBS':
        return 'KG';
      case 'KG':
        return 'LBS';
      case 'KM':
        return 'MI';
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
    switch(unit.toUpperCase()){
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
    return initNum+" "+initUnit+" converts to "+returnNum+" "+returnUnit;
  };
  
}

module.exports = ConvertHandler;
