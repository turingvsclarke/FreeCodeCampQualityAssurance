const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect=chai.expect;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  const expectedKeys=['issue_title','issue_text','created_by','assigned_to','status_text','created_on','updated_on','open','_id'];
  //  Test 1 Create an issue with every field
  test('#issueWithAllFields',function(done){
    // Create an object to pass
    let newObject={ 
        "issue_title": "bugs",
        "issue_text": "When we post data it has an error.",
        "created_on": "2017-01-08T06:35:14.240Z",
        "updated_on": "2017-01-08T06:35:14.240Z",
        "created_by": "Tom",
        "assigned_to": "Joe",
        "open": true,
        "status_text": "In QA"
      };
    
    chai.request(server).keepOpen().post(`/api/issues/project1`).send(newObject).end(
        
        (err,res)=>{

            assert.hasAllKeys(res.body,expectedKeys,'All keys present');
        });
    done();
  });

  // Test 2 Create an issue with only required fields entered 
  test('#issueWithRequiredFields',function(done){
    // Create an object to pass
    let newObject={ 
        "issue_title": "bugs",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe"
      };
    chai.request(server).keepOpen().post(`/api/issues/project1`).send(newObject).end(
        (err,res)=>{
          assert.hasAllKeys(res.body,expectedKeys,'All keys present');
        });
    done();
  });

  // Test 3 Create an issue with missing required fields
  test('#issueWithMissingRequiredFields',function(done){
    // Create an object to pass
    let newObject={ 
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
      };
    chai.request(server).keepOpen().post(`/api/issues/project1`).send(newObject).end(
        (err,res)=>{
            assert.deepEqual(res.body,{ error: 'required field(s) missing' },'Missing fields');
        });
    done();
  });

  // Test 4 View issues on a project
  test('#viewProjectIssues',function(done){
    // Create an object to pass
    chai.request(server).get(`/api/issues/project1`).end(
        (err,res)=>{
            assert.isArray(res.body,'Array returned');
            // We want each issue to have all the necessary keys
            for(let i=0;i<res.body.length;i++){
                // We want each element of the array to have all the necessary keys
                assert.hasAllKeys(res.body[i],expectedKeys,'All keys present');
            }
        });
    done();
  });

  // Test 5 View issues on a project with one filter
  test('#viewProjectIssuesWithFilter',function(done){
    // Create an object to pass
    chai.request(server).get(`/api/issues/project1?created_by=Joe`).end(
        (err,res)=>{
          assert.isArray(res.body,'Array returned');
            // We want each issue to have all the necessary keys
            for(let i=0;i<res.body.length;i++){
                // We want each element of the array to have all the necessary keys
                assert.equal(res.body[i].created_by,'Joe','Filtered correctly');
                assert.hasAllKeys(res.body[i],expectedKeys,'All keys present');
            }
        });
    done();
  });

  // Test 6 View issues on a project with many filters
  test('#viewProjectIssuesWithMultipleFilters',function(done){
    // Create an object to pass
    chai.request(server).get(`/api/issues/project1?issue_title=bugs&created_by=Tom`).end(
        (err,res)=>{
            expect(res.body).to.be.an('array');
            // We want each issue to have all the necessary keys
            for(let i=0;i<res.body.length;i++){
                // We want each element of the array to have all the necessary keys
                assert.equal(res.body[i].created_by,'Tom','Filtered correctly');
                assert.equal(res.body[i].issue_title,'bugs','Filtered correctly');
                assert.hasAllKeys(res.body[i],expectedKeys,'All keys present');
            }
        });
    done();
  });

  // Test 7 PUT Update one field on an issue
  test('#putOneField',function(done){
    // Create an object to pass
    let _id='1';
    chai.request(server).put(`/api/issues/project1`).send({_id:_id,assigned_to:'Peter'}).end(
        (err,res)=>{
            assert.deepEqual(res.body,{result: 'successfully updated', '_id': _id },'Put request made');
        });
    done();
  });

  // Test 8 PUT Update multiple fields on an issue
  test('#putManyFields',function(done){
    // Create an object to pass
    let _id='1';
    chai.request(server).put(`/api/issues/project1`).send({_id:_id,assigned_to:'Peter',open:false,status_text:'This issue is closed'}).end(
        (err,res)=>{
            assert.deepEqual(res.body,{result: 'successfully updated', '_id': _id },'Put request made');
        });
    done();
  });

  // Test 9 Send a put request without an id
  test('#putNoID',function(done){
    chai.request(server).put(`/api/issues/project1`).send({assigned_to:'Peter'}).end(
        (err,res)=>{
            assert.deepEqual(res.body,{ error: 'missing _id' },'Put request made');
        });
    done();
  });


  // Test 10 PUT Update no fields to update
  test('#putNoFields',function(done){
    let _id='1';
    chai.request(server).put(`/api/issues/project1`).send({_id:_id}).end(
        (err,res)=>{
            assert.deepEqual(res.body,{ error: 'no update field(s) sent', '_id': _id },'Put request made');
        });
    done();
  });

  // Test 11 PUT Update invalid ID
  test('#putInvalidID',function(done){
    // Create an invalid id
    let _id='hi';
    chai.request(server).put(`/api/issues/project1`).send({_id:_id,assigned_to:'Jerry',open:false}).end(
        (err,res)=>{
            assert.deepEqual(res.body,{ error: 'could not update', '_id': _id },'Put request made');
        });
    done();
  });

  // Test 12 Delete request
  test('#deleteRequest',function(done){
    // Create an object to pass

    chai.request(server).delete(`/api/issues/project1`).send({_id:'1'}).end(
        (err,res)=>{
            assert.deepEqual(res.body,{result:'successfully deleted','_id':'1'},'Delete request made');
        });
    done();
  });
  
  // Test 13 Delete with invalid id
  test('#deleteInvalidID',function(done){
    // Create an object to pass
    let _id='hi';
    chai.request(server).delete(`/api/issues/project1`).send({_id:_id}).end(
        (err,res)=>{
          assert.deepEqual(res.body,{ error: 'could not delete', '_id': _id },'Delete request made');
        });
    done();
  });
  
  // Test 14 Delete issue with missing id
  test('#viewProjectIssuesWithMultipleFilters',function(done){
    // Create an object to pass
    chai.request(server).delete(`/api/issues/project1`).end(
      (err,res)=>{
        assert.deepEqual(res.body,{ error: 'missing _id' },'Delete request made');
      });
    done();
  });

});
