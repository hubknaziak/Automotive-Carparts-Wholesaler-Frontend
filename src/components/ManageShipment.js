import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class ManageShipment extends Component{

    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    async componentDidMount(){
        
        var response = await fetch (`http://localhost:8080/getAllPayments`);
        const data = await response.json();
        console.log(data);
        this.setState({items: data});
    }

    async confirmOrder(paymentId, detailPayments){
        await fetch(`http://localhost:8080/confirmOrder/${paymentId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        // detailPayments.forEach(detailPayment => {
        //     fetch(`http://localhost:8080/confirmOrder/${paymentId}`, {
        //     method: 'PUT',
        //     mode: 'cors',
        //     headers: {
        //         //'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
        // });

        
        // await fetch(`http://localhost:8080/confirmOrder/${paymentId}`, {
        //     method: 'PUT',
        //     mode: 'cors',
        //     headers: {
        //         //'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
    }


    async deletePayment(paymentId){
        //console.log(e.target.value);
        await fetch(`http://localhost:8080/deletePayment?idPayment=${paymentId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.status === 200){
              //this.setState({messageEnable: false});
              console.log("OK");
            }
            else if(response.status === 500){
                console.log("INTENRAL SEVER ERROR");
            }
        });
    }

render(){

    const items = this.state.items;
    const tableSize = items.length;
    const columns = [
        {
            Header: "ID Payment",
            accessor: "idPayment",
            width: 150,
            maxWidth: 150,
            minWidth: 150
        },
        {
            Header: "Parts OE",
            //accessor: 'detailPayments',
            Cell: row => {
                return (
                  <div>
                    {items.map(item => (
                      <div key={item.idPayment}>
                        <div> 
                            {item.detailPayments.map(detailPayment => (
                            <div key={detailPayment.idDetailPayment}>
                                <span>{detailPayment.specimenPart.oe}</span>
                                <br></br>
                            </div>
                        ))}
                        </div>
                        
                    </div>
                  ))}
                    {/* //<span className="class-for-description">{row.row.product.description}</span> */}
                  </div>
                )
              }
        },
        {
            Header: "Payment Method",
            accessor: "paymentMethod"
        },
        {
            Header: "Payment Status",
            accessor: "paymentStatus"
        },
        {
            Header: "Order Status",
            accessor: "status"
        },
        {
            Header: "Total cost",
            accessor: "totalCost"
        },
        {
            Header: "",
            Cell: props => {
                var paymentId = props.original.idPayment;
                return(
                    <button onClick={()=>{this.confirmOrder(paymentId)}}>CONFIRM</button>
                )
            }

        },
        {
            Header: "",
            Cell: props => {
                var paymentId = props.original.idPayment;
                var detailPayments = props.original.detailPayments;
                return(
                    <button onClick={()=>{this.deletePayment(paymentId, detailPayments)}}>DELETE</button>
                )
            }

        }
    ]

    if(tableSize === 0){
        return(
            <h1>Error while connecting to database or there are no payments to manage</h1>
        )
    }
    else{
        return(
            <div>
                <h1>SHIPMENT MENAGMENT</h1>
                <ReactTable 
                    columns={columns} 
                    data={items}
                    minRows={0}
                    noDataText={"Loading..."}
                    defaultPageSize={50}
                    showPagination={false}
                    pageSize={tableSize}
                >
                </ReactTable>

            </div>
        )
    }
}


}


export default ManageShipment;