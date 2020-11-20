import React, {Component}  from 'react';
import '../styles/IndividualForm.css';

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

    //var partId;
    if(formValid(this.state)){
      try{
        await fetch(`http://localhost:8080/updateSpecimenPart/${this.state.data[0].idSpecimenPart}`, {
          method: 'PUT',
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
          //'Accept': 'application/json',
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

  handleChange = e => { //sprawdzamy poprawność parametrów
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
          <div>
              <input
              type="text"
              className="oe-input"
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
      <div className="newParts-form">
        <div className="form-newParts">
          <h1>Fill in the parts data</h1>
          {this.state.data.map(specimenPart => (
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="partType">
              {/* <label htmlFor="login">Login</label> */}
              <input
              type="text"
              className="partType-input"
              placeholder="Part Type"
              name="partType"
              noValidate
              onChange={this.handleChange}
              />
            </div>
            <div className="name">
              {/* <label htmlFor="password">Password</label> */}
              <input
              type="text"
              className="name-input"
              placeholder={specimenPart.name}
              name="name"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="oe">
              {/* <label htmlFor="password">Password</label> */}
              <input
              type="text"
              className="oe-input"
              placeholder={specimenPart.oe}
              name="oe"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.oe.length > 0 &&(
                <span className="errorMessage">{formErrors.oe}</span>
              )}
            </div>

            <div className="producer">
              {/* <label htmlFor="password">Password</label> */}
              <input
              type="text"
              className="producer-input"
              placeholder={specimenPart.producer}
              name="producer"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="producerCode">
              {/* <label htmlFor="password">Password</label> */}
              <input
              type="text"
              className="producerCode-input"
              placeholder={specimenPart.producerCode}
              name="producerCode"
              noValidate
              onChange={this.handleChange}
              />
            <input
              type="text"
              className="nettoPrice-input"
              placeholder={specimenPart.netPrice}
              name="nettoPrice"
              noValidate
              onChange={this.handleChange}
              />

            <input
              type="text"
              className="grossPrice-input"
              placeholder={specimenPart.grossPrice}
              name="grossPrice"
              noValidate
              onChange={this.handleChange}
              />
              
            <input
              type="text"
              className="quantity-input"
              placeholder={specimenPart.quantity}
              name="quantity"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="informations">
              {/* <label htmlFor="password">Password</label> */}
              <input
              type="text"
              className="informations-input"
              placeholder={specimenPart.informations}
              name="informations"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="updatePart-individual">
              <button type="submit" onClick={() => this.putData()}>Update part</button>
            </div>

            <div className="updatePart-individual">
              <button type="submit" onClick={() => this.deletePart()}>Delete part</button>
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
