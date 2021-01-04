import React, {Component} from 'react'
import IndividualForm from '../components/IndividualForm'
import CompanyForm from '../components/CompanyForm'
import '../styles/SignUp.css'



class SignUp extends Component{

    state = {
        chosenForm : "individual",
        ischecked: true
    };


render(){
    return(
        <div className="signUp-page">
            <div className="signUp-elements">
            <h1>Select the type of user:</h1>
            <div className="chooseForm">
                <input type="radio" id="individualRadio"  value="individual" checked={this.state.ischecked}
                 onClick={ () => {this.setState({chosenForm: "individual", ischecked: "true"}); document.getElementById("companyRadio").checked=false;}}></input>
                <label for="individualRadio">Individual</label>
            </div>
            <div className="chooseForm">
                <input type="radio" id="companyRadio"  value="company"
                onClick={ () => {this.setState({chosenForm: "company", ischecked: false}); } }></input>
                <label for="company">Company(trader, workshop)</label>
            </div>

            {this.renderSelectedForm(this.state.chosenForm)}
            </div>
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