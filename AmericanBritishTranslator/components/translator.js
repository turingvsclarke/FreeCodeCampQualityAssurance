const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    toCamelCase(text){
        // If it starts with the span, capitalize whatever comes after
        if(text.substring(0,24)=='<span class="highlight">'){
            return text.substring(0,24)+text[24].toUpperCase()+text.substring(25);
        }else{
            return text[0].toUpperCase()+text.substring(1);
        }
        
    }

    translateTime(text,locale){
        var translation=text;
        if(locale=='british-to-american'){
            let regex=/\d+\.\d\d/;
            if(regex.test(translation)){
                translation.match(regex).forEach(match=>{
                translation=translation.replace(match,'<span class="highlight">'+match.replace('.',':')+'</span>')
            });
            }
        }else{
            let regex=/\d+\:\d\d/;
            if(regex.test(translation)){
                translation.match(regex).forEach(match=>{
                translation=translation.replace(match,'<span class="highlight">'+match.replace(':','.')+'</span>');
            });
            }
        }
        return translation;
    }

    translateTitles(text,locale){
        // Replace with capital letters. Regex should require spaces or start of sentence behind, space in front
        if(locale=='british-to-american'){
            Object.keys(americanToBritishTitles).forEach(key=>{
                // Require spaces in the lookahead
                let regex1=new RegExp(`(^${americanToBritishTitles[key]}(?=\\s))|((?<=\\s)${americanToBritishTitles[key]}(?=\\s))`,'i');
                text=text.replace(regex1,'<span class="highlight">'+this.toCamelCase(key)+'</span>');
            })
        }else{
            Object.keys(americanToBritishTitles).forEach(key=>{
                // Require spaces in the lookahead
                let regex1=new RegExp(`(^${key}(?=\\s))|((?<=\\s)${key}(?=\\s))`,'i');
                text=text.replace(regex1,'<span class="highlight">'+this.toCamelCase(americanToBritishTitles[key])+'</span>');
            })
        }
        return text;

    } 

    translate(text,locale){
        let translation=this.translateTime(text,locale);
        translation=this.translateTitles(translation,locale);

        // Using regex. Searching through each dictionary and getting the result we need hopefully
        if(locale=='british-to-american'){
            // Look through all the objects for matches and assign accordingly
                Object.keys(americanToBritishSpelling).forEach(key=>{
                    let regex1=new RegExp(`(^${americanToBritishSpelling[key]}(?=\\W+))|((?<=\\s)${americanToBritishSpelling[key]}(?=\\W+))`,'i');
                    translation=translation.replace(regex1,'<span class="highlight">'+key+'</span>');

                })
                Object.keys(britishOnly).forEach(key=>{
                    let regex1=new RegExp(`(^${key}(?=\\W+))|((?<=\\s)${key}(?=\\W+))`,'i')
                    translation=translation.replace(regex1,'<span class="highlight">'+britishOnly[key]+'</span>');
            });
        }
        else if(locale=='american-to-british'){
            // Look through all the objects for matches and assign accordingly
            [americanToBritishSpelling,americanOnly].forEach(dict=>{
                // British is the value in these dicts, so if key is word, give it key
                Object.keys(dict).forEach(key=>{
                    let regex1=new RegExp(`^(${key}(?=\\W+))|((?<=\\s)${key}(?=\\W+))`,'i');
                    translation=translation.replace(regex1,'<span class="highlight">'+dict[key]+'</span>');
                });
            });
            
        } // End american to british translation

        return this.toCamelCase(translation);
    }
}

module.exports = Translator;