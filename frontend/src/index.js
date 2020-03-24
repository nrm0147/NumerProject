import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import './index.css';
import Home from './Home';
import Bisection from './Component/Bisection';
import FalsePosition from './Component/FalsePosition';
import OnePoint from './Component/OnePoint';
import Secant from './Component/Secant';
import Newton from './Component/Newton';
import Simpson1 from './Component/Simpson1';
import Simpson3 from './Component/Simpson3';
import Trapezoidal from './Component/Trapezoidal';
import TrapezoidalSingle from './Component/TrapezoidalSingle';
import Inverse from './Component/Inverse';
import Odeeuler from './Component/Odeeuler';
import Gaussquadrature from './Component/Gaussquadrature';
import Fwoh from './Component/Fwoh';
import Bwoh from './Component/Bwoh';
import Cnoh2 from './Component/Cnoh2';
import Cnoh4 from './Component/Cnoh4';


import 'antd/dist/antd.css';


ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/Bisection" component={Bisection} />
        <Route exact path="/FalsePosition" component={FalsePosition} />
        <Route exact path="/OnePoint" component={OnePoint} />
        <Route exact path="/Secant" component={Secant} />
        <Route exact path="/Newton" component={Newton}/>
        <Route exact path="/Simpson1" component={Simpson1}/>
        <Route exact path="/Simpson3" component={Simpson3}/>
        <Route exact path="/Trapezoidal" component={Trapezoidal}/>
        <Route exact path="/TrapezoidalSingle" component={TrapezoidalSingle}/>
        <Route exact path="/Inverse" component={Inverse}/>
        <Route exact path="/Odeeuler" component={Odeeuler} />
        <Route exact path="/Gaussquadrature" component={Gaussquadrature} />
        <Route exact path="/Fwoh" component={Fwoh} />
        <Route exact path="/Bwoh" component={Bwoh} />
        <Route exact path="/Cnoh2" component={Cnoh2} />
        <Route exact path="/Cnoh4" component={Cnoh4} />



        
    </BrowserRouter>,document.getElementById('root')
);


