import React, { Component } from 'react'
import {Button, Table} from 'antd';
import axios from 'axios';

const header = [{
    title: 'Result',
    dataIndex: 'Result',
  },{
    title: 'Real',
    dataIndex: 'Real',
},{
    title: 'Error',
    dataIndex: 'Error',
}]
export default class Bw0h extends Component{
    state= {
        output : [],
        equation : "",
        n : "",
        x : "",
        h : ""
    }
    input = (x) => {
        this.setState({[x.target.name]: x.target.value})
    }
    cal=() =>{
        axios
        .post("http://localhost:8000/bwohapi/bwohapi", {
             x : parseFloat(this.state.x),
             h : parseFloat(this.state.h),
             n : parseInt(this.state.n),
            equation: this.state.equation
        }).then(res => {
          this.setState({result:res.data.result})
          console.log(this.state.result)
        })
        .catch(err => {
          console.log(err);
        });

    }
    render() {
        return (
            <div className='main'>
                <div className='input'>
                <h1>Foword Oh METHOD</h1>
                    <h3>Input Equation : <input type = "text" name="equation" onChange={this.input.bind(this)}/></h3>
                    <h3>Input X : <input type = "text" name="x" onChange={this.input.bind(this)}/></h3>
                    <h3>Input h : <input type = "text" name="h" onChange={this.input.bind(this)}/></h3>
                    <h3>Input n : <input type = "text" name="n" onChange={this.input.bind(this)}/></h3>
                    <Button type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"800px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }

}