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
      try{
        await fetch('http://localhost:8080/addAccount', {
          method: 'POST',
          mode: 'cors',
          headers: {
            //'Accept': 'application/json',
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
            //'Accept': 'application/json',
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
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            companyName: `${this.state.companyName}`,
            nip: parseInt(nip, 10)//`${this.state.NIP}`
          })
        });

      }catch(e){
        console.log(e);
      }
    }
    else{
      alert("Form is not correctly filled")
    }
  }

  handleSubmit = e =>{
    e.preventDefault();

    // if(formValid(this.state)){
    //   console.log(`
    //     FirstName: ${this.state.companyName}
    //     Password: ${this.state.password}
    //   `)
    // }
    // else{
    //   console.error("FORM INVALID");
    // }
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
      // case "apartmentNumber":
      //   if(value.length === 0){
      //     formErrors.apartmentNumber = "This field is required";
      //   }
      //   else{
      //     formErrors.apartmentNumber = "";
      //   }
      // break;
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
              {/* <label htmlFor="login">Login</label> */}
              <input
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
              {/* <label htmlFor="password">Password</label> */}
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
              {/* <label htmlFor="password">Password</label> */}
              <input
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
              {/* <label htmlFor="password">Password</label> */}
              <input
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
              {/* <label htmlFor="password">Password</label> */}
              <input
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
            <input
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
            <input
              type="text"
              className="apartmentNumber-input"
              placeholder="Apartment Number"
              name="apartmentNumber"
              noValidate
              onChange={this.handleChange}
              />
                {/* {formErrors.apartmentNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.apartmentNumber}</span>
              )} */}
            </div>

            <div className="postcode">
              {/* <label htmlFor="password">Password</label> */}
              <input
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
            <input
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
            </div>

            <div className="country">
              {/* <label htmlFor="password">Password</label> */}
              <input
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
              {/* <label htmlFor="password">Password</label> */}
              <input
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
              {/* <label htmlFor="password">Password</label> */}
              <input
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
            
        </form> 
    </div>
</div>
  );
  }
}

export default CompanyForm;
