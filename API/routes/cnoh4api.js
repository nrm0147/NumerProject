const express = require('express');
const router = express.Router();
const math = require('mathjs');

console.log('I passing in');

router.get('/cnoh4api', (req, res) => {
    res.send('testget');
});

router.post('/cnoh4api', (req, res) => {

    var x = parseFloat(req.body.x);
    var h = parseFloat(req.body.h);
    var n = parseInt(req.body.n);
    console.log(x);
    var eq = req.body.equation;
    var error = parseFloat(0.000000);
    const fx = math.compile(eq);
    var result1 = [];
        var x = 0;
        var xi2m = 0;
        var xim = 0;
        var xip = 0;
        var xi2p = 0;
        var xi3m = 0;
        var xi3p = 0;
        var fxi =0;
        var i =0;
        xip = x+h;
        xi2p = x+(2*h);
        xim = x-h;
        xi2m = x-(2*h);
        xi3m = x-(3*h);
        xi3p = x+(3*h)
        let scopexip = {x: xip}
        let scopex = {x: x}
        let scopexi2p = {x: xi2p}
        let scopexim = {x: xim}
        let scopexi2m = {x: xi2m}
        let scopexi3p = {x: xi3p}
        let scopexi3m = {x: xi3m}
        console.log(n);
        if(n === 1){
            fxi = ((fx.evaluate(scopexi2p)*-1)+8*(fx.evaluate(scopexim))-8*(fx.evaluate(scopexim)))*12*h
            console.log('HI')
        }
        if(n === 2){
            console.log('Hello')
            fxi = ((fx.evaluate(scopexi2p)*-1)+16*(fx.evaluate(scopexip))-30*(fx.evaluate(scopex))+16*(fx.evaluate(scopexim))-(fx.evaluate(scopexi2m)))*12*(pow(h,2))
        }
        if(n === 3){
            fxi = ((fx.evaluate(scopexi3p)*-1)+(8*(fx.evaluate(scopexi2p)))-(13*(fx.evaluate(scopexip)))+(13(fx.evaluate(scopexi2m)))-(8*(fx.evaluate(scopexi2m)))+fx.evaluate(scopexi3m))*8*(pow(h,2))
        }
        if(n === 4 ){
            fxi = ((fx.evaluate(scopexi3p)*-1)+(12*(fx.evaluate(scopexi2p)))-(39*(fx.evaluate(scopexip)))+(56*(fx.evaluate(scopex)))+(39(fx.evaluate(scopexi2m)))-(12*(fx.evaluate(scopexi2m)))+fx.evaluate(scopexi3m))*2*(pow(h,2))
        }
        var dif = eq
        for(i=0;i<n;i++){   
            var dif = math.derivative(dif, 'x')
        }
        
        let scope = {
            x:x
        }
        console.log("this is dif",dif)
        var real = dif.evaluate(scope)
        error = math.abs((real - fxi)/real)*100;
        console.log(error)
        result1.push({
            'Result' : fxi,
            'Error' : error,
            'Real' : real

        });
    res.json({
        result: result1
    });
});
module.exports = router;