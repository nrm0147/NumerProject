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

export default class Simpson1 extends Component{
    state= {
        output : [],
        equation : "",
        n : "",
        a : "",
        b : ""
    }
    input = (x) => {
        this.setState({[x.target.name]: x.target.value})
    }
    cal(){
        var n = parseFloat(this.state.n);
        var a = parseFloat(this.state.a);
        var b = parseFloat(this.state.b);
        var error;
        let scopea = {x: a};
        let scopeb = {x: b};
        var eq = this.state.equation;
        var fx = compile(eq);
        var result=[];
        var h = (b-a)/n;
        var temp= 0;
        var i;
        for(i=0;i<n;i++){
            let scope = {x:a+(i*h)};
            if(i===0 || i===n-1){
                temp += fx.eval(scope);
            }
            else if(i%2 === 1){
                temp += 4*fx.eval(scope);
            }
            else if(i%2 === 0){
                temp += 2*fx.eval(scope);
            }
            
        }
        temp *= h/3;
        var real = compile(Algebrite.intergral(Algebrite.eval(eq)).toString());
        var outreal = real.eval(scopeb) - real.eval(scopea);
        error = abs((outreal-temp)/outreal)*100;
        result.push({
            'Result': temp,
            'Error' : error    
        });
        this.setState({output:result});
    }
    
    render() {
        console.log("Hello");
     return  (
        <div classname = 'main'>
            <div classname = 'input'>
            <h1>SIMPSON's RULE 1/3 METHOD</h1>
                <Input name ="equation" onchange={this.input.bind(this)} placeholder ='Equation' />
                <Input name ="n" onchange={this.input.bind(this)} placeholder ='n' />
                <Input name ="a" onchange={this.input.bind(this)} placeholder ='a' />
                <Input name ="b" onchange={this.input.bind(this)} placeholder ='b' />
                <Button type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>

            </div>
            {<Table style={{width:"800px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
        </div>
      );
    }
}