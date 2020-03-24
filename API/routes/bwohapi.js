const express = require('express');
const router = express.Router();
const math = require('mathjs');

console.log('I passing in');

router.get('/bwohapi', (req, res) => {
    res.send('testget');
});

router.post('/bwohapi', (req, res) => {

    var x = parseFloat(req.body.x);
    var h = parseFloat(req.body.h);
    var n = parseInt(req.body.n);
    console.log(x);
    var eq = req.body.equation;
    var error = parseFloat(0.000000);
    const fx = math.compile(eq);
    var result1 = [];
    var diffeq = 0;
    var diffeq2 = 0;
    var xi = 0;
    var xi2 = 0;
    var xi3 = 0;
    var xi4 = 0;
    var fxi = 0;
    var i = 0;
    xi = x-h;
    xi2 = x + (2 * h);
    xi3 = x + (3 * h);
    xi4 = x + (4 * h);
    let scopexi = {
        x: xi
    }
    let scopex = {
        x: x
    }
    let scopexi2 = {
        x: xi2
    }
    let scopexi3 = {
        x: xi3
    }
    let scopexi4 = {
        x: xi4
    }
    console.log(n);
    if(n === 1){
        fxi = (fx.evaluate(scopex)-fx.evaluate(scopexi))
        console.log('HI')
    }
    if(n === 2){
        console.log('Hello')
        fxi = (fx.evaluate(scopex)-(2*(fx.evaluate(scopexi)))+fx.evaluate(scopexi2))
    }
    if(n === 3){
        fxi = (fx.evaluate(scopex)-(3*(fx.evaluate(scopexi)))+(3*(fx.evaluate(scopexi2)))-fx.evaluate(scopexi3))
    }
    if(n === 4 ){
        fxi = (fx.evaluate(scopex)-(4*(fx.evaluate(scopexi)))+(6*(fx.evaluate(scopexi2)))-(4*(fx.evaluate(scopexi3)))-fx.evaluate(scopexi4))           
    }

    fxi = fxi / math.pow(h, n);
    var dif = eq
    for (i = 0; i < n; i++) {
       var dif = math.derivative(dif, 'x')
    }

    let scope = {
        x: x
    }
    console.log("this is dif", dif)
    var real = dif.evaluate(scope)
    error = math.abs((real - fxi) / real) * 100;
    console.log(error)
    result1.push({
        'Result': fxi,
        'Error': error,
        'Real': real

    });
    res.json({
        result: result1
    })

});
module.exports = router;