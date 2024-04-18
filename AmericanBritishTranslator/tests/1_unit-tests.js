const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator=new Translator();

suite('Unit Tests', () => {
    // Test 1
    test('#mangoes',function(){
        const text='Mangoes are my favorite fruit.';
        const locale='american-to-british';
        const translation='Mangoes are my <span class="highlight">favourite</span> fruit.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })
    
    // Test 2
    test('#yogurt',function(){
        const text='I ate yogurt for breakfast.';
        const locale='american-to-british';
        const translation='I ate <span class="highlight">yoghurt</span> for breakfast.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })
    
    // Test 3
    test('#condo',function(){
        const text='We had a party at my friend\'s condo.';
        const locale='american-to-british';
        const translation='We had a party at my friend\'s <span class="highlight">flat</span>.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })
    
    // Test 4
    test('#trashcan',function(){
        const text='Can you toss this in the trashcan for me?';
        const locale='american-to-british';
        const translation='Can you toss this in the <span class="highlight">bin</span> for me?';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 5
    test('#parkingLot',function(){
        const text='The parking lot was full.';
        const locale='american-to-british';
        const translation='The <span class="highlight">car park</span> was full.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 6
    test('#rubeGoldberg',function(){
        const text='Like a high tech Rube Goldberg machine.';
        const locale='american-to-british';
        const translation='Like a high tech <span class="highlight">Heath Robinson device</span>.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 7
    test('#hooky',function(){
        const text='To play hooky means to skip class or work.';
        const locale='american-to-british';
        const translation='To <span class="highlight">bunk off</span> means to skip class or work.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 8
    test('#Bond',function(){
        const text='No Mr. Bond, I expect you to die.';
        const locale='american-to-british';
        const translation='No <span class="highlight">Mr</span> Bond, I expect you to die.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 9
    test('#grosh',function(){
        const text='Dr. Grosh will see you now.';
        const locale='american-to-british';
        const translation='<span class="highlight">Dr</span> Grosh will see you now.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 10
    test('#lunch',function(){
        const text='Lunch is at 12:15 today.';
        const locale='american-to-british';
        const translation='Lunch is at <span class="highlight">12.15</span> today.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 11
    test('#footie',function(){
        const text='We watched the footie match for a while.';
        const locale='british-to-american';
        const translation='We watched the <span class="highlight">soccer</span> match for a while.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 12
    test('#paracetamol',function(){
        const text='Paracetamol takes up to an hour to work.';
        const locale='british-to-american';
        const translation='<span class="highlight">Tylenol</span> takes up to an hour to work.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 13
    test('#caramelise',function(){
        const text='First, caramelise the onions.';
        const locale='british-to-american';
        const translation='First, <span class="highlight">caramelize</span> the onions.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 14
    test('#funfair',function(){
        const text='I spent the bank holiday at the funfair.';
        const locale='british-to-american';
        const translation='I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 15
    test('#chippy',function(){
        const text='I had a bicky then went to the chippy.';
        const locale='british-to-american';
        const translation='I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 16
    test('#bumBag',function(){
        const text="I've just got bits and bobs in my bum bag.";
        const locale='british-to-american';
        const translation='I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 17
    test('#carBoot',function(){
        const text='The car boot sale at Boxted Airfield was called off.';
        const locale='british-to-american';
        const translation='The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 18
    test('#mrsKalyani',function(){
        const text='Have you met Mrs Kalyani?';
        const locale='british-to-american';
        const translation='Have you met <span class="highlight">Mrs.</span> Kalyani?';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 19
    test('#profJoyner',function(){
        const text="Prof Joyner of King's College, London.";
        const locale='british-to-american';
        const translation="<span class=\"highlight\">Prof.</span> Joyner of King's College, London.";
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 20
    test('#teaTime',function(){
        const text='Tea time is usually around 4 or 4.30.';
        const locale='british-to-american';
        const translation='Tea time is usually around 4 or <span class="highlight">4:30</span>.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 21
    test('#mangoesHighlight',function(){
        const text='Mangoes are my favorite fruit.';
        const locale='american-to-british';
        const translation='Mangoes are my <span class="highlight">favourite</span> fruit.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 22
    test('#yogurtHighlight',function(){
        const text='I ate yogurt for breakfast.';
        const locale='american-to-british';
        const translation='I ate <span class="highlight">yoghurt</span> for breakfast.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 23
    test('#footieHighlight',function(){
        const text='We watched the footie match for a while.';
        const locale='british-to-american';
        const translation='We watched the <span class="highlight">soccer</span> match for a while.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })

    // Test 24
    test('#paracetamolHighlight',function(){
        const text='Paracetamol takes up to an hour to work.';
        const locale='british-to-american';
        const translation='<span class="highlight">Tylenol</span> takes up to an hour to work.';
        assert.equal(translator.translate(text,locale),translation,'Translation done');
    })


});
