import React, {Component} from 'react'
import SelectVehicle from '../components/SelectVehicle'
import {Link} from 'react-router-dom';
import '../styles/SelectVehicle.css'

class ChooseVehicle extends Component{

    constructor(props){
        super(props);
        this.handleCarMakeChange = this.handleCarMakeChange.bind(this);
        this.handleCarModelChange = this.handleCarModelChange.bind(this);
        this.handleGenerationChange = this.handleGenerationChange.bind(this);

        this.state = {
            items: [],
            isLoaded: false,
            chosenMake: '',
            chosenModel:'',
            chosenGeneration: '',
            renderModel: false,
            renderGeneration: false,
            renderButton: false
        };
    }

    handleCarMakeChange(chosenMake){
        this.setState({chosenMake: chosenMake, chosenModel: '', chosenGeneration: '', renderModel: true});
    }

    handleCarModelChange(chosenModel){
        this.setState({chosenModel: chosenModel,  chosenGeneration: '', renderGeneration: true});
    }

    handleGenerationChange(chosenGeneration){
        this.setState({chosenGeneration: chosenGeneration, renderButton: true});
    }
    
    handleClick = () =>{

    }


render(){

    const chosenMake = this.state.chosenMake;
    const chosenModel = this.state.chosenModel;
    const chosenGeneration = this.state.chosenGeneration;
    // var { isLoaded, items } = this.state;

    // let options = items.map(function (item) {
    //     return { value: item.name, label: item.name };
    //   })
    if(!this.state.renderModel && !this.state.renderGeneration && !this.state.renderButton){
        return(
            <div className="chooseVehicle-page">
                <h1>Select the mark of vehicle:</h1>
                <div className="chooseVehicle">
                    <div className="selectBar">
                        <label className="selectLabel" for="make">Make of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="make" type="make" onCarMakeChange={this.handleCarMakeChange} chosenMake={chosenMake}/>
                     </div>
                </div>
            
            </div>
        )  
    } 
    else if(this.state.renderModel && !this.state.renderGeneration && !this.state.renderButton){
        return(
            <div className="chooseVehicle-page">
                <h1>Select the mark of vehicle:</h1>
                <div className="chooseVehicle">
                    <div className="selectBar">
                        <label className="selectLabel" for="make">Make of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="make" type="make" onCarMakeChange={this.handleCarMakeChange} chosenMake='' />
                    </div>
                    <div className="selectBar">
                        <label className="selectLabel" for="model">Model of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="model" type="model" make_id={chosenMake} onCarModelChange={this.handleCarModelChange} chosenModel=''/>
                     </div>
                </div>
            
            </div>
        )  
    }
    else if(this.state.renderModel && this.state.renderGeneration && !this.state.renderButton){
        return(
            <div className="chooseVehicle-page">
                <h1>Select the mark of vehicle:</h1>
                <div className="chooseVehicle">
                    <div className="selectBar">
                        <label className="selectLabel" for="make">Make of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="make" type="make" onCarMakeChange={this.handleCarMakeChange} chosenMake='' />
                     </div>
                     <div className="selectBar">
                        <label className="selectLabel" for="model">Model of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="model" type="model" make_id={chosenMake} onCarModelChange={this.handleCarModelChange} chosenModel=''/>
                    </div>
                    <div className="selectBar">
                        <label className="selectLabel" for="generation">Generation of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="generation" type="generation" model_id={chosenModel} onGenerationChange={this.handleGenerationChange} chosenGeneration=''/>
                     </div>
                </div>
            
            </div>
        )  
    }  
    else if(this.state.renderModel && this.state.renderGeneration && this.state.renderButton){
        return(
            <div className="chooseVehicle-page">
                <h1>Select the mark of vehicle:</h1>
                <div className="chooseVehicle">
                    <div className="selectBar">
                        <label className="selectLabel" for="make">Make of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="make" type="make" onCarMakeChange={this.handleCarMakeChange} chosenMake='' />
                    </div>
                    <div className="selectBar">
                        <label className="selectLabel" for="model">Model of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="model" type="model" make_id={chosenMake} onCarModelChange={this.handleCarModelChange} chosenModel=''/>
                    </div>
                    <div className="selectBar">
                        <label className="selectLabel" for="generation">Generation of Vehicle:</label>
                        <SelectVehicle className="selectInput" id="generation" type="generation" model_id={chosenModel} onGenerationChange={this.handleGenerationChange} chosenGeneration=''/>
                    </div>
                    <Link to={`chooseEngine/${chosenModel}/${chosenGeneration}`}>
                        <button className="selectButton" type="submit">Submit</button>
                    </Link>
                </div>
            
            </div>
        )  
    }
}


}


export default ChooseVehicle;