'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // Test if 
      let text=req.body.text;
      let locale=req.body.locale;
      if(text==undefined||locale==undefined){
        res.json({error:'Required field(s) missing'});
      }else if(!['american-to-british','british-to-american'].includes(locale)){
        res.json({error:'Invalid value for locale field'});
      }else if(text==''){
        res.json({error:'No text to translate'});
      }else{
        let translation=translator.translate(text,locale);
        var result={};
        result.text=text;
        result.translation=(translation==text)?'Everything looks good to me!':translation;
        res.json(result);
      }
 
    });
};
