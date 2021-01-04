import React, {Component}  from 'react';
import '../styles/CompanyForm.css';

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

class CompanyForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      renderAlert: false,
      renderConfirm: false,
      companyName: null,
      NIP: null,
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
        companyName: "",
        NIP: "",
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

    const nip = this.state.NIP;

    if(formValid(this.state)){
      this.setState({renderAlert: false})
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
            nip:  parseInt(nip, 10)//`${this.state.NIP}`.parseInt()
          })
        });

        await fetch('http://localhost:8080/addPersonalData', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
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
            companyName: `${this.state.companyName}`,
            nip: parseInt(nip, 10)
          })
        });

        this.setState({renderConfirm: true})
      }catch(e){
        console.log(e);
      }
    }
    else{
      this.setState({renderAlert: true})
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
      case "companyName":
        if(value.length === 0){
          formErrors.companyName = "This field is required";
        }
        else{
          formErrors.companyName = "";
        }
      break;
      case "NIP":
        if(value.length !== 10){
          formErrors.NIP = "Incorrect NIP number";
        }
        else if(value.length === 0){
          formErrors.NIP = "This field is required";
        }
        else{
          formErrors.NIP = "";
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
      <div className="company-form">
        <div className="form-company">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="companyName">
              <label for="companyName" className="companyName-label">Company Name<span class="red-star">*</span></label>
              <input
              id="companyName"
              type="text"
              className="companyName-input"
              placeholder="Company Name"
              name="companyName"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.companyName.length > 0 &&(
                <span className="errorMessage">{formErrors.companyName}</span>
              )}
            </div>
            <div className="NIP">
              <label for="NIP" className="NIP-label">NIP<span class="red-star">*</span></label>
              <input
              type="text"
              className="NIP-input"
              placeholder="NIP"
              name="NIP"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.NIP.length > 0 &&(
                <span className="errorMessage">{formErrors.NIP}</span>
              )}
            </div>

            <div className="email-company">
              <label for="email-company" className="new-email-company-label">Email<span class="red-star">*</span></label>
              <input
              id="email-company"
              type="text"
              className="email-input"
              placeholder="Email"
              name="email"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.email.length > 0 &&(
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="phoneNumber">
              <label for="phoneNumber" className="phoneNumber-label">Phone Number<span class="red-star">*</span></label>
              <input
              id="phoneNumber"
              type="text"
              className="phoneNumber-input"
              placeholder="Phone Number"
              name="phoneNumber"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.phoneNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </div>

            <div className="street">
              <label for="street" className="street-label">Street<span class="red-star">*</span></label>
              <input
              id="street"
              type="text"
              className="street-input"
              placeholder="Street"
              name="street"
              noValidate
              onChange={this.handleChange}
              />
            {formErrors.street.length > 0 &&(
                <span className="errorMessage">{formErrors.street}</span>
              )}
              </div>

            <div className="houseNumber">
            <label for="houseNumber" className="houseNumber-label">House number<span class="red-star">*</span></label>
            <input
              id="houseNumber"
              type="text"
              className="houseNumber-input"
              placeholder="House Number"
              name="houseNumber"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.houseNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.houseNumber}</span>
              )}
              <label for="apartmentNumber" className="apartmentNumber-label">Apartment number</label>
            <input
              id="apartmentNumber"
              type="text"
              className="apartmentNumber-input"
              placeholder="Apartment Number"
              name="apartmentNumber"
              noValidate
              onChange={this.handleChange}
              />
            </div>
              
            <div className="postcode">
              <label for="postcode" className="postcode-label">Postcode<span class="red-star">*</span></label>
              <input
              id="postcode"
              type="text"
              className="postcode-input"
              placeholder="Postcode"
              name="postcode"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.postcode.length > 0 &&(
                <span className="errorMessage">{formErrors.postcode}</span>
              )}
              <label for="city" className="city-label">City<span class="red-star">*</span></label>
              <input
              id="city"
              type="text"
              className="city-input"
              placeholder="City"
              name="city"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.city.length > 0 &&(
                <span className="errorMessage">{formErrors.city}</span>
              )}
              
              <label for="country" className="country-label">Country<span class="red-star">*</span></label>
              <input
              id="country"
              type="text"
              className="country-input"
              placeholder="Country"
              name="country"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.country.length > 0 &&(
                <span className="errorMessage">{formErrors.country}</span>
              )}
            </div>

            <div className="password">
              <label for="password" className="password-label">Password<span class="red-star">*</span></label>
              <input
              id="password"
              type="password"
              className="password-input"
              placeholder="Password"
              name="password"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.password.length > 0 &&(
                <span className="errorMessage">{formErrors.password}</span>
              )}
              <label for="repeatPassword" className="repeatPassword-label">Repeat password<span class="red-star">*</span></label>
              <input
              id="repeatPassword"
              type="password"
              className="repeatPassword-input"
              placeholder="Repeat Password"
              name="repeatPassword"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.repeatPassword.length > 0 &&(
                <span className="errorMessage">{formErrors.repeatPassword}</span>
              )}
            </div>

            <div className="signUp-company">
              <button type="submit" onClick={() => this.postData()}>Sign Up</button>
            </div>

            {this.state.renderAlert && (
              <div className="alert">
                <span className="red-star">FIELDS ARE NOT CORRECTLY FIELD!</span>
              </div>
            )}

            {this.state.renderConfirm && (
              <div className="alert">
                <span className="green-star">Account creacted. Now you can sign in.</span>
              </div>
            )}
            
        </form> 
    </div>
</div>
  );
  }
}

export default CompanyForm;
