const chai = require("chai").assert;
const { expect } = require("chai");
const chai = require("chai");
const index = require("../tipout");


describe('TipOut', function(){
    
    it('Credit Card Refund Rate Should be 2.5%', function(){
        let result = CC_Refund();
        assert.equal(result, '.025');
    });

    it('Credit Card Refund Rate is a Number', function(){
        let result = CC_Refund();
        assert.typeOf(result, 'number');
    });

    it('Total Sales is a Number', function(){
        let result = TS();
        assert.typeOf(result, 'number');
    });

    it('Waiter Total Sales is a Number', function(){
        let result = TS_Waiter();
        assert.typeOf(result, 'number');
    });

    it('Total_Tips is a Number', function(){
        let result = Total_Tips();
        assert.typeOf(result, 'number');
    });

    it('Total Cash Owed is a Number', function(){
        let result = TCO();
        assert.typeOf(result, 'number');
    });

    it('Bar Total Cash Owed is a Number', function(){
        let result = TCO_Bar();
        assert.typeOf(result, 'number');
    });

    it('Cash Auto Gratuity is a Number', function(){
        let result = Cash_Auto_Grat();
        assert.typeOf(result, 'number');
    });

    it('Actual Cash Owed is a Number', function(){
        let result = ACO();
        assert.typeOf(result, 'number');
    });

    it('Collect Money is a String', function(){
        let result = Collect_Money();
        assert.typeOf(result, 'string');
    });

    it('Collected Money is a Number', function(){
        let result = Collected_Money();
        assert.typeOf(result, 'number');
    });

    it('Tip Out Rate is a Number', function(){
        let result = TO_Rate();
        assert.typeOf(result, 'number');
    });

    it('Tip Out Rate is either 1%, 2%, 3%, 4%', function(){
        let result = TO_Rate();
        expect([.01,.02,.03,.04]).to.include(result);
    });

    it('Waiter Tip Out is a Number', function(){
        let result = TO_Waiter();
        assert.typeOf(result, 'number');
    });
    
    it('Bar Tip Out is a Number', function(){
        let result = TO_Bar();
        assert.typeOf(result, 'number');
    });

    it('Collect Money String Should Be Yes/No', function(){
        let result = Collect_Money();
        expect(['Yes','No','Y','N']).to.include(result);
    });

    


})