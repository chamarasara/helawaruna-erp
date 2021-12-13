import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchInvoices, fetchCustomer } from "../../../actions"
class InvoiceList extends React.Component {
    componentDidMount() {
        //this.props.fetchInvoices()
    }

    // renderList() {
    //     return this.props.supplier.map(supplier => {
    //         return (

    //         )
    //     })
    // }
    // getCustomerDetails() {
    //     return this.props.invoices.map(invoice => {
    //         this.props.fetchCustomer(invoice.customerId)
    //         return (
    //             <div>
    //                 {}
    //             </div>
    //         )
    //     })
    // }
    // renderProducts() {
    //     return this.props.invoices.map(invoice => {
    //         return invoice.productsList.map(product => {
    //             console.log(product);
    //             return (
    //                 <td>
    //                     {product.productName}
    //                 </td>
    //             )
    //         }

    //         )

    //     })
    // }
    renderList() {
        if (!this.props.invoices) {
            return (
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.invoices.map(invoice => {
            const date = invoice.date;
            const date2 = moment(date).format('DD / MM / YYYY, h:mm: a')
            if (invoice.invoice_state === "enabled") {
                return (
                    <tr key={invoice.id}>
                        <td>
                            {invoice.invoiceNumber}
                        </td>
                        <td>
                            {date2}
                        </td>                       
                        <td>
                            {
                                invoice.searchCustomer.map(customer1 => {
                                    return (
                                        <span key={customer1.id}>{customer1.companyName}</span>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                invoice.searchProducts.map(product => {
                                    return (
                                        <p key={product.id}>{product.productName}</p>
                                    )
                                })
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                invoice.products.map(product => {
                                    return (
                                        <p key={Math.random()}>{product.quantity}</p>
                                    )

                                }
                                )
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                invoice.products.map(product => {
                                    return (
                                        <p key={product.id}>{product.sellingPrice}</p>
                                    )
                                })
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                invoice.products.map(product => {
                                    return (
                                        <p key={Math.random()}>{product.discount}%</p>
                                    )

                                }
                                )
                            }
                        </td>
                        <td>
                            <Link to={`/edit-invoice/${invoice.id}`} className="ui blue button">View</Link>
                        </td>
                    </tr>
                )
            }

        })
    }
    render() {
        if (this.props.invoices.length <= 0) {
            return (
                <div>
                    <p>No Invoices found!</p>
                </div>
            )
        }
        return (
            <div >
                <div >
                    <h4>All Invoices</h4>
                    <table className="ui small blue striped celled table">
                        <thead>
                            <tr>
                                <th>Invoice No</th>
                                <th>Date</th>
                                <th>Company Name</th>
                                <th>Products</th>
                                <th>Quantities</th>
                                <th>Rate</th>
                                <th>Claim</th>
                                <th></th>
                            </tr></thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {
    console.log(state.searchInvoices)
    const invoices = Object.values(state.searchInvoices)
    return { invoices: invoices.reverse() };
}
export default connect(mapToSatate, { fetchInvoices, fetchCustomer })(InvoiceList);