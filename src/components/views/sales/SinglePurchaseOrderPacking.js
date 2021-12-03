import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Tab } from 'semantic-ui-react'
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewCashPaymentFormPacking from '../purchaseorders/NewCashPaymentFormPacking';
import NewBankPaymentFormPacking from '../purchaseorders/NewBankPaymentFormPacking';
import NewAdditionalBankPaymentFormPacking from '../purchaseorders/NewAdditionalBankPaymentFormPacking';
import NewAdditionalCashPaymentFormPacking from '../purchaseorders/NewAdditionalCashPaymentFormPacking';
import { fetchPurchaseOrderPacking, printPurchaseOrderPacking, fetchSuppliers, fetchPackingMaterials, grnPurchaseOrderPacking } from '../../../actions';

class SinglePurchaseOrderPacking extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderPacking(this.props.match.params.id)
        this.props.fetchSuppliers()
        this.props.fetchPackingMaterials()
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    rendeSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
    }
    printGrn(id) {
        this.prop(id)
    }
    renderAllGrn() {
        if (!this.props.order.grnDetails) {
            return (
                <div style={{ paddingBottom: "15px", paddingTop: "15px", paddingLeft: "0px" }}>
                    <h4>No any GRN found</h4>
                </div>
            )
        }
        return this.props.order.grnDetails.map(data => {
            console.log(data.additionalCharges)
            let additionalCharges = <tr colSpan="16">
                <th colSpan="5" style={{ textAlign: "right" }}><span style={{ color: "#2185d0" }}>(+)</span> Additional Charges</th>
                <th colSpan="8" style={{ textAlign: "right" }}>0.00</th>
            </tr>
            if (data.additionalCharges) {
                additionalCharges = data.additionalCharges.map(expenses => {

                    const amount = Number(expenses.amount)
                    return (
                        <tr colSpan="16">
                            <th colSpan="5" style={{ textAlign: "right" }}><span style={{ color: "#2185d0" }}>(+)</span> {expenses.reason}</th>
                            <th colSpan="8" style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</th>
                        </tr>
                    )
                })
            }

            const additionalChargeArray = []
            let totalAdditionalCharges = [0.00]
            if (data.additionalCharges) {
                totalAdditionalCharges = data.additionalCharges.map(data => {
                    let total = Number(data.amount)
                    for (let i = 0; i < additionalChargeArray.length; i++) {
                        additionalChargeArray[i] = total
                    }
                    return total
                })
            }
            const sumOfAdditionalCharges = totalAdditionalCharges.reduce((partial_sum, a) => partial_sum + a, 0)

            const array = []
            const totalArray = data.data.map(data => {
                console.log(data)
                let total = Number(data.unitPrice) * Number(data.quantity)
                for (let i = 0; i < array.length; i++) {
                    array[i] = total
                }
                return total
            })
            const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
            const grandTotal = Number(sumOfArray) + Number(sumOfAdditionalCharges)
            const formattedSumOfArray = this.formatNumber(sumOfArray.toFixed(2))

            return (
                <table key={Math.random()} className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="8">
                                <tr><h4 style={{ color: "red" }}>{data.grnNumber}</h4></tr>
                                <tr><p>Date-{moment(data.date).format('MM/DD/YYYY, h:mm A')}</p></tr>
                                <tr><p>Invoice Number-{data.invoiceNumber}</p></tr>
                                <tr><p>Invoice Date-{data.invoiceDate}</p></tr>
                                <tr><p>Remarks-{data.remarks}</p></tr>
                            </th>
                        </tr>
                        <tr>
                            <th>Material Code</th>
                            <th>Material Name</th>
                            <th>Unit of Measure</th>
                            <th style={{ textAlign: "right" }}>Unit Price</th>
                            <th style={{ textAlign: "right" }}>Quantity</th>
                            <th style={{ textAlign: "right" }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.order.packingMaterialsList.map(data => {
                                    return (
                                        <p key={data.id}>PM{data.materialCodePm}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {this.props.order.packingMaterialsList.map(data => {
                                    return (
                                        <p key={data.id}>{data.materialName}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {data.data.map(data => {
                                    return (
                                        <p key={Math.random()}>{data.uom}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {data.data.map(data => {
                                    const price = data.unitPrice
                                    return (
                                        <p key={Math.random()}>{price}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {data.data.map(data => {
                                    return (
                                        <p key={Math.random()}>{data.quantity}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {data.data.map(data => {
                                    const price = Number(data.unitPrice)
                                    const quantity = data.quantity
                                    const total = Number(price) * Number(quantity)
                                    return (
                                        <p key={Math.random()}>{this.formatNumber(total.toFixed(2))}</p>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr colSpan="16">
                            <th colSpan="5" style={{ textAlign: "right", color: "#000" }}><strong>Subtotal</strong></th>
                            <th colSpan="8" style={{ textAlign: "right", color: "#000" }}><strong>{formattedSumOfArray}</strong></th>
                        </tr>
                        {additionalCharges}
                        <tr colSpan="16">
                            <th colSpan="5" style={{ textAlign: "right", color: "red" }}><strong>Grand Total</strong></th>
                            <th colSpan="8" style={{ textAlign: "right", color: "red" }}><strong>{this.formatNumber(grandTotal.toFixed(2))}</strong></th>
                        </tr>
                    </tfoot>
                </table>
            )
        })
    }
    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
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
            console.log(this.props)
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    renderSelectField = ({ input, label, type, meta, children }) => (
        <div>
            <label>{label}</label>
            <div>
                <select {...input}>
                    {children}
                </select>
                {this.renderError(meta)}
            </div>
        </div>
    )
    renderSuccessMessage() {
        if (this.props.sucessMessege[1] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }


    renderPurchaseOrederDetails() {
        return (
            <tr>
                <td>
                    {this.props.order.packingMaterialsList.map(material => {
                        return (
                            <p key={material.id}>PM{material.materialCodePm}</p>
                        )
                    })
                    }
                </td>
                <td> {this.props.order.packingMaterialsList.map(material => {
                    return (
                        <p key={material.id}>{material.materialName}</p>
                    )
                })
                }</td>
                <td> {this.props.order.packingMaterials.map(material => {
                    return (
                        <p key={material.id}>{material.uom}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.order.packingMaterials.map(material => {
                    return (
                        <p key={material.id}>{material.quantity}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.order.packingMaterials.map(material => {
                    const price = Number(material.unitPrice)
                    return (
                        <p key={material.id}>{this.formatNumber(price.toFixed(2))}</p>
                    )
                })
                }
                </td>
                <td style={{ textAlign: "right" }}> {this.props.order.packingMaterials.map(material => {
                    const total = Number(material.unitPrice) * Number(material.quantity)
                    return (
                        <p key={material.id}>{this.formatNumber(total.toFixed(2))}</p>
                    )
                })
                }
                </td>
            </tr>
        )

    }
    getSubTotal() {

        const orderDetails = this.props.order.packingMaterials
        let getTotal = orderDetails.map(data => {
            let totalValue = Number(data.unitPrice) * Number(data.quantity)
            let total = totalValue
            return total
        })

        let sum = []
        for (let i = 0; i < Math.min(getTotal.length); i++) {
            let total = Number(getTotal[i])
            sum[i] = total
        }
        const totalSum = sum.reduce((a, b) => a + b, 0)
        return this.formatNumber(totalSum.toFixed(2))

    }
    renderSupplierDetails() {
        console.log(this.props.order.supplier)
        return (
            <div>
                <p><strong>Company Name:</strong>{this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>{Supplier.companyName}</span>
                    )
                })
                }</p>
                <p><strong>Address:</strong> {this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>
                            {Supplier.communicationAddress.no},
                            {Supplier.communicationAddress.lane},
                            {Supplier.communicationAddress.city},
                            {Supplier.communicationAddress.country},
                            {Supplier.communicationAddress.postalCode}.
                        </span>
                    )
                })
                }</p>
                <p><strong>Email: </strong>{this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>{Supplier.email}</span>
                    )
                })
                }</p>
                <p><strong>Contact Number: </strong>{this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>{Supplier.mobileNo}</span>
                    )
                })
                }</p>
                <p>
                    <strong>Date: </strong>{moment(this.props.order.date).format('DD/MM/YYYY')}
                </p>
                <p>
                    <strong>Order State:</strong> {this.props.order.order_state}
                </p>
                <p>
                    <strong>Created By:</strong> {this.props.order.userName}
                </p>
                <p>
                    <strong>Supplier Reference:</strong> {this.props.order.reference}
                </p>
                <p>
                    <strong>Terms & Conditions:</strong> {this.props.order.conditions}
                </p>
            </div>
        )

    }
    renderAdditionalChargesDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((additionalCharges, index) => <li key={index}>
                        <label htmlFor={additionalCharges}>Expense #{index + 1}</label>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name={`${additionalCharges}.reason`} type="text" required component={this.renderSelectField} placeholder="Expense Name" >
                                    <option>-Select Expnese-</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Sea Freight">Sea Freight</option>
                                    <option value="Air Freight">Air Freight</option>
                                    <option value="Custom Duty">Custom Duty</option>
                                    <option value="Documents Charges">Documents Charges</option>
                                    <option value="Service Fee">Service Fee</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${additionalCharges}.amount`} type="number" required component={this.renderInput} placeholder="Amount" >
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Expense</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                </ul>
            </div>
        )
    }
    renderPackingaterials() {
        return this.props.packingMaterials.map(packingMaterial => {
            return (
                <option key={packingMaterial._id} value={packingMaterial.id}>{packingMaterial.materialName}</option>
            )
        })
    }
    renderPackingMaterialsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((packingMaterials, index) => <li key={index}>
                        <label htmlFor={packingMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field disabled">
                                Material Name
                                <Field name={`${packingMaterials}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Material-</option>
                                    {this.renderPackingaterials()}
                                </Field>
                            </div>
                            <div className="four wide field disabled">
                                Unit Of Measure
                                <Field name={`${packingMaterials}.uom`} type="text" required component={this.renderSelectField} placeholder="UOM" >
                                    <option>-UOM-</option>
                                    <option value="Each">Each</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="m">m</option>
                                    <option value="ml">ml</option>
                                    <option value="g">g</option>
                                    <option value="cm">cm</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Quantity
                                <Field name={`${packingMaterials}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                Unit Price
                                <Field name={`${packingMaterials}.unitPrice`} type="number" required component={this.renderInput} placeholder="Unit Price" >
                                </Field>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
    renderGrnForm() {
        return (
            <div>
                <div className="ui segment" style={{ paddingBottom: "15px", paddingTop: "15px", paddingLeft: "15px", paddingRight: "15px" }}>
                    <h4>Create new GRN</h4>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="six wide field">
                                Supplier Invoice Number
                                <Field name="invoiceNumber" type="text" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                </Field>
                            </div>
                            <div className="four wide field">
                                Invoice Date
                                <Field name="invoiceDate" type="date" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                </Field>
                            </div>
                            <div className="six wide field">
                                Remarks (Optional)
                                <Field name="remarks" type="text" required component={this.renderInput} placeholder="Remarks">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <label>Material Details- </label>
                                <FieldArray name="packingMaterials" component={this.renderPackingMaterialsDropDown} />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Additional Charges
                                <FieldArray name="additionalCharges" component={this.renderAdditionalChargesDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                    {this.renderSuccessMessage()}
                </div>
            </div>
        )
    }
    rederGrn() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div style={{ paddingTop: "0px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Pending Purchase Order
                            </div>
                            <p>Waiting for approval!</p>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <div>
                        {this.renderGrnForm()}
                    </div>
                    <div>
                        {this.renderAllGrn()}
                    </div>
                </div>
            )
        }
    }
    renderPrintButton() {
        if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                </div>
            )
        }
    }
    onClick = () => {
        this.props.printPurchaseOrderPacking(this.props.order.id)
    }
    viewSupplierInvoice = () => {
        this.props.viewSupplierInvoicePacking(this.props.order.suplierInvoicePdf)
    }
    onSubmit = (formValues) => {
        for (let i = 0; i < formValues.packingMaterials.length; i++) {
            formValues.packingMaterials[i].date = moment().format('DD/MM/YYYY, h:mm:ss a');
            formValues.packingMaterials[i].materialName = formValues.packingMaterialsList[i].materialName
            formValues.packingMaterials[i].materialCode = formValues.packingMaterialsList[i].materialCodeRm
            formValues.packingMaterials[i].materialGroup = formValues.packingMaterialsList[i].materialGroup
            formValues.packingMaterials[i].remainingQuantity = formValues.packingMaterials[i].quantity
            formValues.packingMaterials[i].supplierId = formValues.supplierId
            formValues.packingMaterials[i].companyName = formValues.supplier[0].companyName
            formValues.packingMaterials[i].purchaseOrderId = formValues.id
            formValues.packingMaterials[i].purchaseOrderNumber = formValues.orderNumber
            formValues.packingMaterials[i].invoiceNumber = formValues.invoiceNumber
            formValues.packingMaterials[i].invoiceDate = formValues.invoiceDate
        }
        console.log(formValues)
        this.props.grnPurchaseOrderPacking(formValues._id, formValues)
    }
    renderBankPaymentsDetails() {
        if (!this.props.order.bankPaymentsDetails) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <tbody>
                <tr>
                    <td>
                        {this.props.order.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.date).format('DD/MM/YYYY, h:mm a')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.bankAccounts.map(bank => {
                            return (
                                <p key={bank.id}>{bank.bankName}-{bank.branch}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{payment.chequeNumber}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.chequeDate).format('DD/MM/YYYY')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{payment.remarks}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.bankPaymentsDetails.map(payment => {
                            let amount = Number(payment.amount)
                            return (
                                <p key={payment.id} style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</p>
                            )
                        })
                        }
                    </td>
                </tr>
            </tbody>
        )

    }
    rederPaymentsFormTab() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div style={{ paddingTop: "0px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Pending Purchase Order
                            </div>
                            <p>Waiting for approval!</p>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div style={{ paddingTop: "15px" }}>
                    <div className="ui placeholder segment">
                        <div className="ui two column stackable center aligned grid">
                            <div className="ui vertical divider">Or</div>
                            <div className="row">
                                <div className="column">
                                    <NewBankPaymentFormPacking data={this.props.order} msgBank={this.props.sucessMessege} />
                                </div>
                                <div className="column">
                                    <NewCashPaymentFormPacking data={this.props.order} msgCash={this.props.sucessMessege} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    getBankPaymentsTotal() {
        const array = []
        const totalArray = this.props.order.bankPaymentsDetails.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return this.formatNumber(sumOfArray.toFixed(2))
    }
    renderBankPaymentsTable() {
        if (!this.props.order.bankPaymentsDetails) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cheque payments found!</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Cheque Payments Details</h4></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Bank Name</th>
                            <th>Cheque Number</th>
                            <th>Cheque Date</th>
                            <th>Remarks</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    {this.renderBankPaymentsDetails()}
                    <tfoot>
                        <tr colSpan="6">
                            <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                            <th colSpan="1" style={{ textAlign: "right" }}>{this.getBankPaymentsTotal()}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    renderCashPaymentsDetails() {
        if (!this.props.order.cashPaymentsDetails) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <tbody>
                <tr>
                    <td>
                        {this.props.order.cashPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.date).format('DD/MM/YYYY, h:mm a')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.cashPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{payment.remarks}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.cashPaymentsDetails.map(payment => {
                            let amount = Number(payment.amount)
                            return (
                                <p key={payment.id} style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</p>
                            )
                        })
                        }
                    </td>
                </tr>
            </tbody>
        )

    }
    getCashPaymentsTotal() {
        const array = []
        const totalArray = this.props.order.cashPaymentsDetails.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return this.formatNumber(sumOfArray.toFixed(2))
    }
    renderCashPaymentsTable() {
        if (!this.props.order.cashPaymentsDetails) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cash payments found!.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Cash Payments Details</h4></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    {this.renderCashPaymentsDetails()}
                    <tfoot>
                        <tr colSpan="3">
                            <th colSpan="2" style={{ textAlign: "right" }}>Subtotal</th>
                            <th colSpan="1" style={{ textAlign: "right" }}>{this.getCashPaymentsTotal()}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    rederAdditionalPaymentsFormTab() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div style={{ paddingTop: "0px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Pending Purchase Order
                            </div>
                            <p>Waiting for approval!</p>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <div className="ui segment">
                        <div className="">
                            <NewAdditionalBankPaymentFormPacking data={this.props.order} msgBank={this.props.sucessMessege} />
                        </div>
                        <div className="ui horizontal divider">
                            Or
                        </div>
                        <div className="">
                            <NewAdditionalCashPaymentFormPacking data={this.props.order} msgCash={this.props.sucessMessege} />
                        </div>
                    </div>
                </div>
            )
        }
    }
    renderAdditionalChargesBankPaymentsDetails() {
        if (!this.props.order.additionalChargesChequePayments) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <tbody>
                <tr>
                    <td>
                        {this.props.order.additionalChargesChequePayments.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.date).format('DD/MM/YYYY, h:mm a')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesChequePayments.map(payment => {
                            return (
                                <p key={payment.id}>{payment.reason}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.bankAccountsAdditionalCharges.map(bank => {
                            return (
                                <p key={bank.id}>{bank.bankName}-{bank.branch}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesChequePayments.map(payment => {
                            return (
                                <p key={payment.id}>{payment.chequeNumber}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesChequePayments.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.chequeDate).format('DD/MM/YYYY')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesChequePayments.map(payment => {
                            return (
                                <p key={payment.id}>{payment.remarks}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesChequePayments.map(payment => {
                            let amount = Number(payment.amount)
                            return (
                                <p key={payment.id} style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</p>
                            )
                        })
                        }
                    </td>
                </tr>
            </tbody>
        )

    }

    getAdditionalChargesBankPaymentsTotal() {
        const array = []
        const totalArray = this.props.order.additionalChargesChequePayments.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return this.formatNumber(sumOfArray.toFixed(2))
    }
    renderAdditionalChargesBankPaymentsTable() {
        if (!this.props.order.additionalChargesChequePayments) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cheque payments found!.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Cheque Payments Details</h4></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Expense</th>
                            <th>Bank Name</th>
                            <th>Cheque Number</th>
                            <th>Cheque Date</th>
                            <th>Remarks</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    {this.renderAdditionalChargesBankPaymentsDetails()}
                    <tfoot>
                        <tr colSpan="16">
                            <th colSpan="6" style={{ textAlign: "right" }}>Subtotal</th>
                            <th colSpan="8" style={{ textAlign: "right" }}>{this.getAdditionalChargesBankPaymentsTotal()}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    getAdditionalChargesCashPaymentsTotal() {
        const array = []
        const totalArray = this.props.order.additionalChargesCashPayments.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return this.formatNumber(sumOfArray.toFixed(2))
    }
    renderAdditionalChargesCashPaymentsDetails() {
        if (!this.props.order.additionalChargesCashPayments) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <tbody>
                <tr>
                    <td>
                        {this.props.order.additionalChargesCashPayments.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.date).format('DD/MM/YYYY, h:mm a')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesCashPayments.map(payment => {
                            return (
                                <p key={payment.id}>{payment.reason}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesCashPayments.map(payment => {
                            return (
                                <p key={payment.id}>{payment.remarks}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.order.additionalChargesCashPayments.map(payment => {
                            let amount = Number(payment.amount)
                            return (
                                <p key={payment.id} style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</p>
                            )
                        })
                        }
                    </td>
                </tr>
            </tbody>
        )

    }

    renderAdditionalChargesCashPaymentsTable() {
        if (!this.props.order.additionalChargesCashPayments) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cash payments found!.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Cash Payments Details</h4></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Expense</th>
                            <th>Remarks</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    {this.renderAdditionalChargesCashPaymentsDetails()}
                    <tfoot>
                        <tr colSpan="4">
                            <th colSpan="3" style={{ textAlign: "right" }}>Subtotal</th>
                            <th colSpan="1" style={{ textAlign: "right" }}>{this.getAdditionalChargesCashPaymentsTotal()}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    render() {
        if (!this.props.order) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        const panes = [
            {
                menuItem: 'Purchase Order Details', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <div>
                                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                                    <thead className="full-width">
                                        <tr>
                                            <th colSpan="12" style={{ color: "red" }}><h4>Order Details</h4></th>
                                        </tr>
                                        <tr>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>UOM</th>
                                            <th style={{ textAlign: "right" }}>Quantity</th>
                                            <th style={{ textAlign: "right" }}>Unit Price</th>
                                            <th style={{ textAlign: "right" }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPurchaseOrederDetails()}
                                    </tbody>
                                    <tfoot>
                                        <tr colSpan="16">
                                            <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                                            <th colSpan="8" style={{ textAlign: "right" }}>{this.getSubTotal()}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                {this.renderPrintButton()}
                            </div>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'GRN Details', render: () =>
                    <Tab.Pane attached={false}>
                        {this.rederGrn()}
                    </Tab.Pane>
            },
            {
                menuItem: 'Payments', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <div>
                                {this.rederPaymentsFormTab()}
                            </div>
                            <div>
                                {this.renderBankPaymentsTable()}
                            </div>
                            <div>
                                {this.renderCashPaymentsTable()}
                            </div>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Additional Payments', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <div>
                                {this.rederAdditionalPaymentsFormTab()}
                            </div>
                            <div>
                                {this.renderAdditionalChargesBankPaymentsTable()}
                            </div>
                            <div>
                                {this.renderAdditionalChargesCashPaymentsTable()}
                            </div>
                        </div>
                    </Tab.Pane>
            }
        ]
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h4><span style={{ color: "#2185d0" }}>Order No #{this.props.order.orderNumber}</span></h4>
                        {this.renderSupplierDetails()}
                    </div>
                    <Tab menu={{ pointing: true }} panes={panes} />
                    <div style={{ paddingTop: "20px" }}>
                        <Link to={"/purchase-order-dashboard-packing"} type="button" className="ui button">Back</Link>
                        <Link to={`/delete-purchase-order-packing/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    const suppliers = Object.values(state.supplier)
    const packingMaterials = Object.values(state.packingMaterials)
    const order = state.purchaseOrdersPacking[ownPorps.match.params.id]
    const sucessMessege = Object.values(state.purchaseOrdersPacking)
    console.log(sucessMessege)
    return {
        errorMessage: state,
        suppliers: suppliers,
        packingMaterials: packingMaterials,
        order: order,
        initialValues: order,
        sucessMessege: sucessMessege
    };
}
const formWrapped = reduxForm({
    form: 'purchaseOrderPackingGrn'
})(SinglePurchaseOrderPacking);

export default connect(mapStateToProps, { fetchPurchaseOrderPacking, printPurchaseOrderPacking, fetchSuppliers, grnPurchaseOrderPacking, fetchPackingMaterials })(formWrapped);