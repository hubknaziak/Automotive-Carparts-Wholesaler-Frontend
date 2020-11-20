import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Link} from 'react-router-dom';
import '../styles/ChooseEngine.css';

class ChooseEngine extends Component{

    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    async componentDidMount(){
        
        var response = await fetch (`http://localhost:8080/getEnginesFitsToModel/${this.props.match.params.modelId}/${this.props.match.params.generationId}`);
        const data = await response.json();
        console.log(data);
        this.setState({items: data});
    }

    selectEngine(id){
        console.log("id", id);

    }


render(){

    const items = this.state.items;
    const tableSize = items.length;
    const columns = [
        {
            Header: "Name",
            accessor: "name",
            width: 150,
            maxWidth: 150,
            minWidth: 150
        },
        {
            Header: "Code",
            accessor: "code"
        },
        {
            Header: "Fuel",
            accessor: "fuel"
        },
        {
            Header: "Years Of Production",
            accessor: "yearsOfProduction"
        },
        {
            Header: "Capacity",
            accessor: "capacity"
        },
        {
            Header: "Power[kW]",
            accessor: "power"
        },
        {
            Header: "Power[km]",
            accessor: "power",
            Cell: props => {
                var powerInKW = props.original.power;
                var powerInKM = parseInt(powerInKW * 1.36, 10);
                return(
                    
                    <span>{powerInKM}</span>
                
                )
            }
        },
        {
            Header: "Torque[Nm]",
            accessor: "torque"
        },
        {
            Header: "",
            Cell: props => {
                var modelId = this.props.match.params.modelId;
                var idEngine = props.original.idEngine;
                return(
                    //<Link to={`chooseEngine/${chosenModel}/${chosenGeneration}`}>
                    <div>
                        <Link to={`/parts/${modelId}/${idEngine}`}>
                            <button className="buttonEngine" onClick={()=>{this.selectEngine(props.original.idEngine)}}>SELECT</button>
                            {/* <button onClick={()=>{this.selectEngine(props.original.idEngine)}}>SELECT</button> */}
                        </Link>
                    </div>
                )
            }

        }
    ]

    if(tableSize === 0){
        return(
            <h1>Error while connecting to database or no engines for this car model</h1>
        )
    }
    else{
        return(
            <div className="chooseEngine-page">
                <h1>Choose the engine</h1>
                <ReactTable 
                    columns={columns} 
                    data={items}
                    minRows={0}
                    noDataText={"Loading..."}
                    defaultPageSize={50}
                    showPagination={false}
                    pageSize={tableSize}
                    className="reactTable"
                >
                </ReactTable>

            </div>
        )
    }
}


}


export default ChooseEngine;