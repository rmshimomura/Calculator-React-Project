import React, { Component } from 'react';
import './Calculator.css'

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {

    displayValue: '0',
    clearDisplay: false,
    previousOperation: null,
    operation: null,
    values: [null, null],
    currentPositionOnValues: 0,
    originalValue: 0

}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {

        super(props);
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)

    }

    clearMemory() {

        this.setState({ ...initialState })

    }

    setOperation(operation) {

        if (this.state.currentPositionOnValues === 0) {

            this.setState({ operation: operation, currentPositionOnValues: 1, clearDisplay: true, previousOperation: operation })

        } else if (this.state.previousOperation !== null && this.state.values[1] === null && (operation === '+' || operation === '-' || operation === '*' || operation === '/')) {

            this.setState({ operation: operation, previousOperation: operation })

        } else {

            let originalValue = this.state.originalValue

            if (this.state.values[1] !== null) {

                originalValue = this.state.values[1]
                
            }

            const equals = operation === '='

            let currentOperation = null;

            if (this.state.operation) {

                currentOperation = this.state.operation

            } else {

                currentOperation = operation

            }

            let previousOperation = this.state.previousOperation;

            if (currentOperation !== '=' && currentOperation !== null) previousOperation = currentOperation

            const values = [...this.state.values]

            if (values[1] === null) this.previousOperation = operation

            switch (currentOperation) {

                case '+':
                    values[0] += values[1]
                    break

                case '-':
                    values[0] -= values[1]
                    break

                case '*':
                    values[0] *= values[1]
                    break

                case '/':
                    values[0] /= values[1]
                    break

                case '=':
                    if (this.state.values[1] === null)
                        this.repeatOperation(values, this.state.originalValue, this.state.previousOperation)
                    break

                default:

                    break

            }

            if (isNaN(values[0]) || !isFinite(values[0])) {
                this.clearMemory()
                return
            }

            values[1] = null

            this.setState(

                {
                    displayValue: values[0],
                    operation: equals ? null : operation,
                    currentPositionOnValues: values[0] !== 0 ? 1 : 0,
                    clearDisplay: !equals,
                    values,
                    previousOperation,
                    originalValue
                }

            )

        }

    }

    repeatOperation(values, originalValue, previousOperation) {

        switch (previousOperation) {

            case '+':
                values[0] += originalValue
                break

            case '-':
                values[0] -= originalValue
                break

            case '*':
                values[0] *= originalValue
                break

            case '/':
                values[0] /= originalValue
                break

            default:
                return

        }

    }

    addDigit(digit) {

        if (digit === "." && this.state.displayValue.includes('.')) {

            // Prevent double decimals
            return

        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        /* 
            Boolean value saying if it's necessary to clear the display
            True if the currentValue display value is 0 or the variable this.state.clearDisplay is set to true
        */

        const currentValue = clearDisplay ? '' : this.state.displayValue

        /* 
            currentValue shows the 'cleared' value or the display value
        */

        const displayValue = currentValue + digit

        this.setState({ displayValue: displayValue, clearDisplay: false })

        if (digit !== '.') {

            const i = this.state.currentPositionOnValues
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values: values })

        }

    }

    render() {

        return (

            <div className="calculator">

                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" operation="true" click={this.setOperation} />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" operation="true" click={this.setOperation} />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" operation="true" click={this.setOperation} />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" operation="true" click={this.setOperation} />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" operation="true" click={this.setOperation} />

            </div>

        )

    }

}