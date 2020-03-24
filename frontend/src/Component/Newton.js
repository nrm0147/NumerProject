import React, { Component } from 'react'
import {Button, Table} from 'antd';
import axios from 'axios';

const header = [{
    title: 'Iteration',
    dataIndex: 'Iteration',
  }, {
    title: 'Xi',
    dataIndex: 'Xi',
  }, {
    title: 'Xi+1',
    dataIndex: 'Xi+1',
  }, {
    title: 'Error',
    dataIndex: 'Error',
  }]

  export default class Newton extends Component {
      state = {
        output: 0,
        equation: "",
        X: 0,
        result: []
      }
      input = (x) => {
        this.setState({[x.target.name]: x.target.value})
      }
      cal=() =>{
          axios
        .post("http://localhost:8000/newapi/newapi", {
          x :parseFloat(this.state.X),
         equation: this.state.equation
        },console.log('Hi i am NEWTON API'))
        .then(res => {
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
                <h1>NEWTON-RAPSHON METHOD</h1>
                    <h3>Input Equation : <input type = "text" name="equation" onChange={this.input.bind(this)}/></h3>
                    <h3>Input X : <input type = "text" name="X" onChange={this.input.bind(this)}/></h3>
                    <Button type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"800px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
      
}