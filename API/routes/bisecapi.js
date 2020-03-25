const express = require('express');
const router = express.Router();
const math = require('mathjs');



router.get('/bisecapi', (req, res) => {
    res.send('testget');
});

router.post('/bisecapi', (req, res) => {
    console.log('testbisec')
    var xl = parseFloat(req.body.xl);
    var xr = parseFloat(req.body.xr);
    var xo = xr;
    var error = parseFloat(0.000000);
    const eq = math.compile(req.body.equation);
    let scopel = {
        x: xl
    };
    let scoper = {
        x: xr
    };
    var result1 = [];
    var i = 1;
    if (eq.eval(scopel) * eq.eval(scoper) < 0) {
        do {
            var xm = (xl + xr) / 2;
            let scopem = {
                x: xm
            }

            if (eq.eval(scopel) * eq.eval(scopem) < 0) {
                xr = xm;
            } else {
                xl = xm;
            }
            error = math.abs((xm - xo) / xm) * 100;
            xo = xm;
            result1.push({
                'iteration': i,
                'xl': xl,
                'xr': xr,
                'xm': xm,
                'Error': error,
            });
            i++;
            console.log(error)
        } while (error > 0.000001);
    }
    res.json({
        result: result1
    })

});



module.exports = router;