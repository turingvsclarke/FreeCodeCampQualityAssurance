const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // Test 1
    // convert 10L, get request to /api/convert
    test('#convertValidInput',function(done){
        chai.request(server).keepOpen().get('/api/convert?input=10L').end(function(err,res){
            const output={initNum:10,initUnit:'L',returnNum:2.64172,returnUnit:'gal',string: '10 liters converts to 2.64172 gallons'};
            assert.deepEqual(res.body,output,'Result is correct');
            done();
        })
    });
    // Test 2
    // convert 32g, get request to /api/convert
    test('#invalidUnit',function(done){
        chai.request(server).keepOpen().get('/api/convert?input=32g').end(function(err,res){
            assert.equal(res.text,'invalid unit','Result is correct');
            done();
        })
    });

    // Test 3
    // convert 3/7.2/4kg(invalid number) get request to /api/convert
    test('#invalidNumber',function(done){
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kg').end(function(err,res){
            assert.equal(res.text,'invalid number','Result is correct');
            done();
        })
    });

    // Test 4
    // convert 3/7.2/4kilomegagram get request to /api/convert
    test('#invalidNumberAndUnit',function(done){
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end(function(err,res){
            assert.equal(res.text,'invalid number and unit','Result is correct');
            done();
        })
    });

    // Test 5
    // convert with no number such as kg, GET request to /api/convert
    test('#handleNoNumber',function(done){
        chai.request(server).keepOpen().get('/api/convert?input=kg').end(function(err,res){
            const output={initNum:1,initUnit:'kg',returnNum:2.20462,returnUnit:'lbs',string: '1 kilograms converts to 2.20462 pounds'};
            assert.deepEqual(res.body,output,'Result is correct');
            done();
        })
    });
});
