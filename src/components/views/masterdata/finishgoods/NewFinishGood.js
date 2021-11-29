import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchSuppliers } from '../../../../actions';
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload';


class NewFinishGood extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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
    renderInput = ({ input, label, placeholder, type, meta, required }) => {
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
    render() {
        const { handleSubmit } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Basic Data</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="twelve wide field">
                                Product Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="productName" component={this.renderInput} placeholder="Product Name" type="text" />
                            </div>                            
                        </div>
                        <div className="fields">     
                            <div className="three wide field">
                                Product Category <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="productCategory" component={this.renderSelectField} type="text" >
                                    <option>-Select Product Category-</option>
                                    <option value="Pharmaceutical">Pharmaceutical</option>
                                    <option value="Cosmetics">Cosmetics</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>  
                            <div className="three wide field">
                                Unit of Measure <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="baseUnitMeasure" required component={this.renderSelectField} placeholder="" type="text" >
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
                            <div className="three wide field">
                                Division <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="division" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Select Division-</option>
                                    <option value="Shampoo">Shampoo</option>
                                    <option value="Cream">Cream</option>
                                    <option value="Conditioner">Conditioner</option>
                                    <option value="Soap">Soap</option>
                                    <option value="Face Sheild">Face Sheild</option>
                                    <option value="Sanitizer">Sanitizer</option>
                                    <option value="Hand Wash">Hand Wash</option>
                                    <option value="Glove">Glove</option>
                                    <option value="Mask">Mask</option>
                                    <option value="Coat">Coat</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Powder">Powder</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                Material State <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="productState" component={this.renderSelectField} type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">                            
                            <div className="four wide field">
                                Units in a Pack <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="unitsInPack" component={this.renderInput} placeholder="Units in a Pack" type="number" />
                            </div>
                            <div className="four wide field">
                                Minimum Selling Units <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="minimumSellingUnits" component={this.renderInput} placeholder="Minimum Selling Units" type="number" />
                            </div>
                        </div>                        
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="productDescription" component="textarea" placeholder="Peoduct Description(Optional)" type="text" />
                            </div>
                        </div>                       
                        <div className="field">
                            <Link to={"/finish-goods"} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.productName) {
        errors.productName = 'Required!';
    }
    if (!formValues.productCategory) {
        errors.productCategory = 'Required!';
    }
    if (!formValues.baseUnitMeasure) {
        errors.baseUnitMeasure = 'Required!';
    }
    if (!formValues.division) {
        errors.division = 'Required!';
    }
    if (!formValues.productState) {
        errors.productState = 'Required!';
    }
    if (!formValues.unitsInPack) {
        errors.unitsInPack = 'Required!';
    }
    if (!formValues.minimumSellingUnits) {
        errors.minimumSellingUnits = 'Required!';
    }    
    return errors;
}
const mapStateToProps = (state) => {
    const supplier = Object.values(state.supplier)
    return { supplier: supplier };
}
const formWrapped = reduxForm({
    form: 'newFinishGood',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(NewFinishGood);
export default connect(mapStateToProps, { fetchSuppliers })(formWrapped);