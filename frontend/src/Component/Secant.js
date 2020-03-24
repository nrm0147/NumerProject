import React, { Component } from 'react';
import axios from 'axios';
import {Button, Table} from 'antd';

const header = [{
    title: 'Iteration',
    dataIndex: 'Iteration',
  }, {
    title: 'Xi-1',
    dataIndex: 'Xi-1',
  }, {
    title: 'Xi',
    dataIndex: 'Xi',
  }, {
    title: 'Xi+1',
    dataIndex: 'Xi+1',
  }, {
    title: 'Error',
    dataIndex: 'Error',
}];
export default class Secant extends Component{
 
        state={
            output : [],
            equation : "",
            xiold : 0,
            xi : 0
        }; 
    onConfirm(){
        this.setState({output:[],});
        this.cal();
    }
    cal(){
      axios
      .post("http://localhost:3001/secantapi/seapi", {
       xiold :parseFloat(this.state.X0),
       xi :parseFloat(this.state.X1),
       equation: this.state.equation
      },console.log('callapi'))
      .then(res => {
        this.setState({result:res.data.result})
          console.log(this.state.result)
      })
      .catch(err => {
        console.log(err);
      });
    }
    onChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        return(
        <div>
          <h1>SECANT METHOD</h1>
          <h3>Input Equation : <input type="text" name='equation' onChange={this.onChange.bind(this) }/></h3>
          <h3>Input X0 : <input type="text" name='xiold' onChange={this.onChange.bind(this)}/></h3>
          <h3>Input X1 : <input type="text" name='xi' onChange={this.onChange.bind(this)}/></h3>
          <Button type="primary" onClick = {this.onConfirm.bind(this)} shape="round">Submit</Button><br/><br/>
          <Table dataSource={this.state.output} columns={header} pagination={false}/>
        </div>
      );
    }
}