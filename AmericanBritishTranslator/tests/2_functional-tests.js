const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator=new Translator();

suite('Functional Tests', () => {
    
    // Test 1 Translation with text and locale fields
    test('#',function(done){
        let payload={};
        payload.text='I\'d like to drive my car on the highway mr. Alvin';
        payload.locale='american-to-british';
        chai.request(server).keepOpen().post('/api/translate').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{text:payload.text,translation:translator.translate(payload.text)},'Translation done');
        });
        done();
    })

    // Test 2 Translation with text and invalid locale field
    test('#invalidLocale',function(done){
        let payload={};
        payload.text='sandwich';
        payload.locale='sandwich';
        chai.request(server).keepOpen().post('/api/translate').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Invalid value for locale field' },'Invalid locale given');
        });
        done();
    })

    // Test 3 Translation with missing text field
    test('#missingText',function(done){
        let payload={};
        payload.locale='british-to-american';
        chai.request(server).keepOpen().post('/api/translate').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Required field(s) missing' },'No text given');
        });
        done();
    })

    // Test 4 Translation with missing locale field
    test('#missingLocale',function(done){
        let payload={};
        payload.text='Sandwich';
        chai.request(server).keepOpen().post('/api/translate').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{ error: 'Required field(s) missing' },'No locale given');
        });
        done();
    })

    // Test 5 Translation with empty text
    test('#emptyText',function(done){
        let payload={};
        payload.text='';
        payload.locale='british-to-american';
        chai.request(server).keepOpen().post('/api/translate').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{error:'No text to translate'},'No text given');
        });
        done();
    })

    // Test 6 Translation with text that needs no translation
    test('#noTranslationNeeded',function(done){
        let payload={};
        payload.text='Sandwiches are my favorite';
        payload.locale='british-to-american';
        chai.request(server).keepOpen().post('/api/translate').send(payload).end((err,res)=>{
            assert.deepEqual(res.body,{text:payload.text,translation:'Everything looks good to me!'});
        });
        done();
    })

});
