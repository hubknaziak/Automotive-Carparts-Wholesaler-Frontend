import React, {Component} from 'react';
import './styles/App.css'
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

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from './images/img1.jpg'
import image2 from './images/img2.jpg'
import image3 from './images/img3.jpg'

const Home = () => (
    <div className="homePage">
      
        
        <AliceCarousel className="slider" infinite={true} autoPlay autoPlayInterval="3000">
            <img src={image1} alt="" className="sliderimg"/>
            <img src={image2} alt="" className="sliderimg"/>
            <img src={image3} alt="" className="sliderimg"/>
        </AliceCarousel>

        <div className="text-box">
            <h1 className="H1">Welcome on our wholesaler website!</h1>
            <h2 className="H2">In our wholesaler you can easily find parts that you need!</h2>
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
        return (
            <BrowserRouter> 
                <div className="App">
                    <Nav changeSignButton={this.state.changeSignButton} handleChangeSignButton={this.handleChangeSignButton} 
                        userLogged={this.state.userLogged} handleUserLogged={this.handleUserLogged} 
                    />
                    <Switch className="switch">
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