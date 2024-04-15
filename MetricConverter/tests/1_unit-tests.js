const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // Test 1
    // Correctly read whole number input
    test('#handlesWholeNumbers',function(){
        assert.isNumber(convertHandler.getNum(Math.floor(Math.random() * 1000)),'whole number');

    });
    
    // Test 2 
    // Read decimal number input
    test('#handlesDecimals',function(){
        assert.isNumber(convertHandler.getNum(Math.random() * 1000),'decimal number');

    });

    // Test 3
    test('#handlesFractions',function(){
        assert.isNumber(convertHandler.getNum('10/2'),'number');
    });

    // Test 4
    test('#handlesDecimalFractions',function(){
        assert.isNumber(convertHandler.getNum('2.5/6'),'number');
    });

    // Test 5
    test('#doubleFractionError',function(){
        assert.throws(()=>convertHandler.getNum('2/5/6'),Error,'invalid number');
    });

    // Test 6
    test('#noInputTo1',function(){
        assert.equal(convertHandler.getNum(''),1,'1 returned');
    });

    // Test 7
    test('#readsInputs',function(){
        assert.exists(convertHandler.getUnit('kg'),'valid input');
        assert.exists(convertHandler.getUnit('mi'),'valid input');
        assert.exists(convertHandler.getUnit('gal'),'valid input');
        assert.exists(convertHandler.getUnit('km'),'valid input');
        assert.exists(convertHandler.getUnit('lbs'),'valid input');
        assert.exists(convertHandler.getUnit('l'),'valid input');
    });

    // Test 8
    test('#errorOnInvalidInput',function(){
        assert.throws(()=>convertHandler.getUnit('hi'),Error,'invalid unit');
    });

    // Test 9
    test('#validReturnUnit',function(){
        assert.equal(convertHandler.getReturnUnit('gal'),'L','correct unit');
        assert.equal(convertHandler.getReturnUnit('L'),'gal','correct unit');
        assert.equal(convertHandler.getReturnUnit('mi'),'km','correct unit');
        assert.equal(convertHandler.getReturnUnit('km'),'mi','correct unit');
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg','correct unit');
        assert.equal(convertHandler.getReturnUnit('kg'),'lbs','correct unit');
    });

    // Test 10
    test('#spelledOutUnit',function(){
        assert.equal(convertHandler.spellOutUnit('gal'),'gallons','correct unit');
        assert.equal(convertHandler.spellOutUnit('L'),'liters','correct unit');
        assert.equal(convertHandler.spellOutUnit('mi'),'miles','correct unit');
        assert.equal(convertHandler.spellOutUnit('km'),'kilometers','correct unit');
        assert.equal(convertHandler.spellOutUnit('lbs'),'pounds','correct unit');
        assert.equal(convertHandler.spellOutUnit('kg'),'kilograms','correct unit');
    });

    // Test 11
    test('#gal2LConversion',function(){
        assert.equal(convertHandler.convert(1,'gal'),3.78541,'valid conversion');
    });

    // Test 12
    test('#L2galConversion',function(){
        assert.equal(convertHandler.convert(1,'l'),Number((1/3.78541).toFixed(5)),'valid conversion');
    });

    // Test 13
    test('#mi2kmConversion',function(){
        assert.equal(convertHandler.convert(1,'mi'),1.60934,'valid conversion');
    });

    // Test 14
    test('#km2miConversion',function(){
        assert.equal(convertHandler.convert(1,'km'),Number((1/1.60934).toFixed(5)),'valid conversion');
    });

    // Test 15
    test('#lbs2kgConversion',function(){
        assert.equal(convertHandler.convert(1,'lbs'),0.453592.toFixed(5),'valid conversion');
    });

    // Test 16
    test('#kg2lbsConversion',function(){
        assert.equal(convertHandler.convert(1,'kg'),Number((1/0.453592).toFixed(5)),'valid conversion');
    });


});