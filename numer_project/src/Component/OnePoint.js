import React, { Component } from 'react'
import axios from 'axios';
import {Input, Button, Table} from 'antd';


const header = [{
  title : 'Iteration',
  dataIndex: 'iteration',
  }, {
    title: 'X',
    dataIndex: 'x',
  }, {
    title: 'Error',
    dataIndex: 'Error',
}]


export default class OnePoint extends Component{
    state = {
      output: 0,
      equation: "",
      X: "",
      result: [],
      condition: ""
    };

    input = (x) => {
      this.setState({[x.target.name]: x.target.value})
    }
    cal = () => {
      axios
        .post("http://localhost:8000/oneapi/oneapi", {
         x :parseFloat(this.state.X),
         equation: this.state.equation
      })
      .then(res => {
        this.setState({result:res.data.result})
          console.log(this.state.result)
      })
      .catch(err => {
        console.log(err);
      });
    } 
      
      render(){
        return (
        <div className='main'>
            <div className='input'>
            <h1>OnePoint ITERATION METHOD</h1>
            <h3>Input Equation : <input type = "text" name="equation" onChange={this.input.bind(this)}/></h3>
                    <h3>Input X : <input type = "text" name="X" onChange={this.input.bind(this)}/></h3>
                <Button type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>
            </div>
           {<Table style={{width:"800px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
        </div>
    );
  }
}
