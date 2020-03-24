import React, { Component } from 'react';
import { compile, abs,} from 'mathjs';
import {Button, Table,} from 'antd';
import Algebrite from 'algebrite';

const header = [{
    title: 'Result',
    dataIndex: 'Result',
  }, {
    title: 'Real',
    dataIndex: 'Real',
    },{
        title: 'Error',
        dataIndex: 'Error',
    }]
export default class Gaussquadrature extends Component{
    state = {
        output : [],
        equation : [],
        point : "",
        a : "",
        b : ""
    }

    OnConfirm(){
        this.setState({output:[],});
        this.cal();
    }
    cal(){
        var point = parseFloat(this.state.point);
        var a = parseFloat(this.state.a);
        var b = parseFloat(this.state.b);
        var error = parseFloat(0.000000);
        var eq = this.state.equation;
        var fx = compile(eq);
        var x2 = 0;
        var x1 = 0;
        var x3 = 0;
        let scope1 = {x: a}
        let scope2 = {x: b}
        var result = [];
            if(point === 2){
                x1  = ((a+b)/2)+(((b-a)/2)*((-1)*0.57735026))
                x2  = ((a+b)/2)+(((b-a)/2)*(0.57735026))
                let scopea = {x: x1}
                let scopeb = {x: x2}
                var temp = ((b-a)/2)*(fx.evaluate(scopea)+(fx.evaluate(scopeb)));
                console.log(temp)
             }
            if(point === 3){
                x1 = ((a+b)/2)+(((b-a)/2)*((-1)*0.77459666));
                x2  = (a+b)/2
                x3  = ((a+b)/2)+(((b-a)/2)*(0.77459666));
                let scopea = {x: x1}
                let scopeb = {x: x2}
                let scopec = {x: x3}
                var temp = ((b-a)/2)*((5/9 *fx.evaluate(scopea))+(8/9 *fx.evaluate(scopeb))+(5/9 *fx.evaluate(scopec)));
            
        }
        var real = compile(Algebrite.integral(Algebrite.eval(eq)).toString());
        var outreal = real.eval(scope2)-real.eval(scope1);
        error = abs((outreal-temp)/outreal)*100;
        result.push({
            'Result' : temp,
            'Real' : outreal,
            'Error' : error

        });
        this.setState({output:result});
    }
    onChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        return(
        <div>
          <h1>GaussQuadrature METHOD</h1>
          <h3>Input Equation : <input type="text" name='equation' onChange={this.onChange.bind(this) }/></h3>
          <h3>Point : <input type="text" name='point' onChange={this.onChange.bind(this)}/></h3>
          <h3>Input a : <input type="text" name='a' onChange={this.onChange.bind(this)}/></h3>
          <h3>Input b : <input type="text" name='b' onChange={this.onChange.bind(this)}/></h3>
          <Button type="primary" onClick = {this.OnConfirm.bind(this)} shape="round">Submit</Button><br/><br/>
          <Table dataSource={this.state.output} columns={header} pagination={false}/>
        </div>
      );
    }


}