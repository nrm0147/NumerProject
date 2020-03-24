const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.get('/oneapi', (req, res) => {
    res.send('testget');
});

router.post('/oneapi', (req, res) => {
    console.log('Hello world')
    var x = parseFloat(req.body.x);
    var error = parseFloat(0.000000);
    const eq = math.compile(req.body.equation);
    var result1 = [];
    var i = 1;
    //console.log("xi" xi);
    do {
        let scope = {
            x: x
        };
        var x1 = eq.evaluate(scope)
        error = math.abs((x1 - x) / x1) * 100
        x = x1;
        result1.push({
            'iteration': i,
            'x': x,
            'Error': error
        });
        i++;
    } while (error > 0.000001 && i < 50);

    res.json({
        result: result1
    })

});

module.exports = router;