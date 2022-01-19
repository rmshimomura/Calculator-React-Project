import React, { Component } from 'react';
import './Calculator.css'

import Button from '../components/Button';
import Display from '../components/Display';

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {

        console.log('Clearing memory')

    }

    setOperation(operation) {

        console.log('Setting operation ' + operation)

    }

    addDigit(digit) {
        console.log(digit)
    }

    render() {

        return(

            <div className="calculator">
                <Display value={1000}/>
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