import React from 'react';
import { Field, reduxForm, FieldArray, formValueSelector, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchFinishGoods, createInvoice, fetchQuotations, fetchQuotation } from '../../../actions';

class NewInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchFinishGoods()
        this.props.fetchQuotations()
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
    renderCustomers() {
        return this.props.customers.map(customer => {
            return (
                <option key={customer._id} value={customer.id}>{customer.companyName}</option>
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
        if (this.props.invoice[0] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createInvoice(formValues)
    }
    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.id}>{product.productName}</option>
            )
        })
    }
    renderProductsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((products, index) => <li key={index}>
                        <label htmlFor={products}>Product #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${products}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.discount`} type="number" required component={this.renderInput} placeholder="Claim" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.currency`} required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Select Currency-</option>
                                    <option value="LKR">LKR</option>
                                    <option value="USD">USD</option>
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Product</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                </ul>
            </div>
        )
    }
    clearValues() {
        window.location.reload()
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
    renderQuotations() {
        return this.props.quotations.map(quotation => {
            if (quotation.quotation_state === "Approved") {
                return (
                    <option key={quotation._id} value={quotation.id}>{quotation.quotationNumber}</option>
                )
            }
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h3>Create Invoice</h3>
                        <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="fields">
                                <div className="six wide field">
                                    Customer Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="customerId" component={this.renderSelectField} placeholder="" type="text" >
                                        <option>-Select Customer-</option>
                                        {this.renderCustomers()}
                                    </Field>
                                </div>
                                <div className="six wide field">
                                    Quotation (Optional)
                                    <Field name="quotationNumber" component={this.renderSelectField} placeholder="" type="text" >
                                        <option>-Select Quotation-</option>
                                        {this.renderQuotations()}
                                    </Field>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="six wide field">
                                    Remarks (Optional)
                                    <Field name="remarks" type="text" component="input" placeholder="Remarks" />
                                </div>
                                <div className="six wide field">
                                    Customer Reference (Optional)
                                    <Field name="reference" type="text" component="input" placeholder="Cusomer Reference" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="six wide field">
                                    Transport Cost (Optional)
                                    <Field name="transportCost" type="number" component="input" placeholder="Transport Cost" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="sixteen wide field">
                                    Products <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <FieldArray name="products" component={this.renderProductsDropDown} />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="sixteen wide field">
                                    Additional Charges
                                    <FieldArray name="additionalCharges" component={this.renderAdditionalChargesDropDown} />
                                </div>
                            </div>
                            <div className="field">
                                <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                                <button type="button" onClick={this.clearValues} className="ui red button">Clear</button>
                                <button type="submit" disabled={this.props.submitting} className="ui primary button">Submit</button>
                            </div>
                        </form>
                        {this.renderSuccessMessage()}
                    </div>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.customerId) {
        errors.customerId = 'Required';
    }
    if (!formValues.products || !formValues.products.length) {
        errors.products = { _error: 'At least one product must be entered' }
    } else {
        const productsArrayErrors = []
        formValues.products.forEach((product, index) => {
            const productErrors = {}
            if (!product || !product.id) {
                productErrors.id = 'Required'
                productsArrayErrors[index] = productErrors
            }
            if (!product || !product.quantity) {
                productErrors.quantity = 'Required'
                productsArrayErrors[index] = productErrors
            }
            if (!product || !product.discount) {
                productErrors.discount = 'Required'
                productsArrayErrors[index] = productErrors
            }
            if (!product || !product.currency) {
                productErrors.currency = 'Required'
                productsArrayErrors[index] = productErrors
            }
        })
        if (productsArrayErrors.length) {
            errors.products = productsArrayErrors
        }
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'newInvoice',
    validate: validate
})(NewInvoice);

const selector = formValueSelector('newInvoice')

const mapStateToProps = (state) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.finishGoods)
    const quotations = Object.values(state.quotations)
    const value = selector(state, 'quotationNumber')
    const invoice = Object.values(state.invoices)
    const quotation = state.quotations[value]
    console.log(invoice)
    return { errorMessage: state, customers: customers, products: products, invoice, quotations: quotations, initialValues: quotation, value: value };
}


export default connect(mapStateToProps, { fetchCustomers, fetchFinishGoods, createInvoice, fetchQuotations, fetchQuotation })(formWrapped);