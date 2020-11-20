import React, {Component}  from 'react';
import '../styles/NewPartsForm.css';

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val =>{
   if(val.length > 0){valid = false;}
  });

//   Object.values(rest).forEach(val => {
//     if(val === null){valid = false; console.log();}
//   });

  return valid;
};

class NewPartsForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      partType: null,
      name: null,
      oe: null,
      producer: null,
      producerCode: null,
      nettoPrice: null,
      quantity: "",
      informations: null,
      engineCodes: null,
      modelNames: null,
      generationNames: null,
      formErrors: {
        partType: "",
        name: "",
        oe: "",
        producer: "",
        producerCode: "",
        nettoPrice: "",
        quantity: "",
        informations: "",
        engineCodes: "",
        modelNames: "",
        generationNames: "",
      }
    };
  }

  async postData(){

    var partId;
    if(formValid(this.state)){
      try{
        var res = await fetch('http://localhost:8080/addNewPart', {
          method: 'POST',
          mode: 'cors',
          headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            partTypeName: `${this.state.partType}`,
            name: `${this.state.name}`,
            oe: `${this.state.oe}`,
            producer: `${this.state.producer}`,
            producerCode: `${this.state.producerCode}`,
            netPrice: `${parseFloat(this.state.nettoPrice)}`,
            quantity: `${parseInt(this.state.quantity, 10)}`,
            information: `${this.state.informations}`,
            engineCodes: `${this.state.engineCodes}`,
            modelNames: `${this.state.modelNames}`,
            generationNames: `${this.state.generationNames}`,
          })
        });
        
        var data = await res.json();
        partId = data.idPart;

        await fetch(`http://localhost:8080/addSpecimenPart/${partId}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            partType: `${this.state.partType}`,
            name: `${this.state.name}`,
            oe: `${this.state.oe}`,
            producer: `${this.state.producer}`,
            producerCode: `${this.state.producerCode}`,
            netPrice: `${parseFloat(this.state.nettoPrice)}`,
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

  handleSubmit = e =>{
    e.preventDefault();
  };

  handleChange = e => { //sprawdzamy poprawność parametrów
    e.preventDefault();
    const {name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "partType":
        if(value.length === 0){
          formErrors.firstName = "This field is required";
        }
        else{
          formErrors.firstName = "";
        }
      break;
      case "name":
        if(value.length === 0){
          formErrors.lastName = "This field is required";
        }
        else{
          formErrors.lastName = "";
        }
      break;
      case "oe":
        if(value.length === 0){
          formErrors.phoneNumber = "This field is required";
        }
        else{
          formErrors.phoneNumber = "";
        }
      break;
      case "producer":
        if(value.length === 0){
          formErrors.street = "This field is required";
        }
        else{
          formErrors.street = "";
        }
      break;
      case "producerCode":
        if(value.length === 0){
          formErrors.houseNumber = "This field is required";
        }
        else{
          formErrors.houseNumber = "";
        }
      break;
      case "nettoPrice":
        if(value.length === 0){
          formErrors.postcode = "This field is required";
        }
        else{
          formErrors.postcode = "";
        }
      break;
      case "quantity":
        if(value.length === 0){
          formErrors.city = "This field is required";
        }
        else{
          formErrors.city = "";
        }
      break;
      case "engineCodes":
        if(value.length === 0){
          formErrors.country = "This field is required";
        }
        else{
          formErrors.country = "";
        }
      break;
      case "modelNames":
        if(value.length === 0){
          formErrors.password = "This field is required";
        }
        else{
          formErrors.password = "";
        }
      break;
      case "generationNames":
        if(value.length === 0){
          formErrors.repeatPassword = "This field is required";
        }
        else{
          formErrors.repeatPassword = "";
        }
      break;    
      default: break;
    }

    this.setState({formErrors, [name]: value});
  }

  

render(){

  const {formErrors} = this.state;

    return (
      <div className="newParts-form">
        <div className="form-newParts">
          <h1>Fill in the parts data</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="partType">
              <label for="partType">Part Type</label>
              <input
              id="partType"
              type="text"
              className="partType-input"
              placeholder="Part Type"
              name="partType"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.partType.length > 0 &&(
                <span className="errorMessage">{formErrors.partType}</span>
              )}
              
              <label for="name">Name</label>
              <input
              id="name"
              type="text"
              className="name-input"
              placeholder="Name"
              name="name"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.name.length > 0 &&(
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="oe">
              <label for="oe">OE</label>
              <input
              id="oe"
              type="text"
              className="oe-input"
              placeholder="OE"
              name="oe"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.oe.length > 0 &&(
                <span className="errorMessage">{formErrors.oe}</span>
              )}
            </div>

            <div className="producer">
              <label for="producer">Producer</label>
              <input
              id="producer"
              type="text"
              className="producer-input"
              placeholder="Producer"
              name="producer"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.producer.length > 0 &&(
                <span className="errorMessage">{formErrors.producer}</span>
              )}
            </div>

            <div className="producerCode">
              <label for="producerCode">Producer Code</label>
              <input
              id="producerCode"
              type="text"
              className="producerCode-input"
              placeholder="Producer code"
              name="producerCode"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.producerCode.length > 0 &&(
                <span className="errorMessage">{formErrors.producerCode}</span>
              )}
              <label for="nettoPrice">Netto Price</label>
            <input
              id="nettoPrice"
              type="text"
              className="nettoPrice-input"
              placeholder="Netto Price"
              name="nettoPrice"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.nettoPrice.length > 0 &&(
                <span className="errorMessage">{formErrors.nettoPrice}</span>
              )}
              <label for="quantity">Quantity</label>
            <input
            id="quantity"
              type="text"
              className="quantity-input"
              placeholder="Quantity"
              name="quantity"
              noValidate
              onChange={this.handleChange}
              />
               { formErrors.quantity.length > 0 &&(
                <span className="errorMessage">{formErrors.quantity}</span>
              ) }
            </div>

            <div className="informations">
              <label for="informations">Informations</label>
              <input
              id="informations"
              type="text"
              className="informations-input"
              placeholder="Informations"
              name="informations"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.informations.length > 0 &&(
                <span className="errorMessage">{formErrors.informations}</span>
              )}
              <label for="engineCodes">Engine Codes</label>
            <input
              id="engineCodes"
              type="text"
              className="engineCodes-input"
              placeholder="Engine codes:"
              name="engineCodes"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.engineCodes.length > 0 &&(
                <span className="errorMessage">{formErrors.engineCodes}</span>
              )}
            </div>

            <div className="modelNames">
              <label for="modelNames">Model Names</label>
              <input
              id="modelNames"
              type="text"
              className="modelNames-input"
              placeholder="Model names:"
              name="modelNames"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.modelNames.length > 0 &&(
                <span className="errorMessage">{formErrors.modelNames}</span>
              )}
            </div>


            <div className="generationNames">
              <label for="generationNames">Generation Names</label>
              <input
              id="generationNames"
              type="text"
              className="generationNames-input"
              placeholder="Generation names"
              name="generationNames"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.generationNames.length > 0 &&(
                <span className="errorMessage">{formErrors.generationNames}</span>
              )}
              {/* <label htmlFor="password">Password</label> */}
            </div>

            <div className="addPart-individual">
              <button type="submit" onClick={() => this.postData()}>Add new part</button>
            </div>
            
        </form> 
    </div>
</div>
  );
  }
}

export default NewPartsForm;
