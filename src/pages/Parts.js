import React, {Component}  from 'react';
import PartTypeList from '../components/PartTypeList'
import SelectParts from '../components/SelectParts'
import '../styles/Parts.css'

class Parts extends Component{
  constructor(props){
    super(props);
    this.handlePartTypeSelect = this.handlePartTypeSelect.bind(this);

    this.state = {
        items: [],
        isLoaded: false,
        chosenPartType: '',
        renderParts: false
    };
}

handlePartTypeSelect(chosenPartType){
    this.setState({chosenPartType: chosenPartType, renderParts: true});
}



render(){

  const chosenPartType = this.state.chosenPartType;

  if(this.state.renderParts === false){
    return(
        <div className="partType-page">
            <h1>Select part category</h1>
            <PartTypeList className="partType-list" onPartTypeSelect={this.handlePartTypeSelect} chosenPartType={chosenPartType}/>
        
        </div>
    )
  }
  else if(this.state.renderParts === true){
    return(
      <div className="partsPage">
        
        <SelectParts chosenModel = {this.props.match.params.modelId} chosenEngine = {this.props.match.params.idEngine} chosenPartType = {chosenPartType}/>
      </div>
    )
  }  
}
}

export default Parts;
