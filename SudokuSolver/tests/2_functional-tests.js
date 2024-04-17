const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    // Test 1 Solve a puzzle with valid puzzle string
    test('#validPuzzleSolution',function(done){
        let puzzleString='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        chai.request(server).keepOpen().post('/api/solve').send({puzzle:puzzleString}).end((err,res)=>{
            assert.isString(res.body.solution,'Valid puzzle result string');
        });
        done();
    });

    // Test 2 Solve puzzle with missing puzzle string
    test('#missingPuzzleString',function(done){
        chai.request(server).keepOpen().post('/api/solve').send({}).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Required field missing' },'Flagged missing puzzle string');
        });
        done();
    });

    // Test 3 Solve a puzzle with invalid characters
    test('#invalidCharacters',function(done){
        let puzzleString='1.5..2h84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        chai.request(server).keepOpen().post('/api/solve').send({puzzle:puzzleString}).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Invalid characters in puzzle' },'Flagged invalid characters');
        });
        done();
    });

    // Test 4 Solve a puzzle with incorrect length
    test('#invalidPuzzleLength',function(done){
        let puzzleString='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.98';
        chai.request(server).keepOpen().post('/api/solve').send({puzzle:puzzleString}).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Expected puzzle to be 81 characters long' }, 'Invalid puzzle length');
        });
        done();
    });

    // Test 5 Solve a puzzle that cannot be solved
    test('#unsolvablePuzzle',function(done){
        let puzzleString='1.55.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        chai.request(server).keepOpen().post('/api/solve').send({puzzle:puzzleString}).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Puzzle cannot be solved' }, 'Unsolvable puzzle');
        });
        done();
    });


    // Test 6 Check a puzzle with all fields
    test('#checkValidPlacement',function(done){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let coordinate='A9';
        let value=6;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ valid:true }, 'Valid placement in puzzle');
        });
        done();
    });

    // Test 7 Check a puzzle with single placement conflict
    test('#check1PlacementConflict',function(done){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let coordinate='C5';
        let value=1;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ valid:false,conflict:['column'] }, 'Valid placement in puzzle');
        });
        done();
    });

    // Test 8 Check a puzzle with multiple placement conflicts
    test('#checkManyPlacementConflicts',function(done){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let coordinate='A9';
        let value=9;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ valid:false,conflict:['row','column'] }, 'Valid placement in puzzle');
        });
        done();
    });

    // Test 9 Check a puzzle with all placement conflicts
    test('#checkAllPlacementConflicts',function(done){
        let puzzleString='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let coordinate='E5';
        let value=6;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ valid:false,conflict:['row','column','region'] }, 'Valid placement in puzzle');
        });
        done();
    });

    // Test 10 Check a puzzle with missing required fields
    test('#checkMissingFields',function(done){
        let puzzleString='1.5..2.84..63.12.5.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.98';
        chai.request(server).keepOpen().post('/api/check').send({puzzle:puzzleString}).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Required field(s) missing' }, 'Fields missing');
        });
        done();
    });

    // Test 11 Check a puzzle with invalid characters
    test('#checkInvalidCharacters',function(done){
        let puzzleString='1.5..2.84h..63.12.5.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.98';
        let coordinate='A3';
        let value=5;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Invalid characters in puzzle' }, 'Invalid characters');
        });
        done();
    });

    // Test 12 Check a puzzle with incorrect length
    test('#checkIncorrectLength',function(done){
        let puzzleString='1.5..2.8..63.12.5.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.98';
        let coordinate='A3';
        let value=5;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Expected puzzle to be 81 characters long' }, 'Invalid puzzle length');
        });
        done();
    });

    // Test 13 Check a puzzle with invalid coordinate
    test('#checkInvalidCoordinate',function(done){
        let puzzleString='1.5..2.84..63.12.5.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.98';
        let coordinate='J3';
        let value=5;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Invalid coordinate'}, 'Invalid puzzle length');
        });
        done();
    });

    // Test 14 Check a puzzle with invalid value 
    test('#checkInvalidValue',function(done){
        let puzzleString='1.5..2.84..63.12.5.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.98';
        let coordinate='A3';
        let value=15;
        let payload={puzzle:puzzleString,coordinate:coordinate,value:value};
        chai.request(server).keepOpen().post('/api/check').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Invalid value' }, 'Invalid puzzle length');
        });
        done();
    });
});

