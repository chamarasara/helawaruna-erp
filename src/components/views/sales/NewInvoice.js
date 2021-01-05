import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchFinishGoods, createInvoice, fetchQuotations } from '../../../actions';

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

    onSubmit = (formValues) => {
        this.props.createInvoice(formValues)
    }
    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.id}>{product.productName}</option>
            )
        })
    }
    renderProductsDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((products, index) => <li key={index}>
                        <label htmlFor={products}>Product #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${products}.id`} type="text" required component="select" >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.quantity`} type="number" required component="input" placeholder="Quantity" >
                                </Field>
                            </div>  
                            <div className="six wide field">
                                <Field name={`${products}.discount`} type="number" required component="input" placeholder="Discount" >
                                </Field>
                            </div>                                                       
                            <div className="six wide field">
                                <Field name={`${products}.currency`} required component="select" placeholder="" type="text" >
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
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Product</button>

            </div>
        )
    }
    renderQuotations() {
        return this.props.quotations.map(quotation => {
            if (quotation.quotation_state === "Approved") {
                return (
                    <option key={quotation._id} value={quotation.quotationNumber}>{quotation.quotationNumber}</option>
                )
            }           
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Invoice</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        
                        <div className="fields">
                            <div className="six wide field">
                                <Field name="customerId" component="select" placeholder="" type="text" >
                                    <option>-Select Customer-</option>
                                    {this.renderCustomers()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name="quotationNumber" component="select" placeholder="" type="text" >
                                    <option>-Select Quotation-</option>
                                    {this.renderQuotations()}
                                </Field>
                            </div>
                        </div>                        
                        <div className="fields">
                            <div className="sixteen wide field">
                                <label>Products- </label>
                                <FieldArray name="products" component={this.renderProductsDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
//Form input validation
// const validate = (formValues) => {
//     const errors = {}
//     if (!formValues.firstName) {
//         errors.firstName = 'Please enter First Name';
//     }
//     if (!formValues.lastName) {
//         errors.lastName = 'Please enter Last Name';
//     }
//     if (!formValues.address) {
//         errors.address = 'Please enter the Number of the Address';
//     }
//     if (!formValues.nic) {
//         errors.nic = 'Please enter the ID Nummber';
//     }
//     if (!formValues.mobileNo) {
//         errors.mobileNo = 'Please enter Phone Number';
//     }
//     if (!formValues.email) {
//         errors.email = 'Please enter Email';
//     }
//     if (!formValues.gender) {
//         errors.gender = 'Please enter the Gender';
//     }
//     return errors;
// }
const mapStateToProps = (state) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.finishGoods)
    const quotations = Object.values(state.quotations)
    console.log(state)
    return { errorMessage: state, customers: customers, products: products, quotations: quotations };
}
const formWrapped = reduxForm({
    form: 'newInvoice'
})(NewInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchFinishGoods, createInvoice, fetchQuotations })(formWrapped);