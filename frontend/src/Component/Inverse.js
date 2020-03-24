import React, { Component } from 'react';
import * as math from 'mathjs';
import {Button, Table} from 'antd';

const header = [{
    title: 'Variable',
    dataIndex: 'Variable',
  }, {
    title: 'Value',
    dataIndex: 'Value',
}];
var arr = [];
export default class Inverse extends Component{
    
        state={
            output : [],
            n : "",
            arr : []
        }; 
    
    onConfirm(){
        this.setState({output:[],});
        this.cal();
    }
    cal(){
        var arr = this.state.arr;
        var n = parseInt(this.state.n);
        var ax = [];
        var b = [];
        var output = [];
        var i, j, k;
        for(i=0;i<n;i++){
            ax[i] = [];
        }
        var zz=0;
        var z=0;
        for(i=0;i<n;i++){
            for(j=0;j<n+1;j++){
                if(j==n){
                    b[z++] = arr[zz++];
                }
                else{
                    ax[i][j] = parseFloat(arr[zz++]);
                }
            }
        }
        console.log(ax);
        console.log(b);
        var out = math.inv(ax);
        out = math.multiply(b,out);
        console.log(out);
        for(i=0;i<n;i++){
            output.push({
                'Variable' : 'x'+(i),
                'Value' : out[i]
            })
        }
        this.setState({output:output});
    }
    set(event){
        var index = event.target.name;
        var i = parseInt(index);
        arr[i] = parseFloat(event.target.value);
        this.setState({arr:arr});
    }
    onChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    createTable(){
        var n = this.state.n;
        n = parseInt(n);
        var table = [];
        var i,j;
        for(i=-1;i<n;i++){
            var arr1 = [];
            for(j=-1;j<n+1;j++){
                if(i===-1 && j===-1){
                    arr1.push(<td></td>);
                }
                else if(i===-1 && j===n){
                    arr1.push(<td align = "center">{'y'}</td>);
                }
                else if(i===-1 && j>-1){
                    arr1.push(<td align = "center">{'x'+(j)}</td>);
                }
                else if(j===-1 && i>-1){
                    arr1.push(<td align = "center">{'a'+(i)}</td>);
                }
                else{
                    arr1.push(<td align = "center"><input type="text" name = {(i*(n+1))+j} onChange = {this.set.bind(this)}/></td>);
                }
            }
            table.push(<tr>{arr1}</tr>);
        }
        return table
    }
    render(){
        return(
        <div>
            <div>
                <h1>INVERSE METHOD</h1>
                <form>
                    <h3>Input number of matrix : <input type="text" name='n' onChange={this.onChange.bind(this)}/></h3>
                </form>
            </div>
            <div>
            <form onConfirm = {this.onConfirm}>
                <table>
                    {this.createTable()}
                </table>
                <br/><br/><Button type="primary" onClick = {this.onConfirm.bind(this)} shape="round">Submit</Button><br/><br/>
                </form>
            </div>
            <Table dataSource={this.state.output} columns={header} pagination={false}/>
        </div>
      );
    }
}
