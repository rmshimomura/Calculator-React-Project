import React, { Component } from 'react';
import './Calculator.css'

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    currentValue: 0 
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {

        this.setState({...initialState})

    }

    setOperation(operation) {

        console.log('Setting operation ' + operation)

    }

    addDigit(digit) {
        
        if(digit === "." && this.state.displayValue.includes('.')) { // Prevent double decimals
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        /* 
            Boolean value saying if it's necessary to clear the display
            True if the current display value is 0 or the variable this.state.clearDisplay is set to true
        */

        const currentValue = clearDisplay ? '' : this.state.displayValue 

        /* 
            currentValue shows the 'cleared' value or the display value
        */

        const displayValue = currentValue + digit

        this.setState( { displayValue : displayValue, clearDisplay : false} )

        if(digit !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState( { values : values })
        }

    }

    render() {

        return(

            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" operation="true" click={this.setOperation}/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" operation="true" click={this.setOperation}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" operation="true" click={this.setOperation}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" operation="true" click={this.setOperation}/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" operation="true" click={this.setOperation}/>
            </div>

        )

    }

}