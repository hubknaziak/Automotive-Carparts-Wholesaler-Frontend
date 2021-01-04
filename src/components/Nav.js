import React, { Component } from 'react';
import '../styles/App.css'
import {Link} from 'react-router-dom';
import { Redirect } from "react-router-dom";

const navStyle = {
    color: 'white',
    textDecoration: 'none'
};

class Nav extends Component{
    constructor(){
        super();
        this.handleChangeSignButton = this.handleChangeSignButton.bind(this);
        this.handleUserLogged = this.handleUserLogged.bind(this);
        this.state = {
            showFindParts: false,
            changeSignButton: false,
            userLogged: false,
            redirect: "",
            data: ""
        };
    }

    handleChangeSignButton(changeSignButton){
        this.setState({changeSignButton: changeSignButton});
    }

    handleUserLogged(userLogged){
        this.setState({userLogged: userLogged});
    }

    componentDidUpdate(prevProps){
        if (this.props.changeSignButton !== prevProps.changeSignButton){
            this.setState({changeSignButton: !this.state.changeSignButton});
        }
        if (this.props.userLogged !== prevProps.userLogged){
            this.setState({userLogged: !this.state.userLogged});
        }
    }

    handleKeyUp = e => {
        if(e.keyCode === 13) {this.findParts(e);}
    }

    async findParts(e){
         //console.log(e.target.value);
        var response = await fetch(`http://localhost:8080/getSpecimenPart/${e.target.value}`)
        const data = await response.json();
        console.log(data);
        if(data.length === 0){
            alert("Nie znaleziono czesci!");
        }
        else this.setState({data: data, redirect: "/partDetails"})   
    }

    async logout(){
        await fetch(`http://localhost:8080/logout`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if(response.status === 200){
              //this.setState({messageEnable: false});
              console.log("OK");
            }
        });   
    }

    
render(){

    // if (this.state.redirect !== "") {
    //     return <Redirect  to={{ pathname: this.state.redirect, data: this.state.data }} push={true} />
    // }
    const {redirect, data} = this.state;

    return (
        <nav>
            <Link style={navStyle} to="/">
                <h3 className="navItem" to="/">Automotive Carparts <br></br> Wholesaler</h3>
            </Link>
            <ul className="nav-links">
                <Link style={navStyle} to="/chooseVehicle">
                    <li className="navItem" to="/chooseVehicle">Choose a Vehicle</li>
                </Link>
                
                    <li  className="navItem" onClick={ () => {this.setState({showFindParts: !this.state.showFindParts}); } }>Find Parts</li>
                    {this.showFindParts(this.state.showFindParts)}

               
                {/* <Link style={navStyle} to="/signIn">
                    <li to="/signIn" onClick={() => this.setState({changeSignButton: !this.state.changeSignButton})}>Sign In</li> */}
                    {this.changeSignButton(this.state.changeSignButton)}
                {/* </Link> */}
                {/* <Link style={navStyle} to="/basket">
                    <li to="/basket">Basket</li>
                </Link> */}

                {this.showBasket(this.state.userLogged)}

                {this.showSettings(this.state.changeSignButton)}

            </ul>
            {redirect !== "" &&(
                <Redirect  to={{ pathname: redirect, data: data }} push={true} />
            )}
            {redirect !== "" &&(
                this.setState({redirect: ""})
            )}
        </nav>
    );
}

showBasket(userLogged){
    if((userLogged && this.state.changeSignButton && localStorage.getItem('user')) || (!userLogged && !this.state.changeSignButton && !localStorage.getItem('employee'))){
        return( 
            <Link style={navStyle} to="/basket">
                <li className="navItem" to="/basket">Basket</li>
            </Link> 
        )
    }
    else return null;
}

changeSignButton(changeSignButton){
    if(localStorage.getItem('user') || localStorage.getItem('employee')){
        console.log(localStorage);
        return <li className="navItem" onClick={ ()=> {localStorage.removeItem('user'); localStorage.removeItem('employee'); this.logout();
         this.props.handleChangeSignButton(false); this.props.handleUserLogged(false); this.setState({redirect: "/"})}} >SignOut</li>
    }
  
    else if(!localStorage.getItem('user') || !localStorage.getItem('employee')){
        return(
            <Link style={navStyle} to="/signIn">
                <li className="navItem" to="/signIn">Sign In</li>
            </Link>
        )
    }
}

showSettings(changeSignButton){
    if(localStorage.getItem('user') || localStorage.getItem('employee')){
        return( 
            <Link style={navStyle} to="/settings">
                <li className="navItem">Settings</li>
            </Link>
        )
    }
    else return null;
} 

showFindParts(showFindParts){
    if(showFindParts === true) return  <input className="findParts-input" onKeyUp={this.handleKeyUp} name="findParts" type="text" placeholder="Type and hit enter" />
    else if (showFindParts === false) return ""
    else return null;
    }
}


export default Nav;