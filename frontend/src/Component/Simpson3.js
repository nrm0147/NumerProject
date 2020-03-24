import React, { Component } from 'react';
import {compile, abs} from 'mathjs';
import {Button, Table} from 'antd';
import Algebrite from 'algebrite';

const header = [{
    title: 'Result',
    dataIndex: 'Result',
  }, {
    title: 'Error',
    dataIndex: 'Error',
}];
export default class Simpson3 extends Component{
    state={
            output : [],
            equa : "",
            n : "",
            a : "",
            b : "",
        }; 
    
    onConfirm(){
        this.setState({output:[],});
        this.cal();
    }
    cal(){
        var n =parseFloat(this.state.n);
        var a = parseFloat(this.state.a);
        var b = parseFloat(this.state.b);
        var error;
        let scopea = {x:a};
        let scopeb = {x:b};
        var eq = this.state.equa;
        var fx = compile(eq);
        var result=[];
        var h = (b-a)/n;
        var temp=0;
        var i;
        for(i=0;i<n;i++){
            let scope = {x:a+(i*h)};
            if(i===0 || i===n-1){
                temp += fx.eval(scope);
            }
            else if(i%3 === 0){
                temp += 2*fx.eval(scope);
            }
            else{
                temp += 3*fx.eval(scope);
            }
        }
        temp *= (3*h)/8;
        var real = compile(Algebrite.integral(Algebrite.eval(eq)).toString());
        var outreal = real.eval(scopeb)-real.eval(scopea);
        error = abs((outreal-temp)/outreal)*100;
        console.log(outreal);
        result.push({
            'Result' : temp,
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
          <h1>SIMPSON's RULE 3/8 METHOD</h1>
          <h3>Input Equation : <input type="text" name='equa' onChange={this.onChange.bind(this) }/></h3>
          <h3>Input n : <input type="text" name='n' onChange={this.onChange.bind(this)}/></h3>
          <h3>Input a : <input type="text" name='a' onChange={this.onChange.bind(this)}/></h3>
          <h3>Input b : <input type="text" name='b' onChange={this.onChange.bind(this)}/></h3>
          <Button type="primary" onClick = {this.onConfirm.bind(this)} shape="round">Submit</Button><br/><br/>
          <Table dataSource={this.state.output} columns={header} pagination={false}/>
        </div>
      );
    }
}