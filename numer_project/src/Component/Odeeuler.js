import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import { compile, abs } from 'mathjs'
const header = [{
    title: 'Iteration',
    dataIndex: 'iteration'
}, {
    title: 'X',
    dataIndex: 'xi'
}, {
    title: 'Y',
    dataIndex: 'y'
}, {
    title: 'y(x)',
    dataIndex: 'output',
}, {
    title: 'Error',
    dataIndex: 'Error',
}]
export default class Odeeuler extends Component {
    state = {
        result:[],
        equation1: "",
        equation2: "",
        x1:"",
        x2:"",
        y:"",
        h:"",
    }
    input = (x) => {
        this.setState({ [x.target.name]: x.target.value })
    }
    cal = () => {
        var x1 = parseFloat(this.state.x1);
        var x2 = parseFloat(this.state.x2);
        var y = parseFloat(this.state.y);
        var h = parseFloat(this.state.h);
        var error = parseFloat(0.000000);
        const equation1 = compile(this.state.equation1);
        const equation2 = compile(this.state.equation2);
        var result1 = [];
        var i = 0;
            do {
                let xy = { 
                    x: x1 ,
                    y: y,
                };
               var yn = y+equation1.evaluate(xy)*h;
               
               let scope ={
                   x: x1,
               }
               var yeq= equation2.evaluate(scope);
                error = abs((yeq - yn) / yeq)*100;
                result1.push({
                    'iteration': i,
                    'xi': x1,
                    'y': y,
                    'output':yeq ,
                    'Error': error,
                });
                y=yn
                x1++
                i++;
            } while (i<x2);
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='main'>
                <div className='input'>
                    <h3>Equation dy/dx : <input name="equation1" onChange={this.input.bind(this)} /></h3>
                    <h3>Equation y(x) : <input name="equation2" onChange={this.input.bind(this)}/></h3>
                    <h3>Input X1 : <input name="x1" onChange={this.input.bind(this)} /></h3>
                    <h3>Input X2 : <input name="x2" onChange={this.input.bind(this)} /></h3>
                    <h3>Input Y : <input name="y" onChange={this.input.bind(this)} /></h3>
                    <h3>Input h : <input name="h" onChange={this.input.bind(this)} /></h3>
                    <Button type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"800px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}