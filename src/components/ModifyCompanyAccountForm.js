import React, {Component}  from 'react';
import '../styles/ModifyCompanyAccountForm.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val =>{
   if(val.length > 0){valid = false;}
  });

  return valid;
};

class ModifyCompanyAccountForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      disableEmailAndPassword: false,
      companyName: "null",
      NIP: "",
      email: "null",
      phoneNumber: "null",
      street: "null",
      houseNumber: "null",
      apartmentNumber: "",
      postcode: "null",
      city: "null",
      country: "null",
      password: "null",
      repeatPassword: "null",
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

  async componentDidMount(){
    if(!localStorage.getItem("user")){
      var data = this.props.location.data;
      this.setState({phoneNumber: data.personalData.phoneNumber,
          street: data.personalData.street, houseNumber: data.personalData.houseNumber, apartmentNumber: data.personalData.apartmentNumber, 
          postcode: data.personalData.postCode, city: data.personalData.city, country: data.personalData.country, isLoaded: true, disableEmailAndPassword: true})
    }
    else{
      var idClient = localStorage.getItem("user");
      var response = await fetch(`http://localhost:8080/getAccountByClientId/${idClient}`);
      const data = await response.text();
      this.setState({email: data})

      var response2 = await fetch(`http://localhost:8080/getPersonalData/${idClient}`);
      const data2 = await response2.json();

      this.setState({ phoneNumber: data2.phoneNumber, street: data2.street, houseNumber: data2.houseNumber, apartmentNumber: data2.apartmentNumber, 
        postcode: data2.postCode, city: data2.city, country: data2.country, isLoaded: true});
    }
}


  async putData(){

    var idClient = localStorage.getItem('user');

    if(formValid(this.state)){
      try{
        await fetch(`http://localhost:8080/updateAccount/${idClient}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: `${this.state.email}`,
            password: `${this.state.password}`,
          })
        });

        await fetch(`http://localhost:8080/updatePersonalData/${idClient}`, {
          method: 'PUT',
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


      }catch(e){
        console.log(e);
      }
    }
    else{
      alert("Form is not correctly filled")
    }
  }

  async deleteAccount(){

    var idAccount = localStorage.getItem('user');
    await fetch(`http://localhost:8080/disableAccount/${idAccount}`, {
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

  handleSubmit = e =>{
    e.preventDefault();
  };

  handleChange = e => { //sprawdzamy poprawność parametrów
    e.preventDefault();
    const {name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "email":
        if(!emailRegex.test(value)){
          formErrors.email = "Incorrect email address";
        }
        else{
          formErrors.email = "";
        }
      break;
      case "phoneNumber":
        if(value.length < 9 && value.length > 0){
          formErrors.phoneNumber = "Incorrect phone number";
        }
        else{
          formErrors.phoneNumber = "";
        }
      break;
      case "postcode":
        if(value.length !== 6 && value.length > 0){
          formErrors.postcode = "Incorrect postcode";
        }
        else{
          formErrors.postcode = "";
        }
      break;
      case "repeatPassword":
        if(this.state.password !== value){
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
          <h1>Modify account data</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            {!this.state.disableEmailAndPassword &&(
            <div className="email-company">
              <label for="email" className="email-company-label">Email</label>
              <input
              id="email"
              type="text"
              className="email-input"
              placeholder={this.state.email}
              name="email"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.email.length > 0 &&(
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            )}

            <div className="phoneNumber-comp">
              <label for="phoneNumber" className="phoneNumber-comp-label">Phone Number</label>
              <input
              id="phoneNumber"
              type="text"
              className="phoneNumber-input"
              placeholder={this.state.phoneNumber}
              name="phoneNumber"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.phoneNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </div>

            <div className="street-comp">
              <label for="street" className="street-comp-label">Street</label>
              <input
              id="street"
              type="text"
              className="street-input"
              placeholder={this.state.street}
              name="street"
              noValidate
              onChange={this.handleChange}
              />
            {formErrors.street.length > 0 &&(
                <span className="errorMessage">{formErrors.street}</span>
              )}
              </div>
              <div className="houseNumber-comp">
              <label for="houseNumber" className="houseNumber-comp-label">House Number</label>
             <input
             id="houseNumber"
              type="text"
              className="houseNumber-input"
              placeholder={this.state.houseNumber}
              name="houseNumber"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.houseNumber.length > 0 &&(
                <span className="errorMessage">{formErrors.houseNumber}</span>
              )}
              <label for="apartmentNumber" className="apartmentNumber-comp-label">Apartment Number</label>
            <input
            id="apartmentNumber"
              type="text"
              className="apartmentNumber-input"
              placeholder={this.state.apartmentNumber}
              name="apartmentNumber"
              noValidate
              onChange={this.handleChange}
              />
            </div>

            <div className="postcode-comp">
              <label for="postcode" className="postcode-comp-label">Postcode</label>
              <input
              id="postcode"
              type="text"
              className="postcode-input"
              placeholder={this.state.postcode}
              name="postcode"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.postcode.length > 0 &&(
                <span className="errorMessage">{formErrors.postcode}</span>
              )}
              <label for="city" className="city-comp-label">City</label>
            <input
            id="city"
              type="text"
              className="city-input"
              placeholder={this.state.city}
              name="city"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.city.length > 0 &&(
                <span className="errorMessage">{formErrors.city}</span>
              )}
        
              <label for="country" className="country-comp-label">Country</label>
              <input
              id="country"
              type="text"
              className="country-input"
              placeholder={this.state.country}
              name="country"
              noValidate
              onChange={this.handleChange}
              />
                {formErrors.country.length > 0 &&(
                <span className="errorMessage">{formErrors.country}</span>
              )}
            </div>

            {!this.state.disableEmailAndPassword && (
            <div className="password-comp">
              <label for="password" className="password-comp-label">Password</label>
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
              <label for="repeatPassword" className="repeatPassword-comp-label">Repeat Password</label>
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
            )}

            <div className="signUp-company">
              <button type="submit" onClick={() => this.putData()}>Modify Data</button>
            </div>

            <div className="signUp-company">
              <button type="submit" onClick={() => this.deleteAccount()}>Delete Account</button>
            </div>
            
        </form> 
    </div>
</div>
  );
  }
}

export default ModifyCompanyAccountForm;
