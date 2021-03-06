import React from 'react';
import { Link } from 'react-router-dom'
class SalesDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                     
                        <Link to={"/quotation-dashboard"} className="ui blue button">Quotations</Link>
                        <Link to={"/invoice-dashboard"} className="ui blue button">Invoices</Link>
                        <Link to={"/return-invoice-dashboard"} className="ui blue button">Returns</Link>
                    </div>                   
                </div>
            </div>
        )
    }
}
export default SalesDashboard;