import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../styles/SelectParts.css'

class SelectParts extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            quantity: "1"
        };
    }

    handleChange = e =>{
        e.preventDefault();
        console.log(e.target.value);
        this.setState({quantity: e.target.value});
    }

    async componentDidMount(){

        var response = await fetch(`http://localhost:8080/getPartsByParams/${this.props.chosenModel}/${this.props.chosenEngine}/${this.props.chosenPartType}`);
        const data = await response.json();
        console.log(data);
        this.setState({items: data, isLoaded: true})
         
    }

    async addToBasket(idSpecimenPart){

        var idClient = parseInt(localStorage.getItem('user'), 10);
        var quantity = parseInt(this.state.quantity, 10);
        console.log(idClient, idSpecimenPart, quantity);
        await fetch(`http://localhost:8080/addDetailPayment?idClient=${idClient}&idSpecimenPart=${idSpecimenPart}&quantity=${quantity}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.status === 200){
                console.log("UDALO SIE WPISAC DO KOSZYKA")
            }
            else if(response.status === 500){
                console.log("BLAD NA SERWERZE")
            }
        });
    }

render(){

    var { items } = this.state;
        return(
            <div className="selectParts-page">
               {items.map(item => (
                <div className="selectParts-form" key={item.idPart}>
                <div>
                    <span id="name" className="name">Part Name: {item.name}</span>
                </div>
                    <div className="numbers">
                        {item.specimenParts.map(specimenPart => (
                        <div key={specimenPart.idSpecimenPart}>
                            <div className="quantity">In Stock: {specimenPart.quantity}</div>
                            <div className="price">Gross price: {specimenPart.grossPrice}</div> 
                        </div>
                    ))}
                        {/* <div key={item.specimenParts[0].idSpecimenPart}>
                            <div className="quantity">In Stock: {item.specimenParts[0].quantity}</div>
                            <div className="price">Gross price: {item.specimenParts[0].grossPrice}</div> 
                        </div> */}
                    </div>
                    <div className="selectQuantity">
                        <label className="label" for="quantity">Quantity:</label>
                         <input type="number" name="quantity" min="0" onChange={this.handleChange}></input>
                    </div>
                    <div className="buttons">
                        <Link to={{ pathname: "/partDetails", data: item.specimenParts }}>
                            <button className="detailButton">DETAILS</button>
                        </Link>
                        <button className="addToBasketButton" onClick={ () => this.addToBasket(item.specimenParts[0].idSpecimenPart)}>ADD TO BASKET</button>
                    </div>
                </div>
               ))}
               </div>
        )
}


}


export default SelectParts;