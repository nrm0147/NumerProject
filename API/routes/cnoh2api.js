const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.get('/fwohapi', (req, res) => {
    res.send('testget');
});

router.post('/cnohapi',(req,res) => {
    var x = parseFloat(req.body.x);
    var h = parseFloat(req.body.h);
    var n = parseInt(req.body.n);
    console.log(x);
    var eq = req.body.equation;
    const fx = compile(eq);
        var result1 = [];
        var x = 0;
        var xi2m = 0;
        var xim = 0;
        var xip = 0;
        var xi2p = 0;
        var fxi =0;
        var i =0;
        xip = x+h;
        xi2p = x+(2*h);
        xim = x-h;
        xi2m = x-(2*h);
        let scopexip = {x: xip}
        let scopex = {x: x}
        let scopexi2p = {x: xi2p}
        let scopexim = {x: xim}
        let scopexi2m = {x: xi2m}
        console.log(n);
        if(n === 1){
            fxi = (fx.evaluate(scopexip)-fx.evaluate(scopexim))*2*h
            console.log('HI')
        }
        if(n === 2){
            console.log('Hello')
            fxi = (fx.evaluate(scopexip)-(2*(fx.evaluate(scopex)))+fx.evaluate(scopexim))*pow(h,2)
        }
        if(n === 3){
            fxi = (fx.evaluate(scopexi2p)-(fx.evaluate(scopexip))+(3*(fx.evaluate(scopexim)))-fx.evaluate(scopexi2m))*2*(pow(h,2))
        }
        if(n === 4 ){
            fxi = (fx.evaluate(scopexi2p)-(4*(fx.evaluate(scopexip)))+(6*(fx.evaluate(scopex)))-(4*(fx.evaluate(scopexim)))-fx.evaluate(scopexi2m))*pow(h,4)           
        }
        var dif = eq
        for(i=0;i<n;i++){   
            var dif = derivative(dif, 'x')
        }
        
        let scope = {
            x:x
        }
        console.log("this is dif",dif)
        var real = dif.evaluate(scope)
        error = abs((real - fxi)/real)*100;
        console.log(error)
        result1.push({
            'Result' : fxi,
            'Error' : error,
            'Real' : real

        });
        res.json({
            result: result1
        })

});

module.exports = router;