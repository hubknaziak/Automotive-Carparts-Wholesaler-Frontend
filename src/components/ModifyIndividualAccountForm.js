import React, {Component}  from 'react';
import '../styles/IndividualForm.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

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
        //console.log(data);
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
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: `${this.state.email}`,
            password: `${this.state.password}`,
            //nip: "0"
            })
        });

        await fetch(`http://localhost:8080/updatePersonalData/${idClient}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
            //'Accept': 'application/json',
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

        // await fetch('http://localhost:8080/addClient', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //     //'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //     companyName: "",
        //     nip: "0"
        //     })
        // });

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
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.status === 200){
          //this.setState({messageEnable: false});
          console.log("OK");
        }
        else if(response.status === 500){
            console.log("INTENRAL SEVER ERROR");
        }
    });
}


  handleSubmit = e =>{
    e.preventDefault();

    // if(formValid(this.state.formErrors)){
    //   console.log(`
    //     Login: ${this.state.login}
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
      <div className="individual-form">
        <div className="form-individual">
          <h1>Modify account data</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              {/* <label htmlFor="login">Login</label> */}
              <input
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
            <div className="lastName">
              {/* <label htmlFor="password">Password</label> */}
              <input
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

            <div className="email">
              {/* <label htmlFor="password">Password</label> */}
              <input
              type="text"
              className="email-input"
              placeholder={this.state.email}
              name="email"
              noValidate
              onChange={this.handleChange}
              hidden={this.state.disableEmailAndPassword}
              />
               {formErrors.email.length > 0 &&(
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="phoneNumber">
              {/* <label htmlFor="password">Password</label> */}
              <input
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

            <div className="street">
              {/* <label htmlFor="password">Password</label> */}
              <input
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
            <input
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
            <input
              type="text"
              className="apartmentNumber-input"
              placeholder={this.state.apartmentNumber}
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
              placeholder={this.state.postcode}
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
              placeholder={this.state.city}
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
              placeholder={this.state.country}
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
              hidden={this.state.disableEmailAndPassword}
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
              hidden={this.state.disableEmailAndPassword}
              />
               {formErrors.repeatPassword.length > 0 &&(
                <span className="errorMessage">{formErrors.repeatPassword}</span>
              )}
            </div>

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
