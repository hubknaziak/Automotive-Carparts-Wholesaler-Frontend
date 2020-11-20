import React, {Component} from 'react'
import IndividualForm from '../components/IndividualForm'
import CompanyForm from '../components/CompanyForm'
import '../styles/SignUp.css'



class SignUp extends Component{

    state = {
        chosenForm : ""
    };


render(){
    return(
        <div className="signUp-page">
            <h1>Select the type of user:</h1>
            <div className="chooseForm">
                <input type="radio" id="individualRadio" name="customerType" value="individual"
                 onClick={ () => {this.setState({chosenForm: "individual"}); }}></input>
                <label for="individualRadio">Individual</label>
            </div>
            <div className="chooseForm">
                <input type="radio" id="companyRadio" name="customerType" value="company"
                onClick={ () => {this.setState({chosenForm: "company"}); } }></input>
                <label for="company">Company(trader, workshop)</label>
            </div>

            {this.renderSelectedForm(this.state.chosenForm)}
           
        </div>
    )
}

renderSelectedForm(selectedForm){

    if(selectedForm === "individual") return <IndividualForm />
    else if (selectedForm === "company") return <CompanyForm />
    else return null;
}

}


export default SignUp;