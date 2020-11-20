import React, {Component} from 'react'
import '../styles/SignUp.css'
import ModifyCompanyAccountForm from '../components/ModifyCompanyAccountForm'
import ModifyIndividualAccountForm from '../components/ModifyIndividualAccountForm'



class Settings extends Component{

    state = {
        typeOfAccount: "",
        isLoaded: false
    };


    async componentDidMount(){

        var idClient = localStorage.getItem("user");
        var response = await fetch(`http://localhost:8080/getClientType/${idClient}`);
        const data = await response.text();
        console.log(data);
        this.setState({typeOfAccount: data, isLoaded: true})
         
    }

render(){

    if(!this.state.isLoaded){
        return(<h1>Loading...</h1>)
    }
    else if(this.state.typeOfAccount === "company"){
        return(
            <ModifyCompanyAccountForm />
        )
    }
    else if(this.state.typeOfAccount === "individual"){
        return(
            <ModifyIndividualAccountForm />
        )
    }
    else{
        return(<h1>Something went wrong...</h1>)
    }
}

}


export default Settings;