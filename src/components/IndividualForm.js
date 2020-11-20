import React, {Component}  from 'react';
import '../styles/IndividualForm.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val =>{
   if(val.length > 0){valid = false;}
  });

  Object.values(rest).forEach(val => {
    if(val === null){valid = false; console.log();}
  });

  return valid;
};

class IndividualForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      street: null,
      houseNumber: null,
      apartmentNumber: "",
      postcode: null,
      city: null,
      country: null,
      password: null,
      repeatPassword: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
        postcode: "",
        city: "",
        country: "",
        password: "",
        repeatPassword: "",
      }
    };
  }

  async postData(){

    if(formValid(this.state)){
      try{
        await fetch('http://localhost:8080/addAccount', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: `${this.state.email}`,
            password: `${this.state.password}`,
            nip: "0"
          })
        });

        await fetch('http://localhost:8080/addPersonalData', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: `${this.state.firstName}`,
            lastName: `${this.state.lastName}`,
            phoneNumber: `${this.state.phoneNumber}`,
            street: `${this.state.street}`,
            houseNumber: `${this.state.houseNumber}`,
            apartmentNumber: `${this.state.apartmentNumber}`,
            postcode: `${this.state.postcode}`,
            city: `${this.state.city}`,
            country: `${this.state.country}`
          })
        });

        await fetch('http://localhost:8080/addClient', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            companyName: "",
            nip: "0"
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
      case "firstName":
        if(value.length === 0){
          formErrors.firstName = "This field is required";
        }
        else{
          formErrors.firstName = "";
        }
      break;
      case "lastName":
        if(value.length === 0){
          formErrors.lastName = "This field is required";
        }
        else{
          formErrors.lastName = "";
        }
      break;
      case "email":
        if(value.length === 0){
          formErrors.email = "This field is required";
        }
        else if(!emailRegex.test(value)){
          formErrors.email = "Incorrect email address";
        }
        else{
          formErrors.email = "";
        }
      break;
      case "phoneNumber":
        if(value.length < 9){
          formErrors.phoneNumber = "Incorrect phone number";
        }
        else if(value.length === 0){
          formErrors.phoneNumber = "This field is required";
        }
        else{
          formErrors.phoneNumber = "";
        }
      break;
      case "street":
        if(value.length === 0){
          formErrors.street = "This field is required";
        }
        else{
          formErrors.street = "";
        }
      break;
      case "houseNumber":
        if(value.length === 0){
          formErrors.houseNumber = "This field is required";
        }
        else{
          formErrors.houseNumber = "";
        }
      break;
      case "postcode":
        if(value.length === 0){
          formErrors.postcode = "This field is required";
        }
        else if(value.length !== 6){
          formErrors.postcode = "Incorrect postcode";
        }
        else{
          formErrors.postcode = "";
        }
      break;
      case "city":
        if(value.length === 0){
          formErrors.city = "This field is required";
        }
        else{
          formErrors.city = "";
        }
      break;
      case "country":
        if(value.length === 0){
          formErrors.country = "This field is required";
        }
        else{
          formErrors.country = "";
        }
      break;
      case "password":
        if(value.length === 0){
          formErrors.password = "This field is required";
        }
        else{
          formErrors.password = "";
        }
      break;
      case "repeatPassword":
        if(value.length === 0){
          formErrors.repeatPassword = "This field is required";
        }
        else if(this.state.password !== value){
          formErrors.repeatPassword = "Passwords are different";
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
      <div className="individual-form">
        <div className="form-individual">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label for="firstName" className="label">First Name</label>
              <input
              id="firstName"
              type="text"
              className="firstName-input"
              placeholder="First Name"
              name="firstName"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 &&(
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label for="lastName" className="label">Last Name</label>
              <input
              id="lastName"
              type="text"
              className="lastName-input"
              placeholder="Last Name"
              name="lastName"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.lastName.length > 0 &&(
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label for="email" className="email-label-Individual">Email</label>
              <input
              id="email"
              type="text"
              className="email-input-Individual"
              placeholder="Email"
              name="email"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.email.length > 0 &&(
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="phoneNumber-Individual">
              <label for="phoneNumber" className="label">Phone Number</label>
              <input
              id="phoneNumber"
              type="number"
              className="phoneNumber-input-Individual"
              placeholder="Phone Number"
              name="phoneNumber"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.phoneNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </div>

            <div className="street-Individual">
              <label for="street" className="label">Street</label>
              <input
              id="street"
              type="text"
              className="street-input-Individual"
              placeholder="Street"
              name="street"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.street.length > 0 &&(
                <span className="errorMessage">{formErrors.street}</span>
              )}
              </div>
              <div className="house-Individual">
              <label for="houseNumber-Individual" className="label">House Number</label>
            <input
              id="houseNumber"
              type="text"
              className="houseNumber-input-Individual"
              placeholder="House Number"
              name="houseNumber"
              noValidate
              onChange={this.handleChange}
              />
              
              <label for="apartmentNumber-Individual" className="label-apartment">Apartment Number</label>
            <input
            id="apartmentNumber"
              type="text"
              className="apartmentNumber-input-Individual"
              placeholder="Apartment Number"
              name="apartmentNumber"
              noValidate
              onChange={this.handleChange}
              />
               {/* {formErrors.apartmentNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.apartmentNumber}</span>
              )} */}
              {formErrors.houseNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.houseNumber}</span>
              )}
            </div>

            <div className="postcode-Individual">
              <label for="postcode" className="label-postcode">Postcode</label>
              <input
              id="postcode"
              type="text"
              className="postcode-input-Individual"
              placeholder="Postcode"
              name="postcode"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.postcode.length > 0 &&(
                <span className="errorMessage">{formErrors.postcode}</span>
              )}
              <label for="city-Individual" className="label-city">City</label>
            <input
            id="city"
              type="text"
              className="city-input-Individual"
              placeholder="City"
              name="city"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.city.length > 0 &&(
                <span className="errorMessage">{formErrors.city}</span>
              )}
      
              <label for="country" className="label-country">Country</label>
              <input
              id="country"
              type="text"
              className="country-input-Individual"
              placeholder="Country"
              name="country"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.country.length > 0 &&(
                <span className="errorMessage">{formErrors.country}</span>
              )}
            </div>


            <div className="password-Individual">
              <label for="password" className="label-password">Password</label>
              <input
              id="password"
              type="password"
              className="password-input-Individual"
              placeholder="Password"
              name="password"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.password.length > 0 &&(
                <span className="errorMessage">{formErrors.password}</span>
              )}
              <label for="repeatPassword-Individual" className="label-repeat-password">Repeat Password</label>
              <input
              id="repeatPassword"
              type="password"
              className="repeatPassword-input-Individual"
              placeholder="Repeat Password"
              name="repeatPassword"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.repeatPassword.length > 0 &&(
                <span className="errorMessage">{formErrors.repeatPassword}</span>
              )}
            </div>

            <div className="signUp-individual">
              <button type="submit" onClick={() => this.postData()}>Sign Up</button>
            </div>
            
        </form> 
    </div>
</div>
  );
  }
}

export default IndividualForm;
