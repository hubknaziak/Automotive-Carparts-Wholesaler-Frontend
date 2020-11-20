import React, {Component}  from 'react';
import '../styles/Basket.css'

class Basket extends Component{
  constructor(props){
    super(props);
    this.state = {
        item: null,
        isLoaded: false,
        chosenPartType: '',
        renderParts: false,
        paymentMethod: "",
        paymentStatus: ""
    };
}

async componentDidMount(){
    var clientId = localStorage.getItem('user');
    var response = await fetch (`http://localhost:8080/getPaymentByIdClient/${clientId}`);
    const data = await response.json();
    console.log(data);
    this.setState({item: data, isLoaded: true, paymentStatus: data.paymentStatus, paymentMethod: data.paymentMethod});
}


async removeDetailPayment(detailPaymentID){
    await fetch(`http://localhost:8080/deleteDetailPayment/${detailPaymentID}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.status === 200){
          console.log("OK");
        }
        else if(response.status === 500){
            console.log("INTENRAL SEVER ERROR");
        }
    });
}

handleKeyUp = e => {
    if(e.keyCode === 13) {this.enterDiscountCode(e);}
}

handlePaymentMethodChange = e =>{
    console.log(e.target.value);
    this.setState({paymentMethod: e.target.value});
}

async enterDiscountCode(e){
    await fetch(`http://localhost:8080/putDiscountCode?code=${e.target.value}&idPayment=${this.state.item.idPayment}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.status === 200){
          console.log("OK");
        }
        else if(response.status === 500){
            console.log("INTENRAL SEVER ERROR");
        }
    });
}

async confirmPayment(){
    await fetch(`http://localhost:8080/confirmPayment?idPayment=${this.state.item.idPayment}&payMethod=${this.state.paymentMethod}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.status === 200){
          console.log("OK");
        }
        else if(response.status === 500){
            console.log("INTENRAL SEVER ERROR");
        }
    });
}

async cancelPayment(){
    await fetch(`http://localhost:8080/deletePayment?idPayment=${this.state.item.idPayment}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.status === 200){
          console.log("OK");
        }
        else if(response.status === 500){
            console.log("INTENRAL SEVER ERROR");
        }
    });
}


render(){

  var {isLoaded, item} = this.state;
    if(!isLoaded){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    else{
        console.log(item);
    return(
        <div className="basket-page">
            <h1>Basket</h1>
            {item.detailPayments.map(detailPayment => (
            <div className="basket" key={detailPayment.idDetailPayment}>
                <div className="section1">
                    <label className="label">Name: {detailPayment.specimenPart.name} </label>
                </div>
                <div className="section1">
                    <label className="label">OE Code: {detailPayment.specimenPart.oe}</label>
                </div>
                <div className="section1">
                    <label className="label">Producer: {detailPayment.specimenPart.producer}</label>
                </div>
                <div className="section1">
                    <label className="label">Producer code: {detailPayment.specimenPart.producerCode}</label>
                </div>
                <div className="section1">
                    <label className="label">Cost (x1): {detailPayment.cost}</label>
                    <label className="label">Quantity: {detailPayment.quantity}</label>
                </div>
                <div className="section1">
                    <label className="label">Total cost: {item.totalCost}</label>
                    <div className="removeButton">
                        <button className="removeButton-button"  onClick={ () => this.removeDetailPayment(detailPayment.idDetailPayment)} >REMOVE</button>
                    </div>
                </div>
            </div>
            ))}
            <div className="payment">
                <div className="section1">
                <label className="label" for="paymentMethod">Payment Method: </label>
                <select name="paymentMethod" id="paymentMethod" onChange={this.handlePaymentMethodChange}>
                    <option value="cash">cash(upon receipt)</option>
                    <option value="transfer">transfer</option>
                 </select>
                 </div>
                 <div className="section1">
                    <label className="label">Payment Status: {this.state.paymentStatus}</label>
                </div>
                
                <div className="section1">
                    <label className="label" for="discount" >Enter discount code: </label>
                    <input type="text" id="discount" placeholder="TYPE AND HIT ENTER" onKeyUp={this.handleKeyUp}/>
                </div>
                <div className="section1">
                    <label className="label">Order status: {item.status}</label>
                </div>
                <div className="section1"> 
                    <button className="confirmButton" onClick={ () => this.confirmPayment()}>Confirm</button>
                    <button className="cancelButton" onClick={ () => this.cancelPayment()}>Cancel</button>
                </div>
            </div>
        </div>
    )
    }
}
}

export default Basket;
