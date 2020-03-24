import React, { Component } from 'react';
import { compile, abs,} from 'mathjs';
import {Button, Table, Input} from 'antd';
import Algebrite from 'algebrite';
const header = [{
    title: 'Result',
    dataIndex: 'Result',
  }, {
    title: 'Error',
    dataIndex: 'Error',
}]
export default class Trapezoidal extends Component{
    state= {
        output : [],
        equation : "",
        a : 0,
        b : 0
    }

    onConfirm(){
        this.setState({output:[],});
        this.cal();
    }
    cal(){
        var a = parseFloat(this.state.a);
        var b = parseFloat(this.state.b);
        var error;
        let scopea = {x: a};
        let scopeb = {x: b};
        var fx = compile(this.state.equation);
        var result=[];
        var h = (b-a)/2;
        console.log(this.state.equation)
        var temp= 0;
        var i;
        temp = fx.evaluate(scopea)+fx.evaluate(scopeb)
        temp *= h;
        console.log(this.state.a,this.state.b,this.state.equation,h,fx.evaluate(scopea),fx.evaluate(scopeb),temp)
        var real = compile(Algebrite.integral(Algebrite.eval(this.state.equation)).toString());
        var outreal = real.eval(scopeb)-real.eval(scopea);
        error = abs((outreal-temp)/outreal)*100;
        console.log(outreal);
        result.push({
            'Result' : temp,
            'Error' : error
        });
        this.setState({output:result});
    }
    ip = (event)=>{
         this.setState({[event.target.name]:event.target.value})
    }
    render(){
        return(
        <div>
          <h1>TRAPEZOIDEL METHOD</h1>
          <h3>Input Equation : <input type="text" name='equation' onChange={this.ip.bind(this)}/></h3>
          <h3>Input a : <input type="text" name='a' onChange={this.ip.bind(this)}/></h3>
          <h3>Input b : <input type="text" name='b' onChange={this.ip.bind(this)}/></h3>
          <Button type="primary" onClick = {this.onConfirm.bind(this)} shape="round">Submit</Button><br/><br/>
          <Table dataSource={this.state.output} columns={header} pagination={false}/>
        </div>
      );
    }
}