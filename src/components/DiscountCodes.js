import React, {Component}  from 'react';
import '../styles/IndividualForm.css';

class DiscountCodes extends Component{
  constructor(props){
    super(props);
    this.state = {
        discountCode: "",
        discountValue: ""
    };
}

handleChange = e => { //sprawdzamy poprawność parametrów
    e.preventDefault();
    const {name, value } = e.target;
    this.setState({[name]: value});
}

async postCode(){
    await fetch(`http://localhost:8080/addDiscountCode?code=${this.state.discountCode}&value=${this.state.discountValue}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    });
}

async deleteCode(){
    await  fetch(`http://localhost:8080/deleteDiscountCode?code=${this.state.discountCode}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    });
}

render(){

  
    return(
        <div>
            <h1>Manage discounts</h1>
            <div>
                <input 
                    type="text"
                    className="discount-input"
                    placeholder="Discount code"
                    name="discountCode"
                    noValidate
                    onChange={this.handleChange}
                />
                <input 
                    type="text"
                    className="discount-input"
                    placeholder="Value"
                    name="discountValue"
                    noValidate
                    onChange={this.handleChange}
                />
            </div>
            <div>
                <button onClick={() => this.postCode()}>ADD CODE</button>
                <button onClick={() => this.deleteCode()}>REMOVE CODE</button>
            </div>
        
        </div>
    )
}
}

export default DiscountCodes;
