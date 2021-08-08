import React, { Component } from 'react';
import './Calculator.css';
import Result from './Result';
import KeyPad from "./KeyPad";

// true if previous operation return a result 
// if a result of a equation is returned already, press another number will begin a new equation
let getResult = false; 
// keep the last operation
// when a result is returned, press equal button will repeat last operation
// default operation is + 0
let lastOperation = "+ 0";

class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result: ""
        }

        this.click = this.click.bind(this);
        this.ce = this.ce.bind(this);
        this.clear = this.clear.bind(this)
        this.evaluate = this.evaluate.bind(this)
    }

    click(input) {
        if (this.state.result == "error") {
            this.clear();
        }


        if (input === "CE") {
            this.ce()
        }

        else if (input === "C") {
            this.clear()
        }

        else if (input === "=") {
            this.evaluate()
        }

        else {
            if (input === "+" || input === "-" || input === "*" || input === "/") {
                getResult = false;
                lastOperation = input;
                this.setState({
                    result: this.state.result + input
                })
            } else {
                if (getResult) {
                    getResult = false;
                    lastOperation = "+ 0";
                    this.setState({
                        result: input
                    })
                } else {
                    lastOperation += input;
                    this.setState({
                        result: this.state.result + input
                    })
                }
            }
        }
    }

    ce() {
        lastOperation = "+ 0";
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    }

    clear() {
        getResult = false;
        lastOperation = "";
        this.setState({
            result: ""
        })
    }

    evaluate() {
        try {
            if (this.state.result) {
                getResult = true;

                if (this.state.result.includes("+") || this.state.result.includes("-")
                    || this.state.result.includes("*") || this.state.result.includes("/")) {
                    this.setState({
                        result: eval(this.state.result).toString()
                    })
                } 
                else {
                    this.setState({
                        result: eval(this.state.result + lastOperation).toString()
                    })
                }
            }
        } catch (error) {
            getResult = false;
            lastOperation = "+ 0";
            this.setState({
                result: "error"
            })
        }
    }


    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1>Basic Calculator</h1>
                    <Result result={this.state.result} />
                    <KeyPad onClick={this.click} />
                </div>
            </div>
        );
    }
}

export default Calculator;