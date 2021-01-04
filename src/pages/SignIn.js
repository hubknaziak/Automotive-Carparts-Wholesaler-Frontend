import React, {Component}  from 'react';
import {Link} from 'react-router-dom';
import '../styles/SignIn.css';
import { Redirect } from "react-router-dom";


const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val =>{
   if(val.length > 0){valid = false;}
  });

  Object.values(rest).forEach(val => {
    if(val === null ){valid = false; console.log();}
  });

  return valid;
};

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      renderAlert: false,
      login: null,
      password: null,
      messageEnable: true,
      redirect: "",
      responseStatus: 0,
      formErrors: {
        login: "",
        password: ""
      }
    };
  }

   async postData(){

    if(formValid(this.state)){
      this.setState({renderAlert: false});
      console.log(localStorage);
        await fetch('http://localhost:8080/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: `${this.state.login}`,
            password: `${this.state.password}`,
          })
        }).then(response => {
          if(response.status === 401){
            this.setState({messageEnable: false});
          }
          else if(response.status === 200){
            this.setState({messageEnable: true, redirect: "/", responseStatus: 200});
            
          }
          else if(response.status === 205){
            this.setState({messageEnable: true, redirect: "/adminPage", responseStatus: 205});
            //localStorage.setItem('employee', "ADMIN")
          }
        });
        if (this.state.responseStatus === 200){
          var clientId = await fetch(`http://localhost:8080/getAccountByEmail?email=${this.state.login}`);
          const data = await clientId.json();
          localStorage.setItem('user', data.toString() );
          this.props.changeSignButton(true);
          this.props.userLogged(true);
        }
        else if (this.state.responseStatus === 205){
          var employeeiD = await fetch(`http://localhost:8080/getAccountByEmail?email=${this.state.login}`);
          const data = await employeeiD.json();
          localStorage.setItem('employee',  data.toString());
          this.props.changeSignButton(true);
        }
        console.log(localStorage);
    }
    else{
      this.setState({renderAlert: true});
    }
  }

  handleSubmit = e =>{
    e.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();
    const {name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "login":
        if(value.length === 0){
          formErrors.firstName = "This field is required";
        }
        else{
          formErrors.firstName = "";
        }
      break;
      case "password":
        if(value.length === 0){
          formErrors.firstName = "This field is required";
        }
        else{
          formErrors.firstName = "";
        }
      break;
      default: break;
    }

    this.setState({formErrors, [name]: value});
  }

  

render(){
  const {formErrors} = this.state;

  if (this.state.redirect === "/") {
    return <Redirect to={this.state.redirect} />
  }
  else if(this.state.redirect === "/adminPage"){
    return <Redirect to={this.state.redirect} />
  }

    return (
      <div className="sign-in">
        <div className="form-sign-in">
          <h1>Sign In</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="loginSignIn">
              <label for="login" className="label">Login:</label>
              <input
              id="login"
              type="text"
              className="loginInput"
              placeholder="Login"
              name="login"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.login.length > 0 &&(
                <span className="errorMessage">{formErrors.login}</span>
              )}
            </div>
            <div className="passwordSignIn">
              <label for="password" className="label">Password:</label>
              <input
              id="password"
              type="password"
              className="passwordInput"
              placeholder="Password"
              name="password"
              noValidate
              onChange={this.handleChange}
              />
               {formErrors.password.length > 0 &&(
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="signIn">
              <button type="submit"  onClick={() => this.postData()}>Sign In</button>
              <small className="signInAlert" hidden={this.state.messageEnable}>Incorrect email or password</small>
              <hr className="line1"></hr>
            </div>
            <div className="signUp">
              <small>You dont't have an account? </small>
              <Link to="/signUp">
                <button type="button" className="signUpButton" to="/signUp">Sign Up</button>
              </Link>
            </div>

            {this.state.renderAlert && (
              <div className="alert">
                <span className="red-star">FIELDS ARE NOT CORRECTLY FIELD!</span>
              </div>
            )}
              </form> 
        </div>
      </div>
  );
  }
}

export default SignIn;
