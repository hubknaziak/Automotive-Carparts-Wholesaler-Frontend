import React, {Component}  from 'react';
import '../styles/PartDetails.css'

class PartDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
        items: [],
        isLoaded: false,
        chosenPartType: '',
        renderParts: false,
        quantity: "0"
    };
}

handleChange = e =>{
    e.preventDefault();
    console.log(e.target.value);
    this.setState({quantity: e.target.value});
}

async addToBasket(){

    var idClient = parseInt(localStorage.getItem('user'), 10);
    var idSpecimenPart = this.props.location.data[0].idSpecimenPart;
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

   const specimenParts = this.props.location.data;
   console.log(this.props);
  
    return(
      <div className="partDetails-page">
        {specimenParts.map(specimenPart => (
        <div className="partDetails" key={specimenPart.idSpecimenPart}>
            <div className="textDetail">
            <div className="partName">
                <label className="label" for="partName">Part Name:</label>
                <span className="partName-span" id="partName">{specimenPart.name}</span>
            </div>
            <div className="oeCode">
                <label className="label" for="oeCode">OE Code:</label>
                <span className="oeCode-span" id="oeCode">{specimenPart.oe}</span>
            </div>
            <div className="producer">
                <label className="label" for="producer">Producer: </label>
                <span className="producer-span" id="producer">{specimenPart.producer}</span>
            </div>
            <div className="producerCode">
                <label className="label" for="porducerCode">Producer code:</label>
                <span  className="producerCode-span" id="porducerCode">{specimenPart.producerCode}</span>
            </div>
            </div>

            <div className="priceDetail">
                <div className="netPrice">
                    <label className="label" for="netPrice">Net price: </label>
                    <span className="netPrice-span" id="netPrice">{specimenPart.netPrice} PLN</span>
                </div>
                <div className="grossPrice">
                    <label className="label" for="grossPrice">Gross price:  </label>
                    <span className="grossPrice-span" id="grossPrice">{specimenPart.grossPrice}PLN</span>
                </div>
            </div>
            <div className="quantity">
                <label className="label" for="quantity">Quantity:</label>
                <input className="quantity-input" type="number" name="quantity" min="0" onChange={this.handleChange}></input>
            
                    <label className="label-inStock" for="inStock">In stock: </label>
                    <span className="inStock-span" id="inStock">{specimenPart.quantity}</span>
            
            </div>
            <div className="button-div">
                <button className="button" onClick={ () => this.addToBasket()} >ADD TO BASKET</button>
            </div>
            <div className="informations">
                Informations about product:
                <div className="informations-textarea">
                    <textarea id="informations-textarea" name="informations-textarea" rows="6" cols="64">
                    {specimenPart.informations}
                    </textarea>
                </div>
            </div>
            
        </div>
        ))}
      </div>
    )
  
}
}

export default PartDetails;
