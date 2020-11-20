import React, {Component} from 'react';
import Nav from './components/Nav';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './components/Footer'
import {BrowserRouter, Switch, Route} from'react-router-dom';
import ChooseVehicle from './pages/ChooseVehicle';
import ChooseEngine from './pages/ChooseEngine';
import Parts from './pages/Parts';
import PartDetails from './pages/PartDetails'
import Basket from './pages/Basket'
import Settings from './pages/Settings'
import AdminPage from './pages/AdminPage'
import NewPartForm from './components/NewPartsForm' 
import ModifyPartForm from './components/ModifyPartsForm'
import ModifyIndividualAccountForm from './components/ModifyIndividualAccountForm'
import ModifyCompanyAccountForm from './components/ModifyCompanyAccountForm'
import DiscountCodes from './components/DiscountCodes'
import ManageShipment from './components/ManageShipment'


const Home = () => (
    <div>
        <h1>Welcome on our wholesaler website!</h1>
        <h2 className="H2">In our shop you can easily find parts that you need!</h2>
        
        <h2 className="H2">Most popular categories</h2>
        <div className="Buttons">
            <div className="Oils">
                <button type="button">Oils</button>
            </div>
            <div className="Accus">
                <button type="button">Accumulators</button>
            </div>
            <div className="Tools">
                <button type="button">Tools</button>
            </div>
            <div className="Tyres">
                <button type="button">Tyres</button>
            </div>
        </div>

    </div>
);

class App extends Component{

    constructor(props){
        super(props);
        this.handleChangeSignButton = this.handleChangeSignButton.bind(this);
        this.handleUserLogged = this.handleUserLogged.bind(this);
        this.state = {
            changeSignButton: false,
            userLogged: false,
            isLoaded: false,
        };
    }

    handleChangeSignButton(changeSignButton){
        this.setState({changeSignButton: changeSignButton});
    }

    handleUserLogged(userLogged){
        this.setState({userLogged: userLogged});
    }

 render() {
    //const {changeSignButton} = this.state;
        return (
            <BrowserRouter> 
                <div className="App">
                    {/* { changeSignButton === false ?(
                        <Nav changeSignButton={this.state.changeSignButton} />
                    ) :(<Nav changeSignButton={this.state.changeSignButton} />
                    )} */}
                    <Nav changeSignButton={this.state.changeSignButton} handleChangeSignButton={this.handleChangeSignButton} 
                        userLogged={this.state.userLogged} handleUserLogged={this.handleUserLogged} 
                    />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/signIn" component={() => <SignIn changeSignButton={this.handleChangeSignButton} userLogged={this.handleUserLogged}/>}/>
                        <Route path="/signUp" component={SignUp} />
                        <Route path="/chooseVehicle" component={ChooseVehicle} />
                        <Route path="/chooseEngine/:modelId/:generationId" component={ChooseEngine} />
                        <Route path="/parts/:modelId/:idEngine" component={Parts} />
                        <Route path="/partDetails" component={PartDetails} />
                        <Route path="/basket" component={Basket} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/adminPage" component={AdminPage} />
                        <Route path="/newPartForm" component={NewPartForm} />
                        <Route path="/modifyPartForm" component={ModifyPartForm} />
                        <Route path="/modifyIndividualAccountForm" component={ModifyIndividualAccountForm} />
                        <Route path="/modifyCompanyAccountForm" component={ModifyCompanyAccountForm} />
                        <Route path="/manageDiscountCodes" component={DiscountCodes} />
                        <Route path="/manageShipment" component={ManageShipment} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;