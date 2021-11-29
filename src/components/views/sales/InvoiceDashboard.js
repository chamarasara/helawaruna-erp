import React from 'react';
import { Link } from 'react-router-dom'
import SearchInvoice from './SearchInvoice';
import SearchInvoiceByDate from './SearchInvoiceByDate';
import InvoiceSearchResults from './InvoiceSearchResults';
class InvoiceDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <div className="column" style={{ paddingTop: "30px" }}>
                            <Link to={"/sales-dashboard"} className="ui button">Back</Link>
                            <Link to={"/new-invoice"} className="ui blue button">New Invoice</Link>
                        </div>
                        <div className="ui grid" style={{ paddingTop: "30px" }}>
                            <div className="eight wide column">
                                <SearchInvoice />
                            </div>
                            <div className="six wide column">
                                <SearchInvoiceByDate />
                            </div>
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <InvoiceSearchResults />
                    </div>
                </div>
            </div>
        )
    }
}
export default InvoiceDashboard;