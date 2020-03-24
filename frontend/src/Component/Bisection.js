import React, {
  Component
} from 'react'
import axios from 'axios';
import {
  Button,
  Table
} from 'antd';

const header = [{
  title: 'Iteration',
  dataIndex: 'iteration',
}, {
  title: 'Xl',
  dataIndex: 'xl',
}, {
  title: 'Xr',
  dataIndex: 'xr',
}, {
  title: 'Xm',
  dataIndex: 'xm',
}, {
  title: 'Error',
  dataIndex: 'Error',
}];;


export default class Bisection extends Component {
  state = {
    result: [],
    equation: "",
    Xr: 0,
    Xl: 0,
    output: 0,
    Xm: 0,
    condition: ""
  }
  input = (x) => {
    this.setState({
      [x.target.name]: x.target.value
    })
  }
  cal = () => {
    axios
      .post("http://localhost:8000/bisecapi/bisecapi", {
        xl: parseFloat(this.state.Xl),
        xr: parseFloat(this.state.Xr),
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
  render() {
    return (
        <div className='main'>
            <div className='input'>
            <h1>Bisection ITERATION METHOD</h1>
                <h3>Input Equation : <input type = "text"  name="equation" onChange={this.input.bind(this)}/></h3>
                <h3>Input Xr : <input type = "text" name="Xr" onChange={this.input.bind(this)}/></h3>
                <h3>Input Xl : <input type = "text" name="Xl" onChange={this.input.bind(this)}/></h3>
                <Button type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>
            </div>
           {<Table style={{width:"800px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
        </div>
    );
}
}
