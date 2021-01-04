import React, {Component}  from 'react';
import '../styles/DiscountCodes.css';

class DiscountCodes extends Component{
  constructor(props){
    super(props);
    this.state = {
        discountCode: "",
        discountValue: ""
    };
}

handleChange = e => {
    e.preventDefault();
    const {name, value } = e.target;
    this.setState({[name]: value});
}

async postCode(){
    await fetch(`http://localhost:8080/addDiscountCode?code=${this.state.discountCode}&value=${this.state.discountValue}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
    });
}

async deleteCode(){
    await  fetch(`http://localhost:8080/deleteDiscountCode?code=${this.state.discountCode}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
    });
}

render(){

  
    return(
        <div className="discountCodes-page">
            <div className="discountCodes-form">
            <h1>Manage discounts</h1>
                <div className="discountCode">
                <label for="discountCode" className="discountCode-label">Discount Code</label>
                    <input 
                        id="discountCode"
                        type="text"
                        className="discountCode-input"
                        placeholder="Discount code"
                        name="discountCode"
                        noValidate
                        onChange={this.handleChange}
                    />
                    </div>
                    <div className="discountValue">
                    <label for="discountValue" className="discountValue-label">Discount Code</label>
                    <input 
                        id="discountValue"
                        type="text"
                        className="discountValue-input"
                        placeholder="Value"
                        name="discountValue"
                        noValidate
                        onChange={this.handleChange}
                    />
                </div>
                <div className="controlButtons">
                    <button className="addCode-button" onClick={() => this.postCode()}>ADD CODE</button>
                    <button className="deleteCode-button" onClick={() => this.deleteCode()}>REMOVE CODE</button>
                </div>
            </div>
        </div>
    )
}
}

export default DiscountCodes;
