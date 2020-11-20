import React, {Component} from 'react'
import Select from 'react-select'


// const parameters = {
//     options: [],
//     placeholder: ''
//   };

class SelectVehicle extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }


    async componentDidMount(){
        var response;
        if (this.props.type === "make") { 
             response = await fetch('http://localhost:8080/getAllCarMakes');
        }
        else if (this.props.type === "model"){
            response = await fetch(`http://localhost:8080/getAllCarModels/${this.props.make_id}`);
        }
        else if ((this.props.type === "generation")){
            response = await fetch(`http://localhost:8080/getAllGenerations/${this.props.model_id}`);
        }
        const data = await response.json();
        console.log(data);
        this.setState({items: data, isLoaded: true})
            // fetch('http://localhost:8080/carMakes/getAllCarMakes')
            //     .then(res => res.json())
            //     .then(
            //         (result) => {
            //             this.setState({
            //                 isLoaded: true,
            //                 items: result
            //             });
            //         },
            //         (error) => {
            //             this.setState({
            //                 isLoaded: true,
            //                 error
            //             });
            //         }
            //     )
            //     console.log(this.state.items);
    }

    async componentDidUpdate(prevProps) {
        // Typowy sposób użycia (nie zapomnij porównać właściwości):
        if (this.props.make_id !== prevProps.make_id){
            var response;
            if(this.props.type === "model"){
                    response = await fetch(`http://localhost:8080/getAllCarModels/${this.props.make_id}`);
                    const data = await response.json();
                    console.log(data);
                    this.setState({items: data, isLoaded: true})
            }
        }
        if(this.props.model_id !== prevProps.model_id){
            if(this.props.type === "generation"){
                response = await fetch(`http://localhost:8080/getAllGenerations/${this.props.model_id}`);
                const data = await response.json();
                console.log(data);
                this.setState({items: data, isLoaded: true})
            }
        }
      }

    handleChange(e){//tutaj if ktory powie nam, ktory komponent jest aktualnie uzywany
        //this.setState({chosenMake: e.target.value});
        if(this.props.type === "make") {
            this.props.onCarMakeChange(e.value);
        }
        else if (this.props.type === "model") {
            this.props.onCarModelChange(e.value);
        }
        else if (this.props.type === "generation"){
            this.props.onGenerationChange(e.value);
        }
    }
    


render(){

    var { items } = this.state;
    let options;
    let placeholder;

    if(this.props.type === "make"){
        placeholder = "Select the make of vehicle";
        options = items.map(function (item) {
            return { value: item.idMake, label: item.name};
        })
    }
    else if(this.props.type ==="model"){
        placeholder = "Select the model of vehicle";
        options = items.map(function (item) {
            return {value: item.idModel, label: item.name};
        })
    }
    else if(this.props.type === "generation") {
        placeholder = "Select the generation of vehicle";
        options = items.map(function (item) {
            var endDate;
            if(item.endDate != null) endDate = item.endDate;
            else endDate = ""; 
            return {value: item.idGeneration, label:"Generaction: "+ item.name +"\xa0\xa0 Years of production: " + item.beginDate +"\t" + endDate };
        })
    }
    
        return(
            <Select
                name={this.props.type} //tutaj podmienimy props.name
                placeholder={placeholder}
               // isDisabled={disabled}
                //value={parameters.options.value}
                onChange={this.handleChange}
                //clearable={this.state.clearable}
                //searchable={this.state.searchable}
                options={options}                  
            />
        )
}


}


export default SelectVehicle;