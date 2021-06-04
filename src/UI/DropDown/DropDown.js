import React, { Component } from 'react'

export default class DropDown extends Component {
    render() {
        let options = this.props.options.map(opt =>(
            <option key = {opt} value = {opt}>{opt}</option>
        ));
        return (
            <>
              <select className ="custom-select mr-sm-2" {...this.props}>
                  {options}
              </select>  
            </>
        )
    }
}
