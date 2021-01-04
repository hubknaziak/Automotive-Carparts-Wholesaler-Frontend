import React, {Component}  from 'react';
import '../styles/ModifyIndividualAccountForm.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val =>{
   if(val.length > 0){valid = false;}
  });

  return valid;
};

class ModifyIndividualAccountForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoaded: false,
      disableEmailAndPassword: false,
      firstName: "null",
      lastName: "null",
      email: "null",
      phoneNumber: "null",
      street: "null",
      houseNumber: "",
      apartmentNumber: "",
      postcode: "null",
      city: "null",
      country: "null",
      password: "null",
      repeatPassword: "null",
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

  async componentDidMount(){
    if(!localStorage.getItem("user")){
        var data = this.props.location.data;
        this.setState({firstName: data.personalData.firstName, lastName: data.personalData.last_Name, phoneNumber: data.personalData.phoneNumber,
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

        this.setState({firstName: data2.firstName, lastName: data2.lastName, phoneNumber: data2.phoneNumber,
        street: data2.street, houseNumber: data2.houseNumber, apartmentNumber: data2.apartmentNumber, postcode: data2.postcode,
        city: data2.city, country: data2.country, isLoaded: true});
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

        }catch(e){
        console.log(e);
        }
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
        else if(value.length === 0){
            formErrors.email = "";
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

  if(!this.state.isLoaded){
      return(<h1>Loading...</h1>)
  }
  else{
    return (
      <div className="modifyIndividual-form">
        <div className="modifyForm-individual">
          <h1>Modify account data</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="modifyFirstName-ind">
              <label for="firstName" className="modifyFirstName-label-ind">First Name</label>
              <input
              id="firstName"
              type="text"
              className="firstName-input"
              placeholder={this.state.firstName}
              name="firstName"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 &&(
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="modifyLastName-ind">
              <label for="lastName" className="modifyLastName-label-ind">Last Name</label>
              <input
              id="lastName"
              type="text"
              className="lastName-input"
              placeholder={this.state.lastName}
              name="lastName"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.lastName.length > 0 &&(
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
              {!this.state.disableEmailAndPassword && (
            <div className="modifyEmail-ind">
              <label for="email" className="modifyemail-label-ind">Email</label>
              <input
              id="email"
              type="text"
              className="email-ind-input"
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
            <div className="phoneNumber-ind">
              <label for="phoneNumber" className="modifyPhoneNumber-label-ind">Phone Number</label>
              <input
              id="phoneNumber"
              type="number"
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

            <div className="street-ind">
              <label for="street" className="modifyStreet-label-ind">Street</label>
              <input
              id="street"
              type="text"
              className="street-ind-input"
              placeholder={this.state.street}
              name="street"
              noValidate
              onChange={this.handleChange}
              />
              {formErrors.street.length > 0 &&(
                <span className="errorMessage">{formErrors.street}</span>
              )}
              </div>
              <div className="houseNumber-ind">
              <label for="houseNumber" className="modifyHouseNumber-label-ind">House Number</label>
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

              <label for="apartmentNumber" className="modifyApartmentNumber-label-ind">Apartment Number</label>
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

            <div className="postcode-ind">
              <label for="postcode" className="modifyPostcode-label-ind">Postcode</label>
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
              <label for="city" className="modifyCity-label-ind">City</label>
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
        
              <label for="country" className="modifyCountry-label-ind">Country</label>
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
            <div className="password-ind">
              <label for="password" className="modifyPassword-label-ind">Password</label>
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
              <label for="repeatPassword" className="modifyRepeatPassword-label-ind">Repeat Password</label>
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

            <div className="signUp-individual">
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
}

export default ModifyIndividualAccountForm;
