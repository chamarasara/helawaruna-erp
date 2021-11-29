import React from 'react';
import { Tab } from 'semantic-ui-react'
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import NewDispatchNote from "./dispatchNotes/NewDispatchNote";
import { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice, printReturnInvoice, fetchReturnInvoice, printDispatchNote } from '../../../actions';

class EditInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchInvoice(this.props.match.params.id)
        this.props.fetchReturnInvoice(this.props.match.params.id)
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    renderCustomers() {
        return this.props.customers.map(customer => {
            return (
                <option key={customer._id} value={customer.id}>{customer.customerName}</option>
            )
        })
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    getTotal() {
        let quantities = this.props.invoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.invoice.products.map(product => {
            return product.discount
        })
        let rates = this.props.invoice.products.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []

        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]
            totalValue[i] = (quantity * rate) / 100 * (100 - discount);

        }
        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    getDiscountValue() {
        let quantities = this.props.invoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.invoice.products.map(product => {
            return product.discount
        })

        let rates = this.props.invoice.products.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []

        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]

            totalValue[i] = (quantity * rate) / 100 * (discount);


        }

        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    getReturnsTotal() {
        let quantities = this.props.returnInvoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.returnInvoice.products.map(product => {
            return product.discount
        })

        let rates = this.props.returnInvoice.products.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []

        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]

            totalValue[i] = (quantity * rate) / 100 * (100 - discount);


        }
        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    getSubTotal() {
        if (!this.props.invoice.products) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        let quantities = this.props.invoice.products.map(product => {
            return product
        })
        let rates = this.props.invoice.products.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);
            console.log(totalValue.reduce((a, b) => a + b, 0))
            //return totalValue
        }

        return this.formatNumber(totalValue.reduce((a, b) => a + b, 0).toFixed(2))
    }
    getAdditionalChargesTotal() {
        const array = []
        const totalArray = this.props.invoice.additionalCharges.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            console.log(amount)
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return sumOfArray
    }
    getSubTotalWithTransportCost() {
        if (!this.props.invoice.products) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        let quantities = this.props.invoice.products.map(product => {
            return product
        })
        let rates = this.props.invoice.products.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);            
        }
        const total = totalValue.reduce((a, b) => a + b, 0)
        const subtotal = total + this.getAdditionalChargesTotal()
        return this.formatNumber(subtotal.toFixed(2))
    }
    getReturnsSubTotal() {
        if (!this.props.returnInvoice) {
            return (0)
        }
        let quantities = this.props.returnInvoice.products.map(product => {
            return product
        })
        let rates = this.props.returnInvoice.products.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length, rates.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);
            //console.log(totalValue.reduce((a, b) => a + b, 0))
            //return totalValue
        }

        return this.formatNumber(totalValue.reduce((a, b) => a + b, 0).toFixed(2))
    }

    renderInvoiceDetails() {
        return (
            <tr>
                <td>
                    {this.props.invoice.productsDetails.map(product => {
                        return (
                            <p key={Math.random()}>FG{product.productCode}</p>
                        )
                    })
                    }
                </td>
                <td>
                    {this.props.invoice.productsDetails.map(product => {
                        return (
                            <p key={Math.random()}>{product.productName}</p>
                        )
                    })
                    }
                </td>
                <td>
                    {this.props.invoice.productsDetails.map(product => {
                        return (
                            <p key={Math.random()}>{product.baseUnitMeasure}</p>
                        )
                    })
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {
                        this.props.invoice.products.map(quantity => {
                            //console.log(quantity)
                            return (
                                <p key={Math.random()}>{quantity.quantity}</p>
                            )
                        }
                        )
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {
                        this.props.invoice.products.map(rate => {
                            //console.log(rate)
                            return (
                                <p key={Math.random()}>{rate.sellingPrice}</p>
                            )
                        }
                        )
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {
                        this.props.invoice.products.map(discount => {
                            return (
                                <p key={Math.random()}>{discount.discount}%</p>
                            )
                        }
                        )
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {this.getDiscountValue()}
                </td>
                <td style={{ textAlign: "right" }}>
                    {
                        this.props.invoice.products.map(currency => {
                            return (
                                <p key={Math.random()}>{currency.currency}</p>
                            )
                        }
                        )
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {this.getTotal()}
                </td>
            </tr>
        )

    }
    renderDispatchTables() {
        if (!this.props.invoice.dispatchNotes) {
            return (
                <div>
                    <p style={{ textAlign: "center" }}>No Dispatch Notes Found</p>
                </div>
            )
        }
        return this.props.invoice.dispatchNotes.map(dispatchNote => {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="4">
                                <tr><h4 style={{ color: "red" }}>Dispatch Note</h4></tr>
                                <tr><p>Date-{moment(dispatchNote.date).format('DD MM YYYY, h:mm A')}</p></tr>
                                <tr><p>Remarks-{dispatchNote.remarks}</p></tr>
                            </th>
                        </tr>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th style={{ textAlign: "right" }}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.invoice.productsDetails.map(product => {
                                    return (
                                        <p key={product.id}>FG{product.productCode}</p>
                                    )
                                })
                                }
                            </td>
                            <td>
                                {this.props.invoice.productsDetails.map(product => {
                                    return (
                                        <p key={product.id}>{product.productName}</p>
                                    )
                                })
                                }
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {
                                    dispatchNote.data.map(data => {
                                        return (
                                            <p key={Math.random()}>{data.quantity}</p>
                                        )
                                    }
                                    )

                                }
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr colSpan="12">
                            <th colSpan="7" style={{ textAlign: "right" }}><button type="button" onClick={() => this.printDispatchNote(dispatchNote.dispatchId)} className="ui primary button">Print</button></th>
                        </tr>
                    </tfoot>
                </table>
            )
        })

    }
    getTotalDispatchedQuantities() {
        const dispatchNotes = this.props.invoice.dispatchNotes
        const dataArray = dispatchNotes.map(data => {
            return data.data.map(data => {
                return data
            })
        })
        console.log(dataArray)
    }
    renderButtons() {
        if (!this.props.returnInvoice) {
            return (
                <div>
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/new-return-invoice/${this.props.match.params.id}`} type="button" className="ui primary button">Returns</Link>
                    <Link to={`/delete-invoice/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                    {this.getTotalDispatchedQuantities()}
                </div>
            )
        } else {
            return (
                <div>
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/delete-invoice/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        }
    }
    renderReturnInvoiceDetails() {
        if (!this.props.returnInvoice) {
            return (
                <div className="">
                    <p>No Returns Found</p>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                        <thead className="full-width">
                            <tr>
                                <th colSpan="12" style={{ color: "red" }}><h4>Return Invoice Details</h4></th>
                            </tr>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>UOM</th>
                                <th style={{ textAlign: "right" }}>Quantity</th>
                                <th style={{ textAlign: "right" }}>Rate</th>
                                <th style={{ textAlign: "right" }}>Discount</th>
                                <th style={{ textAlign: "right" }}>Currency</th>
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>FG{product.productCode}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.productName}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.baseUnitMeasure}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.returnInvoice.products.map(quantity => {
                                            return (
                                                <p key={Math.random()}>{quantity.quantity}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.props.returnInvoice.products.map(product => {
                                        return (
                                            <p key={product.id}>{product.sellingPrice}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.returnInvoice.products.map(discount => {
                                            return (
                                                <p key={Math.random()}>{discount.discount}%</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.returnInvoice.products.map(currency => {
                                            return (
                                                <p key={Math.random()}>{currency.currency}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.getReturnsTotal()}
                                </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr colSpan="16">
                                <th colSpan="7" style={{ textAlign: "right" }}>Sub Total:</th>
                                <th colSpan="8" style={{ textAlign: "right" }}>{this.getReturnsSubTotal()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div style={{ paddingTop: "10px" }}>
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClickReturnInvoice} className="ui primary button">Print</button>
                </div>
            </div>
        )

    }
    renderCustomerDetails() {
        return (
            <div style={{ paddingBottom: "30px" }} className="ui one column doubling stackable grid container">
                <div>
                    <div className="ui list">
                        <div className="item">
                            <strong>Quotation Number:</strong>{this.props.invoice.quotation.map(quotation => {
                                return (
                                    <span key={quotation.id}>{quotation.quotationNumber}</span>
                                )
                            })}
                        </div>
                        <div className="item">
                            <strong>Company Name:</strong>{this.props.invoice.customer.map(customer => {
                                return (
                                    <span key={customer.id}>{customer.companyName}</span>
                                )
                            })
                            }
                        </div>
                        <div className="item">
                            <strong>Remarks:</strong>{this.props.invoice.remarks}
                        </div>
                        <div className="item">
                            <strong>Customer Reference: </strong>{this.props.invoice.reference}
                        </div>
                        <div className="item">
                            <strong>Address:</strong> {this.props.invoice.customer.map(customer => {
                                return (
                                    <span key={customer.id}>
                                        {customer.communicationAddress.no},
                                        {customer.communicationAddress.lane},
                                        {customer.communicationAddress.city},
                                        {customer.communicationAddress.country},
                                        {customer.communicationAddress.postalCode}.
                                    </span>
                                )
                            })
                            }
                        </div>
                        <div className="item">
                            <strong>Email: </strong>{this.props.invoice.customer.map(customer => {
                                return (
                                    <span key={customer.id}>{customer.email} </span>
                                )
                            })
                            }
                            <strong>Contact Number: </strong>{this.props.invoice.customer.map(customer => {
                                return (
                                    <span key={customer.id}> {customer.mobileNo}</span>
                                )
                            })
                            }
                        </div>

                        <div className="item">

                        </div>
                        <div className="item">
                            <strong>Date: </strong>{moment(this.props.invoice.date).format('DD/MM/YYYY')} <strong>Created by :</strong> {this.props.invoice.userName}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    renderCashPaymentsFields = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((cashPayments, index) => <li key={index}>
                        <label htmlFor={cashPayments}>Cash Payment #{index + 1}</label>
                        <div className="fields">
                            <div className="five wide field">
                                <Field name={`${cashPayments}.cashAmount`} type="number" required component="input" placeholder="Cash Amount" >
                                </Field>
                            </div>
                            <div className="five wide field">
                                <Field name={`${cashPayments}.remarks`} type="text" required component="input" placeholder="Remarks" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <button className="mini ui red button" type="button" onClick={() => window.location.reload()}>Cancel</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Cash Payment</button>
            </div>
        )
    }
    renderChequePaymentsFields = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((chequePayments, index) => <li key={index}>
                        <label htmlFor={chequePayments}>Cheque Payment #{index + 1}</label>
                        <div className="fields">
                            <div className="six wide field">
                                <Field name={`${chequePayments}.chequeAmount`} type="number" required component="input" placeholder="Cheque Amount" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${chequePayments}.chequeNumber`} type="text" required component="input" placeholder="Cheque Number" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${chequePayments}.bankName`} type="text" required component="input" placeholder="Bank Name" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${chequePayments}.chequeDate`} type="date" required component="input" placeholder="Cheque Date" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <button className="mini ui red button" type="button" onClick={() => window.location.reload()}>Cancel</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Cheque Payment</button>
                    </li>
                </ul>

            </div>
        )
    }
    renderPaymentsFields = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((payments, index) => <li key={index}>
                        <label htmlFor={payments}>Payment #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <FieldArray name={`${payments}.cashPayments`} component={this.renderCashPaymentsFields} />
                            </div>
                            <div className="ten wide field">
                                <FieldArray name={`${payments}.chequePayments`} component={this.renderChequePaymentsFields} />
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Payment</button>
            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.editInvoice(this.props.invoice._id, formValues)
    }
    renderPaymentsForm = () => {
        return (
            <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="fields">
                    <div className="sixteen wide field">
                        <label>Pay- </label>
                        <FieldArray name="paymentsAll" component={this.renderPaymentsFields} />
                    </div>
                </div>
                <div className="field">
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="submit" className="ui primary button">Submit</button>
                </div>
            </form>
        )
    }

    renderPaidCashAmount() {
        let totalCash = this.props.invoice.paymentsAll.map(cash => {
            if (!cash.cashPayments) {
                return (
                    <tr key={Math.random()}>
                        <td colSpan="3">
                            -
                        </td>
                        <td colSpan="1">
                            -
                        </td>
                    </tr>
                )
            }
            return cash.cashPayments.map(ca => {
                return (
                    <tr key={Math.random()}>
                        <td colSpan="3">
                            {ca.remarks}
                        </td>
                        <td colSpan="1">
                            {ca.cashAmount}
                        </td>
                    </tr>
                )
            })
        })
        return totalCash
    }
    totalPaidCash() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let amount = this.props.invoice.paymentsAll.map(cash => {
            return cash.cashPayments.map(amount => {
                var convAmount = parseInt(amount.cashAmount)
                return convAmount
            })
        })
        const sum = 0
        for (let i = 0; i < amount.length; i++) {
            sum += amount[i];
        }
        return (
            <span key={Math.random()}>{this.formatNumber(amount.reduce((a, b) => a + b, 0))}</span>
        )
    }
    renderPaidBankAmount() {
        let totalCash = this.props.invoice.paymentsAll.map(cheque => {
            if (!cheque.chequePayments) {
                return (
                    <tr key={Math.random()}>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                    </tr>
                )
            }
            return cheque.chequePayments.map(ca => {
                return (
                    <tr key={Math.random()}>
                        <td>
                            {ca.bankName}
                        </td>
                        <td>
                            {ca.chequeNumber}
                        </td>
                        <td>
                            {ca.chequeDate}
                        </td>
                        <td>
                            {ca.chequeAmount}
                        </td>
                    </tr>
                )
            })
        })
        console.log(typeof (totalCash))
        console.log(totalCash)
        return totalCash
    }
    totalPaidCheque() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let amount = this.props.invoice.paymentsAll.map(cash => {
            return cash.chequePayments.map(amount => {
                var convAmount = parseInt(amount.chequeAmount)
                return convAmount
            })
        })
        const sum = 0
        for (let i = 0; i < amount.length; i++) {
            sum += amount[i];
        }
        return (
            <span key={Math.random()}>{this.formatNumber(amount.reduce((a, b) => a + b, 0))}</span>
        )
    }
    renderPayments = () => {
        console.log(parseInt(this.getSubTotal()) - parseInt(this.getReturnsSubTotal()))
        console.log(this.getSubTotal())
        return (
            <div>
                <h4 style={{ paddingTop: "20px" }}>Payments: </h4>
                <p><b>Total value:</b> {this.getSubTotal()}</p>
                <p><b>Total returns:</b> {this.getReturnsSubTotal()}</p>
                <div>
                    <table className="ui small blue striped celled table">
                        <thead>
                            <tr>
                                <th colSpan="4">Cheque Payments</th>
                            </tr>
                            <tr>
                                <th>Bank Name</th>
                                <th>Cheque Number</th>
                                <th>Cheque Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPaidBankAmount()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="ui  structured celled table">
                        <thead>
                            <tr>
                                <th colSpan="4">Cash Payments</th>
                            </tr>
                            <tr>
                                <th colSpan="3">Remarks</th>
                                <th colSpan="1">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPaidCashAmount()}
                        </tbody>
                    </table>
                </div>
                {this.renderPaymentsForm()}
            </div>
        )
    }
    renderTransportCost() {
        if (!this.props.invoice.transportCost) {
            return 0
        } else {
            return this.props.invoice.transportCost
        }
    }
    renderAdditionalCharges() {
        if (!this.props.invoice.additionalCharges) {
            return (
                <tr colSpan="9">
                    <th colSpan="8" style={{ textAlign: "left" }}><span style={{ color: "#2185d0" }}>(+)</span> Additional Charges</th>
                    <th colSpan="1" style={{ textAlign: "right" }}>0.00</th>
                </tr>
            )
        }
        return this.props.invoice.additionalCharges.map(data => {
            console.log(data)
            let amount = Number(data.amount)
            return (
                <tr colSpan="9">
                    <th colSpan="8" style={{ textAlign: "right" }}><span style={{ color: "#2185d0" }}>(+)</span> {data.reason}</th>
                    <th colSpan="1" style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</th>
                </tr>
            )
        })
    }
    onClick = () => {
        this.props.printInvoice(this.props.invoice.id)
    }
    onClickReturnInvoice = () => {
        this.props.printReturnInvoice(this.props.returnInvoice.id)
    }
    printDispatchNote = (dispatchId) => {
        this.props.printDispatchNote(this.props.invoice.id, dispatchId)
    }

    render() {
        if (!this.props.invoice) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}></div>
                    <div className="ui active centered inline loader"></div>
                </div>
            )
        }

        const panes = [
            {
                menuItem: 'Invoice Details', render: () => <Tab.Pane attached={false}>
                    <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                        <thead className="full-width">
                            <tr>
                                <th colSpan="12" style={{ color: "red" }}><h4>Invoice Details</h4></th>
                            </tr>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>UOM</th>
                                <th style={{ textAlign: "right" }}>Quantity</th>
                                <th style={{ textAlign: "right" }}>Rate</th>
                                <th style={{ textAlign: "right" }}>Discount (%)</th>
                                <th style={{ textAlign: "right" }}>Discount Amount</th>
                                <th style={{ textAlign: "right" }}>Currency</th>
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderInvoiceDetails()}
                        </tbody>
                        <tfoot>
                            <tr colSpan="9">
                                <th colSpan="8" style={{ textAlign: "right" }}></th>
                                <th colSpan="1" style={{ textAlign: "right" }}>{this.getSubTotal()}</th>
                            </tr>
                            {this.renderAdditionalCharges()}
                            <tr colSpan="9">
                                <th colSpan="8" style={{ textAlign: "right" }}>Subtotal:</th>
                                <th colSpan="1" style={{ textAlign: "right" }}>{this.getSubTotalWithTransportCost()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </Tab.Pane>
            },
            { menuItem: 'Returns Details', render: () => <Tab.Pane attached={false}>{this.renderReturnInvoiceDetails()}</Tab.Pane> },
            {
                menuItem: 'Dispatch Details', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <NewDispatchNote data={this.props.invoice} />
                            <div style={{ paddingTop: "50px" }}>
                                {this.renderDispatchTables()}
                            </div>
                        </div>
                    </Tab.Pane>
            },
            { menuItem: 'Payments Details', render: () => <Tab.Pane attached={false}>{this.renderPayments()}</Tab.Pane> },
        ]
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <h3>Invoice #{this.props.invoice.invoiceNumber}</h3>
                    {this.renderCustomerDetails()}
                    <Tab style={{ paddingBottom: "20px" }} menu={{ pointing: true }} panes={panes} />
                    <div>
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const invoice = state.invoices[ownProps.match.params.id]
    const returnInvoice = state.returnInvoices[ownProps.match.params.id]
    return { errorMessage: state, customers: customers, invoice: invoice, initialValues: invoice, returnInvoice };
}
const formWrapped = reduxForm({
    form: 'invoicePayments'
})(EditInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice, printReturnInvoice, printDispatchNote, fetchReturnInvoice })(formWrapped);