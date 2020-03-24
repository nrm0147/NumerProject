import React, { Component } from 'react';
import {Button} from 'antd';


export default class Home extends Component{
    render(){
        return(
        <div>
          <h1>PLEASE SELECT METHOD</h1>
          <br/>
          <Button type="primary" shape=""><a href="/Bisection">BISECTION</a ></Button> &nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/FalsePosition">FalsePositions</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/OnePoint">OnePoint</a></Button><br/><br/>
          <Button type="primary" shape=""><a href="/Secant">Secant</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Newton">Newton</a></Button><br/><br/>
          <Button type="primary" shape=""><a href="/Simpson1">Simpson</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Simpson3">Simpson3</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/TrapezoidalSingle">TrapezoidalSingle</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Trapezoidal">Trapezoidal</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Gaussquadrature">Gaussquadrature</a></Button><br/><br/>
          <Button type="primary" shape=""><a href="/Inverse">Inverse</a></Button><br/><br/>
          <Button type="primary" shape=""><a href="/Fwoh">Fwoh</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Bwoh">Bwoh</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Cnoh2">CentralOh(2)</a></Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape=""><a href="/Cnoh4">CentralOh(4)</a></Button>&nbsp;&nbsp;&nbsp;

          
          
          
        </div>
      );
    }
}
