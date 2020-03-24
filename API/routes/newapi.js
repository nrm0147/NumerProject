const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.get('/newapi', (req, res) => {
    res.send('testget');
});

router.post('/newapi', (req, res) => {
    console.log('HI I AM NEW')
    var x = parseFloat(req.body.x);
          var xinew;
          var error = parseFloat(0.000000)
          var eq = req.body.equation
          const fx = math.compile(eq);
          var fxi;
          var diffxi;
          var result1 = [];
          var i = 1;
          do{
              let scope = {x: x};
              fxi = fx.eval(scope);
              diffxi = math.derivative(eq,'x');
              xinew = x-(fxi/diffxi.eval(scope));
              error = math.abs((xinew - x)/xinew)*100;
              x = xinew;
              result1.push({
                  'Iteration' : i,
                  'Xi': x,
                  'Xi+1' : xinew,
                  'Error': error
              });
              i++;
          }while(error > 0.000001 && i<50);
          
    res.json({
        result:result1
    })

});



module.exports = router;