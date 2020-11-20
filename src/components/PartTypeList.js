import React, {Component} from 'react'
import '../styles/Parts.css'

class PartTypeList extends Component{

    constructor(props){
        super(props);
        this.selectPartType = this.selectPartType.bind(this);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }


    async componentDidMount(){

        var response = await fetch('http://localhost:8080/getPartTypes');
        const data = await response.json();
        console.log(data);
        this.setState({items: data, isLoaded: true})
         
    }

    selectPartType(idPartType){
        this.props.onPartTypeSelect(idPartType); 
    }
    


render(){

    var { items } = this.state;

        return(
            <div className="partType-list">
            <ul className="partType-items">
                {items.map(item => (
                    <li className="partType-item" key={item.idPartType} onClick={()=>{this.selectPartType(item.idPartType)}}>{item.name}</li>
                ))}
                </ul>
            </div>
        )
}


}


export default PartTypeList;