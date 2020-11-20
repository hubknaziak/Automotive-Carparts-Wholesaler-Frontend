import React, {Component}  from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../styles/AdminPage.css'

class AdminPage extends Component{
  constructor(props){
    super(props);
    this.state = {
        items: [],
        data: "",
        //dataClient: "",
        //dataPersonalData: "",
        isLoaded: false,
        chosenPartType: '',
        renderModifyAccountIndividual: false,
        renderModifyAccountCompany: false,
        showModifyAccountInput: false
    };
}

handleKeyUp = e => {
    if(e.keyCode === 13) {this.findAccount(e);}
}

async findAccount(e){
    //console.log(e.target.value);
   var response = await fetch(`http://localhost:8080/getClientByEmail?email=${e.target.value}`)
   const data = await response.json();
   console.log(data);
   if(data.length === 0){
       alert("Nie znaleziono konta lub konto należy do pracownika hurtowni!");
   }
   else if(data.type === "individual") this.setState({renderModifyAccountIndividual: true, data: data})
   else if(data.type === "company") this.setState({renderModifyAccountCompany: true, data: data})    
//    var response2 = await fetch(`http://localhost:8080/getPersonalData/${data.idClient}`);
//    const data2 = await response2.json(); 
//    await this.setState({dataClient: data + data2})
//    console.log(this.state.dataClient);
}

changeState(){
    this.setState({renderModifyAccountIndividual: false, renderModifyAccountCompany: false});
}

render(){
  
    return(
        <div className="adminPage">
            <h1>ADMIN OPTIONS</h1>
            <div className="adminOption">
                <Link to="/newPartForm">
                    <button className="adminButton">ADD NEW PARTS</button>
                    {/* <button onClick={()=>{this.selectEngine(props.original.idEngine)}}>SELECT</button> */}
                </Link>
            </div>
            <div className="adminOption">
                 <Link to="/modifyPartForm">
                    <button  className="adminButton">MODIFY PARTS DATA</button>
                    {/* <button onClick={()=>{this.selectEngine(props.original.idEngine)}}>SELECT</button> */}
                </Link> 
            </div>
            <div className="adminOption">
                <Link to="/manageDiscountCodes">
                    <button  className="adminButton">MANAGE DISCOUNT CODES</button>
                </Link>
            </div>
            <div className="adminOption">
                    <button  className="adminButton" onClick={()=>{this.setState({showModifyAccountInput: !this.state.showModifyAccountInput})}}>MODIFY USER ACCOUNTS</button>
                    {this.state.showModifyAccountInput &&(
                        <input
                            type="text"
                            className="modifyAccount-input"
                            placeholder="Type email and hit enter"
                            name="findEmail"
                            noValidate
                            onKeyUp={this.handleKeyUp}
                        />
                    )}
                    {this.state.renderModifyAccountIndividual && (
                        <Redirect  to={{ pathname: "/modifyIndividualAccountForm", data: this.state.data }} push={true} />
                    )}
                    {this.state.renderModifyAccountCompany && (
                        <Redirect  to={{ pathname: "/modifyCompanyAccountForm", data: this.state.data }} push={true} />
                    )}
                    {() => this.changeState}
            </div>
            <div className="adminOption">
                <Link to="/manageShipment">
                    <button  className="adminButton">MANAGE SHIPMENT</button>
                </Link>
            </div>
            
        </div>
    )
    }
}

export default AdminPage;
