import React, {Component}  from 'react';
import '../styles/ModifyPartsForm.css';

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val =>{
   if(val.length > 0){valid = false;}
  });

  return valid;
};

class ModifyPartsForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      partFound: false,
      data: "",
      partType: null,
      name: null,
      oe: null,
      producer: null,
      producerCode: null,
      nettoPrice: null,
      grossPrice: null,
      quantity: null,
      informations: null,
      engineCodes: null,
      modelNames: null,
      generationNames: null,
      formErrors: {  
        oe: "",
      }
    };
  }


  async findParts(e){
    //console.log(e.target.value);
   var response = await fetch(`http://localhost:8080/getSpecimenPart/${e.target.value}`)
   const data = await response.json();
   console.log(data);
   if(data.length === 0){
       alert("Nie znaleziono czesci!");
   }
   else this.setState({data: data, partFound: true, name: data[0].name, oe: data[0].oe, producer: data[0].producer,
    producerCode: data[0].producerCode, nettoPrice: data[0].netPrice, grossPrice: data[0].grossPrice, quantity: data[0].quantity, informations: data[0].informations })   
}


  async putData(){

    if(formValid(this.state)){
      try{
        await fetch(`http://localhost:8080/updateSpecimenPart/${this.state.data[0].idSpecimenPart}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            partTypeName: `${this.state.partType}`,
            name: `${this.state.name}`,
            oe: `${this.state.oe}`,
            producer: `${this.state.producer}`,
            producerCode: `${this.state.producerCode}`,
            netPrice: `${parseFloat(this.state.nettoPrice)}`,
            grossPrice: `${parseFloat(this.state.nettoPrice)}`,
            quantity: `${parseInt(this.state.quantity, 10)}`,
            information: `${this.state.informations}`,
            engineCodes: `${this.state.engineCodes}`,
            modelNames: `${this.state.modelNames}`,
            generationNames: `${this.state.generationNames}`,
          })
        });
        

      }catch(e){
        console.log(e);
      }
    }
  }

  async deletePart(){
    await fetch(`http://localhost:8080/deleteSpecimenPart/${this.state.data[0].idSpecimenPart}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  }

  handleSubmit = e =>{
    e.preventDefault();
  };

  handleKeyUp = e => {
    if(e.keyCode === 13) {this.findParts(e);}
}

  handleChange = e => { 
    e.preventDefault();
    const {name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "oe":
        if(value.length === 0){
          formErrors.password = "This field is required";
        }
        else{
          formErrors.password = "";
        }
      break;
      default: break;
    }

    this.setState({formErrors, [name]: value});
  }

  

render(){

  const {formErrors, partFound} = this.state;

  if(!partFound){
      return(
          <div className="modifyParts-form">
            <label for="findPart" className="findPart-label">Part OE/Producer Code Number</label>
              <input
              id="findPart"
              type="text"
              className="findPart-input"
              placeholder="OE / ProducerCode"
              name="partType"
              noValidate
              onKeyUp={this.handleKeyUp}
              />
          </div>
      )
  }
else{
    return (
      <div className="modifyParts-form">
        <div className="form-modifyParts">
          <h1>Fill in the part data</h1>
          {this.state.data.map(specimenPart => (
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="partTypeModify">
              
              <label for="modifyName" className="modifyName-label">Name</label>
              <input
              id="modifyName"
              type="text"
              className="modifyName-input"
              placeholder={specimenPart.name}
              name="name"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="modifyoe">
              <label for="modifyoe" className="modifyoe-label">OE</label>
              <input
              id="modifyoe"
              type="text"
              className="modifyoe-input"
              placeholder={specimenPart.oe}
              name="oe"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.oe.length > 0 &&(
                <span className="errorMessage">{formErrors.oe}</span>
              )}
           
              <label for="modifyProducer" className="modifyProducer-label">Producer</label>
              <input
              id="modifyProducer"
              type="text"
              className="modifyProducer-input"
              placeholder={specimenPart.producer}
              name="producer"
              noValidate
              onChange={this.handleChange}
              />
           
              <label for="modifyProducerCode" className="modifyProducerCode-label">Producer Code</label>
              <input
              id="modifyProducerCode"
              type="text"
              className="modifyProducerCode-input"
              placeholder={specimenPart.producerCode}
              name="producerCode"
              noValidate
              onChange={this.handleChange}
              />
              </div>
              <div className="modifyNettoPrice">
              <label for="modifyNettoPrice" className="modifyNettoPrice-label">Netto Price</label>
              <input
              id="modifyNettoPrice"
              type="text"
              className="modifyNettoPrice-input"
              placeholder={specimenPart.netPrice}
              name="nettoPrice"
              noValidate
              onChange={this.handleChange}
              />
            <label for="modifyGrossPrice" className="modifyGrossPrice-label">Gross Price</label>
            <input
            id="modifyGrossPrice"
              type="text"
              className="modifyGrossPrice-input"
              placeholder={specimenPart.grossPrice}
              name="grossPrice"
              noValidate
              onChange={this.handleChange}
              />
              <label for="modifyQuantity" className="modifyQuantity-label">Quantity</label>
            <input
            id="modifyQuantity"
              type="text"
              className="modifyQuantity-input"
              placeholder={specimenPart.quantity}
              name="quantity"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="modifyInformations">
              <label for="modifyInformations" className="modifyInformations-label">Informations</label>
              <input
              id="modifyInformations"
              type="text"
              className="modifyInformations-input"
              placeholder={specimenPart.informations}
              name="informations"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="updatePart">
              <button className="updatePart-button" type="submit" onClick={() => this.putData()}>Update part</button>
          
              <button className="deletePart-button" type="submit" onClick={() => this.deletePart()}>Delete part</button>
            </div>
            
        </form> 
        ))}
    </div>
</div>
  );
  }
}
}

export default ModifyPartsForm;
