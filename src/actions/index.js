import api from "../apis/api";
import history from '../components/history';
import jwt_decode from "jwt-decode";
import {
    CREATE_USER,
    EDIT_USER,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    CREATE_USER_ROLE,
    EDIT_USER_ROLE,
    FETCH_USERS_ROLES,
    FETCH_USER_ROLE,
    DELETE_USER_ROLE,
    AUTHENTICATED,
    UNAUTHENTICATED,
    AUTHENTICATION_ERROR,
    CREATE_CUSTOMER,
    EDIT_CUSTOMER,
    FETCH_CUSTOMER,
    FETCH_CUSTOMERS,
    DELETE_CUSTOMER,
    CREATE_SUPPLIER,
    EDIT_SUPPLIER,
    FETCH_SUPPLIER,
    FETCH_SUPPLIERS,
    DELETE_SUPPLIER,
    NEW_DISTRIBUTOR,
    EDIT_DISTRIBUTOR,
    FETCH_DISTRIBUTOR,
    FETCH_DISTRIBUTORS,
    DELETE_DISTRIBUTOR,
    CREATE_RAW_MATERIAL,
    EDIT_RAW_MATERIAL,
    FETCH_RAW_MATERIAL,
    FETCH_RAW_MATERIALS,
    DELETE_RAW_MATERIAL,
    CREATE_PACKING_MATERIAL,
    EDIT_PACKING_MATERIAL,
    FETCH_PACKING_MATERIAL,
    FETCH_PACKING_MATERIALS,
    DELETE_PACKING_MATERIAL,
    CREATE_SFG_MATERIAL,
    EDIT_SFG_MATERIAL,
    FETCH_SFG_MATERIAL,
    FETCH_SFG_MATERIALS,
    DELETE_SFG_MATERIAL,
    CREATE_FG_MATERIAL,
    EDIT_FG_MATERIAL,
    FETCH_FG_MATERIAL,
    FETCH_FG_MATERIALS,
    DELETE_FG_MATERIAL,
    CREATE_PRODUCT_MASTER,
    EDIT_PRODUCT_MASTER,
    FETCH_PRODUCT_MASTER,
    FETCH_PRODUCTS_MASTER,
    DELETE_PRODUCT_MASTER,
    CREATE_PURCHASE_ORDER_RAW,
    EDIT_PURCHASE_ORDER_RAW,
    FETCH_PURCHASE_ORDER_RAW,
    FETCH_PURCHASE_ORDERS_RAW,
    NEW_GRN_PURCHASE_ORDER_RAW,
    NEW_BANK_PAYMENT_PURCHASE_ORDER_RAW,
    NEW_CASH_PAYMENT_PURCHASE_ORDER_RAW,
    NEW_ADDITIONAL_BANK_PAYMENT_PURCHASE_ORDER_RAW,
    NEW_ADDITIONAL_CASH_PAYMENT_PURCHASE_ORDER_RAW,
    SEARCH_PURCHASE_ORDERS_RESULT_RAW,
    CREATE_PURCHASE_ORDER_PACKING,
    EDIT_PURCHASE_ORDER_PACKING,
    FETCH_PURCHASE_ORDER_PACKING,
    FETCH_PURCHASE_ORDERS_PACKING,
    NEW_GRN_PURCHASE_ORDER_PACKING,
    NEW_BANK_PAYMENT_PURCHASE_ORDER_PACKING,
    NEW_CASH_PAYMENT_PURCHASE_ORDER_PACKING,
    NEW_ADDITIONAL_BANK_PAYMENT_PURCHASE_ORDER_PACKING,
    NEW_ADDITIONAL_CASH_PAYMENT_PURCHASE_ORDER_PACKING,
    SEARCH_PURCHASE_ORDERS_RESULT_PACKING,
    CREATE_INVOICE,
    EDIT_INVOICE,
    FETCH_INVOICES,
    FETCH_INVOICE,
    DELETE_INVOICE,
    SEARCH_INVOICES_RESULT,
    CREATE_RETURN_INVOICE,
    FETCH_RETURN_INVOICE,
    NO_RETURN_INVOICE,
    FETCH_RETURN_INVOICES,
    SEARCH_RETURN_INVOICES_RESULT,
    CREATE_BOM,
    EDIT_BOM,
    FETCH_BOMS,
    FETCH_BOM,
    DELETE_BOM,
    CREATE_QUOTATION,
    CREATE_QUOTATION_ERROR,
    EDIT_QUOTATION,
    FETCH_QUOTATIONS,
    FETCH_QUOTATION,
    FETCH_QUOTATION_FOR_INVOICE,
    SEARCH_QUOTATIONS_RESULT,
    NEW_FINISH_GOOD_INVENTORY,
    EDIT_FINISH_GOOD_INVENTORY,
    FETCH_FINISH_GOOD_INVENTORY,
    FETCH_FINISH_GOODS_INVENTORY,
    DISABLE_FINISH_GOOD_INVENTORY,
    SEARCH_FINISH_GOODS_INVENTORY,
    NEW_EMPLOYEE,
    EDIT_EMPLOYEE,
    FETCH_EMPLOYEE,
    FETCH_EMPLOYEES,
    DELETE_EMPLOYEE,
    NEW_SALARY,
    EDIT_SALARY,
    FETCH_SALARY,
    FETCH_SALARIES,
    DELETE_SALARY,
    SEARCH_SALARIES_RESULT,

    NEW_BANK_ACCOUNT_MASTER,
    FETCH_ALL_BANK_ACCOUNTS,
    FETCH_SINGLE_BANK_ACCOUNT,
    EDIT_BANK_ACCOUNT,
    DELETE_BANK_ACCOUNT
} from './types';

//create user
export const createUser = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/users/newuser', { ...formValues, user }, header);
    dispatch({ type: CREATE_USER, payload: response.data });
    history.push('/employee');
    window.location.reload();
};
//List all users
export const fetchUsers = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/users/all-users', header);
    dispatch({ type: FETCH_USERS, payload: response.data });
};
//View single user
export const fetchUser = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/users/single-user/${id}`, header);
    dispatch({ type: FETCH_USER, payload: response.data });
};
//Edit user
export const editUser = (id, formValues) => async dispatch => {
    console.log(id)
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/users/update-user/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_USER, payload: response.data });
    window.location.reload()
};
//Delete user
export const deleteUser = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/users/delete-user/${id}`, header);
    dispatch({ type: DELETE_USER, payload: id });
    history.push('/employee');
};

//create user role
export const createUserRole = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/user-roles/new-user-role', { ...formValues, user }, header);
    dispatch({ type: CREATE_USER_ROLE, payload: response.data });
    history.push('/employee');
    window.location.reload();
};
//get all user roles
export const fetchUsersRoles = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/user-roles/all-user-roles', header);
    console.log(response.data)
    dispatch({ type: FETCH_USERS_ROLES, payload: response.data });
};
//get single user role
export const fetchUserRole = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`api/user-roles/single-user_role/${id}`, header);
    dispatch({ type: FETCH_USER_ROLE, payload: response.data });
};
//edit user role
export const editUserRole = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(id)
    const response = await api.patch(`api/user-roles/update-user-role/${id}`, { ...formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_USER_ROLE, payload: response.data });
    history.push(`/user-role/${id}`)
};
//delete user role
export const deleteUserRole = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`api/user-roles/delete-user-role/${id}`, header);
    dispatch({ type: DELETE_USER_ROLE, payload: id });
    history.push('/employee');
};

//create customer
export const createCustomer = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/customer-master/new-customer', { ...formValues, user }, header);
    dispatch({ type: CREATE_CUSTOMER, payload: response.data });
    //console.log(formValues)
    history.push('/customer');
};
//List all customers
export const fetchCustomers = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/customer-master/all-customers', header);
    dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
};
//View single customer
export const fetchCustomer = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/customer-master/single-customer/${id}`, header);
    dispatch({ type: FETCH_CUSTOMER, payload: response.data });
};
//Edit customer
export const editCustomer = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/customer-master/update-customer/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_CUSTOMER, payload: response.data });
    //window.location.reload()
    history.push(`/customer-profile/${id}`)
};
//Delete customer
export const deleteCustomer = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/customer-master/delete-customer/${id}`, header);
    dispatch({ type: DELETE_CUSTOMER, payload: id });
    history.push('/customer');
};
//create supplier
export const createSupplier = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('api/master-data/supplier-master/new-supplier', { ...formValues, user }, header);
    dispatch({ type: CREATE_SUPPLIER, payload: response.data });
    history.push('/supplier');
};
//List all customers
export const fetchSuppliers = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('api/master-data/supplier-master/all-suppliers', header);

    dispatch({ type: FETCH_SUPPLIERS, payload: response.data });
};
//View single supplier
export const fetchSupplier = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/supplier-master/single-supplier/${id}`, header);

    dispatch({ type: FETCH_SUPPLIER, payload: response.data });
};
//Edit supplier
export const editSupplier = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/supplier-master/update-supplier/${id}`, { ...formValues }, header);

    dispatch({ type: EDIT_SUPPLIER, payload: response.data });
    history.push(`/supplier-profile/${id}`);
};
//Delete supplier
export const deleteSupplier = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/supplier-master/delete-supplier/${id}`, header);
    dispatch({ type: DELETE_SUPPLIER, payload: id });
    history.push('/supplier')
};
//create distributor
export const createDistributor = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/distributor-master/new-distributor', { ...formValues, user }, header);
    dispatch({ type: NEW_DISTRIBUTOR, payload: response.status });
    console.log(response)
    setTimeout(function () {
        window.location.reload()
    }, 2000);

};
//List all distributors
export const fetchDistributors = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/distributor-master/all-distributors', header);
    dispatch({ type: FETCH_DISTRIBUTORS, payload: response.data });
};
//View single distributor
export const fetchDistributor = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/distributor-master/single-distributor/${id}`, header);
    console.log(response.data)
    dispatch({ type: FETCH_DISTRIBUTOR, payload: response.data[0] });
};
//Edit distributor
export const editDistributor = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/distributor-master/update-distributor/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_DISTRIBUTOR, payload: response.status });
    //console.log(response.status)

    setTimeout(function () {
        history.push(`/distributor-profile/${formValues.id}`)
        window.location.reload()
    }, 2000);

};
//Delete distributor
export const deleteDistributor = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/distributor-master/delete-distributor/${id}`, header);
    dispatch({ type: DELETE_DISTRIBUTOR, payload: id });
    history.push('/distributor-dashboard');
    //window.location.reload()
};
//create employee
export const createEmployee = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/employee-master/new-employee/', { ...formValues, user }, header);
    dispatch({ type: NEW_EMPLOYEE, payload: response.data });
    history.push('/employee-dashboard');
    window.location.reload()
};
//List all employees
export const fetchEmployees = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/employee-master/all-employees/', header);
    dispatch({ type: FETCH_EMPLOYEES, payload: response.data });
};
//View single employee
export const fetchEmployee = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/employee-master/single-employee/${id}`, header);
    console.log(response.data)
    dispatch({ type: FETCH_EMPLOYEE, payload: response.data });
};
//Edit employee
export const editEmployee = (id, formValues) => async dispatch => {

    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/employee-master/update-employee/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_EMPLOYEE, payload: response.data });
    history.push(`/employee-profile/${formValues._id}`)
    window.location.reload()
};
//Edit employee master
export const editMasterEmployee = (id, formValues) => async dispatch => {

    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/employee-master/update-employee/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_EMPLOYEE, payload: response.data });
    history.push(`/employee-master-profile/${formValues._id}`)
    window.location.reload()
};
//Edit employee
export const assignAllowances = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/employee-master/update-employee/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_EMPLOYEE, payload: response.data });
    history.push(`/employee-master-profile/${formValues._id}`)
    window.location.reload()
};
//Delete employee
export const deleteEmployee = (id) => async dispatch => {
    console.log(id)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/employee-master/delete-employee/${id}`, header);
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
    history.push('/employee-dashboard');
    window.location.reload()
};
//Delete employee master
export const deleteMasterEmployee = (id) => async dispatch => {
    console.log(id)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/employee-master/delete-employee/${id}`, header);
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
    history.push('/employee-master-dashboard');
    window.location.reload()
};
//create raw material
export const createRawMaterial = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/raw-material/new-raw-material/', { ...formValues, user }, header);

    dispatch({ type: CREATE_RAW_MATERIAL, payload: response.data });
    history.push("/raw-material/");
    window.location.reload()
};
//List all raw material
export const fetchRawMaterials = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('api/master-data/raw-material/all-raw-materials', header);
    dispatch({ type: FETCH_RAW_MATERIALS, payload: response.data });
};
//View single raw material
export const fetchRawMaterial = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/raw-material/single-raw-material/${id}`, header);

    dispatch({ type: FETCH_RAW_MATERIAL, payload: response.data[0] });
};
//Edit raw material
export const editRawMaterial = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/master-data/raw-material/update-raw-material/${id}`, { ...formValues }, header);

    dispatch({ type: EDIT_RAW_MATERIAL, payload: response.data });

    history.push(`/single-raw-material/${formValues.id}`);
    window.location.reload()
};
//Delete raw material
export const deleteRawMaterial = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/raw-material/delete-raw-material/${id}`, header);
    dispatch({ type: DELETE_RAW_MATERIAL, payload: id });
    history.push('/raw-material')
    window.location.reload()
};
//create packing material
export const createPackingaterial = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/packing-material/new-packing-material', { ...formValues, user }, header);

    dispatch({ type: CREATE_PACKING_MATERIAL, payload: response.data });
    history.push('/packing-material');
    window.location.reload()
};
//List all packing material
export const fetchPackingMaterials = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/packing-material/all-packing-materials', header);

    dispatch({ type: FETCH_PACKING_MATERIALS, payload: response.data });
};
//View single packing material
export const fetchPackingMaterial = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/packing-material/single-packing-material/${id}`, header);

    dispatch({ type: FETCH_PACKING_MATERIAL, payload: response.data[0] });
};
//Edit packing material
export const editPackingMaterial = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/packing-material/update-packing-material/${id}`, { ...formValues }, header);

    dispatch({ type: EDIT_PACKING_MATERIAL, payload: response.data });
    history.push(`/single-packing-material/${formValues.id}`);
};
//Delete packing material
export const deletePackingMaterial = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/packing-material/delete-packing-material/${id}`, header);
    dispatch({ type: DELETE_PACKING_MATERIAL, payload: id });
    history.push('/raw-material')
    window.location.reload()
};
//create SFG material
export const createSemiFinishGood = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/semi-finish-good/new-semi-finish-good-material', { ...formValues, user }, header);

    dispatch({ type: CREATE_SFG_MATERIAL, payload: response.data });
    history.push('/semi-finish-goods');
    window.location.reload()
};
//List all SFG material
export const fetchSemiFinishGoods = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/semi-finish-good/all-semi-finish-good-materials', header);

    dispatch({ type: FETCH_SFG_MATERIALS, payload: response.data });
};
//View SFG packing material
export const fetchSemiFinishGood = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/semi-finish-good/single-semi-finish-good-material/${id}`, header);

    dispatch({ type: FETCH_SFG_MATERIAL, payload: response.data });
};
//Edit SFG material
export const editSemiFinishGood = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/semi-finish-good/update-semi-finish-good-material/${id}`, { ...formValues }, header);

    dispatch({ type: EDIT_SFG_MATERIAL, payload: response.data });

    history.push(`/single-semi-finish-good-material/${id}`);
};
//Delete SFG material
export const deleteSemiFinishGood = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/semi-finish-good/delete-semi-finish-good-material/${id}`, header);
    dispatch({ type: DELETE_SFG_MATERIAL, payload: id });
    // history.push('/semi-finish-goods')
    // window.location.reload()
};

//create FG material
export const createFinishGood = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/finish-good/new-finish-good-material', { ...formValues, user }, header);
    console.log(response)
    dispatch({ type: CREATE_FG_MATERIAL, payload: response.data });
    history.push('/finish-goods');
    window.location.reload()
};
//List all FG material
export const fetchFinishGoods = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/finish-good/all-finish-good-materials', header);

    dispatch({ type: FETCH_FG_MATERIALS, payload: response.data });
};
//View FG  material
export const fetchFinishGood = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/finish-good/single-finish-good-material/${id}`, header);
    console.log(response)
    dispatch({ type: FETCH_FG_MATERIAL, payload: response.data[0] });
};
//Edit FG material
export const editFinishGood = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/finish-good/update-finish-good-material/${id}`, { ...formValues }, header);

    dispatch({ type: EDIT_FG_MATERIAL, payload: response.data });
    history.push(`/single-finish-good-material/${formValues.id}`);
    window.location.reload()
};
//Delete FG material
export const deleteFinishGood = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/finish-good/delete-finish-good-material/${id}`, header);
    dispatch({ type: DELETE_FG_MATERIAL, payload: id });
    history.push('/finish-goods')
    window.location.reload()
};

//create Product Master
export const createProductMaster = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('api/master-data/product-master/new-product', { ...formValues }, header);

    dispatch({ type: CREATE_PRODUCT_MASTER, payload: response.data });
    history.push('/products-dashboard');
    window.location.reload()
};
//List all Product Master
export const fetchProductsMaster = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/product-master/all-products', header);

    dispatch({ type: FETCH_PRODUCTS_MASTER, payload: response.data });
};
//View Product Master
export const fetchProductMaster = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/product-master/single-product/${id}`, header);

    dispatch({ type: FETCH_PRODUCT_MASTER, payload: response.data });
};
//Edit Product Master
export const editProductMaster = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/product-master/update-product/${id}`, { ...formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_PRODUCT_MASTER, payload: response.data });

    history.push(`/single-product-master/${id}`);
};
//Delete Product Master
export const deleteProductMaster = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/product-master/delete-product/${id}`, header);
    dispatch({ type: DELETE_PRODUCT_MASTER, payload: id });
    history.push('/products-dashboard')
    window.location.reload()
};

//create purchase order raw
export const createPurchaseOrderRaw = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Authorization': token
        }
    };

    const response = await api.post('api/sales/purchase-orders-raw/new-purchase-order-raw', { ...formValues, user }, header);
    dispatch({ type: CREATE_PURCHASE_ORDER_RAW, payload: response.status });
    setTimeout(function () {
        window.location.reload()
    }, 2000);


};
//List all purchase orders raw
export const fetchPurchaseOrdersRaw = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/sales/purchase-orders-raw/all-purchase-orders-raw', header);

    dispatch({ type: FETCH_PURCHASE_ORDERS_RAW, payload: response.data });
};
//View purchase order raw
export const fetchPurchaseOrderRaw = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/sales/purchase-orders-raw/single-purchase-order-raw/${id}`, header);
    dispatch({ type: FETCH_PURCHASE_ORDER_RAW, payload: response.data[0] });
};
//update purchase order raw
export const updatePurchaseOrderRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/update-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_RAW, payload: response.data });
    history.push(`/approvals-raw`);
    window.location.reload()

};
//update purchase order raw
export const updatePurchaseOrderStateRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/update-purchase-order-state-raw/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_RAW, payload: response.data });
    history.push(`/approvals-raw`);
    window.location.reload()

};
export const bankPaymentsPurchaseOrderRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/bank-payments-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_BANK_PAYMENT_PURCHASE_ORDER_RAW, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const cashPaymentsPurchaseOrderRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/cash-payments-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_CASH_PAYMENT_PURCHASE_ORDER_RAW, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const additionalChargesBankPaymentsPurchaseOrderRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/additional-charges-bank-payments-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_ADDITIONAL_BANK_PAYMENT_PURCHASE_ORDER_RAW, payload: response.status });
    console.log(response.data)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const additionalChargesCashPaymentsPurchaseOrderRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/additional-charges-cash-payments-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_ADDITIONAL_CASH_PAYMENT_PURCHASE_ORDER_RAW, payload: response.status });
    console.log(response.data)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const deletePurchaseOrderRaw = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/update-purchase-order-state-raw/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_RAW, payload: response.data });
    history.push(`/purchase-order-dashboard-raw`);
    window.location.reload()

};

//Edit purchase order raw
export const editPurchaseOrderRaw = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    const response = await api.patch(`/api/sales/purchase-orders-raw/update-purchase-order-raw/${id}`, { ...formValues, user }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_RAW, payload: response.status });
    console.log("res", response)
    setTimeout(function () {
        history.push(`/approvals-single-raw/${formValues.id}`);
        window.location.reload()
    }, 2000);
};
//Purchase Order GRN
export const grnPurchaseOrderRaw = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/grn-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_GRN_PURCHASE_ORDER_RAW, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        window.location.reload()
    }, 2000);

};
//Returns 
export const returnsPurchaseOrderRaw = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-raw/returns-purchase-order-raw/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_RAW, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        // window.location.reload()
    }, 2000);

};
//Print GRN RM
export const printGrnRaw = (id, grnId) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=purchaseorderrm.pdf'

        }
    };
    const response = await api.get(`/api/sales/purchase-orders-raw/print-grn-raw/${id}/${grnId}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//Search purchase orders raw
export const searchPurchaseOrdersRaw = (formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('api/sales/purchase-orders-raw/search-purchase-order-raw', { formValues }, header);
    console.log(response.data);
    dispatch({ type: SEARCH_PURCHASE_ORDERS_RESULT_RAW, payload: response.data });
};
//Print purchase oreder raw
export const printPurchaseOrderRaw = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=purchaseorderrm.pdf'

        }
    };
    const response = await api.get(`/api/sales/purchase-orders-raw/print-purchase-order-raw/${id}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//View supplier invoice PDF
export const viewSupplierInvoiceRaw = (suplierInvoicePdf) => async dispatch => {
    console.log(suplierInvoicePdf)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=invoice.pdf'

        }
    };

    const response = await api.get(`/${suplierInvoicePdf}`, { responseType: 'arraybuffer' }, header);
    //Create a Blob from the PDF Stream
    console.log(response)
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//create purchase order packing
export const createPurchaseOrderPacking = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    var formData = new FormData()
    formData.append('data', JSON.stringify(formValues))
    formData.append('user', JSON.stringify(user))
    formData.append('supplierInvoice', formValues.supplierInvoice)

    const response = await api.post('api/sales/purchase-orders-packing/new-purchase-order-packing', { ...formValues, user }, header);
    dispatch({ type: CREATE_PURCHASE_ORDER_PACKING, payload: response.status });
    setTimeout(function () {
        window.location.reload()
    }, 2000);

};
//List all purchase orders packing
export const fetchPurchaseOrdersPacking = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/sales/purchase-orders-packing/all-purchase-orders-packing', header);
    dispatch({ type: FETCH_PURCHASE_ORDERS_PACKING, payload: response.data });
};
//View purchase order packing
export const fetchPurchaseOrderPacking = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/sales/purchase-orders-packing/single-purchase-order-packing/${id}`, header);

    dispatch({ type: FETCH_PURCHASE_ORDER_PACKING, payload: response.data[0] });
};
//Edit purchase order packing
export const editPurchaseOrderPacking = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    const response = await api.patch(`/api/sales/purchase-orders-packing/update-purchase-order-packing/${id}`, { ...formValues, user }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_PACKING, payload: response.status });
    setTimeout(function () {
        history.push(`/approvals-single-packing/${formValues.id}`);
        window.location.reload()
    }, 2000);
};
//Edit purchase order packing
export const updatePurchaseOrderStatePacking = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/update-purchase-order-state-packing/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_PACKING, payload: response.data });
    history.push('/approvals-packing');
    window.location.reload()
};
//Purchase Order GRN
export const grnPurchaseOrderPacking = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/grn-purchase-order-packing/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_GRN_PURCHASE_ORDER_PACKING, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        window.location.reload()
    }, 2000);

};
export const bankPaymentsPurchaseOrderPacking = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/bank-payments-purchase-order-packing/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_BANK_PAYMENT_PURCHASE_ORDER_PACKING, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const cashPaymentsPurchaseOrderPacking = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/cash-payments-purchase-order-packing/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_CASH_PAYMENT_PURCHASE_ORDER_PACKING, payload: response.status });
    console.log(response.status)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const additionalChargesBankPaymentsPurchaseOrderPacking = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/additional-charges-bank-payments-purchase-order-packing/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_ADDITIONAL_BANK_PAYMENT_PURCHASE_ORDER_PACKING, payload: response.status });
    console.log(response.data)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const additionalChargesCashPaymentsPurchaseOrderPacking = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/additional-charges-cash-payments-purchase-order-packing/${id}`, { ...formValues }, header);
    dispatch({ type: NEW_ADDITIONAL_CASH_PAYMENT_PURCHASE_ORDER_PACKING, payload: response.status });
    console.log(response.data)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
export const deletePurchaseOrderStatePacking = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/sales/purchase-orders-packing/update-purchase-order-state-packing/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_PURCHASE_ORDER_PACKING, payload: response.data });
    history.push('/purchase-order-dashboard-packing');
    window.location.reload()
};
//Search purchase orders raw
export const searchPurchaseOrdersPacking = (formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('api/sales/purchase-orders-packing/search-purchase-order-packing', { formValues }, header);
    console.log(response.data);
    dispatch({ type: SEARCH_PURCHASE_ORDERS_RESULT_PACKING, payload: response.data });
};
//Print purchase oreder packing
export const printPurchaseOrderPacking = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=purchaseorderrm.pdf'

        }
    };
    const response = await api.get(`/api/sales/purchase-orders-packing/print-purchase-order-packing/${id}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//View supplier invoice PDF
export const viewSupplierInvoicePacking = (suplierInvoicePdf) => async dispatch => {
    console.log(suplierInvoicePdf)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=invoice.pdf'

        }
    };
    const response = await api.get(`/${suplierInvoicePdf}`, { responseType: 'arraybuffer' }, header);
    //Create a Blob from the PDF Stream
    console.log(response)
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//create invoice
export const createInvoice = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    console.log(user)
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/sales/invoices/new-invoice', { ...formValues, user }, header);
    dispatch({ type: CREATE_INVOICE, payload: response.status });  
    console.log(response)
    setTimeout(function () {
        window.location.reload()
    }, 2000);
};
//List all invoice
export const fetchInvoices = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('api/sales/invoices/all-invoices', header);
    dispatch({ type: FETCH_INVOICES, payload: response.data });
};
//View invoice
export const fetchInvoice = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`api/sales/invoices/single-invoice/${id}`, header);
    dispatch({ type: FETCH_INVOICE, payload: response.data[0] });
};
//Edit invoice
export const editInvoice = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-invoice/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    window.location.reload()
};
//Update dispatch note
export const updateDispatchNote = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-dispatch-note/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    window.location.reload()
};
export const updateInvoice = (id, haveReturns) => async dispatch => {

    const formValues = {}
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-invoice/${id}`, { ...formValues, haveReturns }, header);
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    //window.location.reload()
};
export const disableInvoice = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-invoice/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    history.push("/invoice-dashboard");
    window.location.reload()
};
//Delete invoice
export const deleteInvoice = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/sales/invoices/delete-invoice/${id}`, header);
    dispatch({ type: DELETE_INVOICE, payload: id });
    history.push('/invoice-dashboard')
    //window.location.reload()
};
//Search invoices
export const searchInvoices = (formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('api/sales/invoices/search-invoices/', { formValues }, header);
    console.log(response.data);
    dispatch({ type: SEARCH_INVOICES_RESULT, payload: response.data });
};
//Print invoice
export const printInvoice = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=invoice.pdf'

        }
    };
    const response = await api.get(`/api/sales/invoices/print-invoice/${id}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//Print invoice
export const printDispatchNote = (id, dispatchId) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=invoice.pdf'

        }
    };
    const response = await api.get(`/api/sales/invoices/print-print-dispatch-note/${id}/${dispatchId}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//create return invoice
export const createReturnInvoice = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    console.log(user)
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/sales/return-invoices/new-return-invoice', { ...formValues, user }, header);
    console.log(response)
    dispatch({ type: CREATE_RETURN_INVOICE, payload: response.data });
    history.push(`/edit-invoice/${formValues.id}`)
    //window.location.reload()

};
//List all invoice
export const fetchReturnInvoices = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('api/sales/return-invoices/all-return-invoices', header);
    dispatch({ type: FETCH_RETURN_INVOICES, payload: response.data });
};
//View invoice
export const fetchReturnInvoice = (id) => async dispatch => {
    console.log(id)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/sales/return-invoices/single-return-invoice/${id}`, header);
    console.log(response.data[0])
    if (response.data[0] === undefined || response.data[0] === null) {
        dispatch({ type: NO_RETURN_INVOICE, payload: "No Return Invoice" });
    } if (response.data[0]) {
        dispatch({ type: FETCH_RETURN_INVOICE, payload: response.data[0] });
    }
    // return async (dispatch) => {
    //     try {
    //         const response = await api.get(`/api/sales/return-invoices/single-return-invoice/${id}`, header);
    //         console.log(response)
    //         dispatch({ type: FETCH_RETURN_INVOICE, payload: response.data[0] });
    //     } catch (error) {
    //         console.log("Go")
    //         dispatch({
    //             type: NO_RETURN_INVOICE,
    //             payload: 'No Return Invoices'
    //         });
    //     }
    // };

};
//Edit invoice
export const editReturnInvoice = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-invoice/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    window.location.reload()
};
export const disableReturnInvoice = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-invoice/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    history.push("/invoice-dashboard");
    window.location.reload()
};
//Delete invoice
export const deleteReturnInvoice = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/sales/invoices/delete-invoice/${id}`, header);
    dispatch({ type: DELETE_INVOICE, payload: id });
    history.push('/invoice-dashboard')
    //window.location.reload()
};
//Search invoices
export const searchReturnInvoices = (formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('api/sales/return-invoices/search-return-invoices/', { formValues }, header);
    console.log(response.data);
    dispatch({ type: SEARCH_RETURN_INVOICES_RESULT, payload: response.data });
};
//Print invoice
export const printReturnInvoice = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=invoice.pdf'

        }
    };
    const response = await api.get(`/api/sales/return-invoices/print-return-invoice/${id}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//Create quotation
export const createQuotation = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    try {
        const response = await api.post('api/sales/quotations/new-quotation', { ...formValues, user }, header);
        dispatch({ type: CREATE_QUOTATION, payload: response.status });
        console.log(response.status)
        setTimeout(function () {
            window.location.reload()
        }, 2000);
    } catch (error) {
        dispatch({
            type: CREATE_QUOTATION_ERROR,
            payload: 'Something went wrong. Please contact the administrator support!'
        });
    }



};
//List all quotations
export const fetchQuotations = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('api/sales/quotations/all-quotations', header);
    dispatch({ type: FETCH_QUOTATIONS, payload: response.data });
};
//View quotation
export const fetchQuotation = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`api/sales/quotations/single-quotation/${id}`, header);

    dispatch({ type: FETCH_QUOTATION, payload: response.data[0] });
};
//get quotation for invoice creation
export const fetchQuotationForInvoice = (quotationNumber) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`api/sales/quotations/single-quotation-invoice/${quotationNumber}`, header);

    dispatch({ type: FETCH_QUOTATION_FOR_INVOICE, payload: response.data[0] });
};
//Edit quotation
export const editQuotation = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/quotations/update-quotation/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_QUOTATION, payload: response.data });
    history.push("/quotation-dashboard");
    window.location.reload()
};
//Update quotation
export const updateQuotation = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/quotations/update-quotation/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_QUOTATION, payload: response.data });
    history.push(`/approvals-single-quotation/${formValues.id}`);
    window.location.reload()
};
//Disable quotation
export const disableQuotation = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/quotations/update-quotation/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_QUOTATION, payload: response.data });
    history.push("/approvals-quotations");
    window.location.reload()
};
//Approve quotation
export const approveQuotation = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/quotations/update-quotation/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_QUOTATION, payload: response.data });
    history.push("/approvals-quotations");
    window.location.reload()
};
//Search quotation
export const searchQuotations = (formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('api/sales/quotations/search-quotation/', { formValues }, header);
    console.log(response.data);
    dispatch({ type: SEARCH_QUOTATIONS_RESULT, payload: response.data });
};
//Print quotation
export const printQuotation = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=invoice.pdf'

        }
    };
    const response = await api.get(`/api/sales/quotations/print-quotation/${id}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//create BOM
export const createBom = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    console.log(user)
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/master-data/bom/new-bom', { ...formValues, user }, header);
    dispatch({ type: CREATE_BOM, payload: response.data });
    window.location.reload()

};
//List all BOMs
export const fetchBoms = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/bom/all-boms', header);
    dispatch({ type: FETCH_BOMS, payload: response.data });
};
//View BOM
export const fetchBom = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`api/master-data/bom/single-bom/${id}`, header);
    dispatch({ type: FETCH_BOM, payload: response.data[0] });
};
//Edit BOM
export const editBom = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/master-data/bom/update-bom/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_BOM, payload: response.data });
    history.push(`/single-bom/${formValues.id}`);
    window.location.reload()
};
//Delete BOM
export const deleteBom = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/master-data/bom/delete-bom/${id}`, header);
    dispatch({ type: DELETE_BOM, payload: id });
    history.push('/bom')
    window.location.reload()
};

//create finish good inventory
export const createFinishGoodInventory = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    console.log(user)
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('api/inventory/finish-good/new-finish-good-inventory', { ...formValues, user }, header);
    console.log(response)
    dispatch({ type: NEW_FINISH_GOOD_INVENTORY, payload: response.data });
    window.location.reload()

};
//List finish good inventory
export const fetchFinishGoodsInventory = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('api/inventory/finish-good/all-finish-goods-inventory/', header);

    dispatch({ type: FETCH_FINISH_GOODS_INVENTORY, payload: response.data });
};
//View finish good inventory
export const fetchFinishGoodInventory = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`api/inventory/finish-good/single-finish-good-inventory/${id}`, header);
    dispatch({ type: FETCH_FINISH_GOOD_INVENTORY, payload: response.data[0] });
};
//Edit finish good inventory
export const updateFinishGoodInventory = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/sales/invoices/update-invoice/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_FINISH_GOOD_INVENTORY, payload: response.data });
    window.location.reload()
};
//Disable finish good inventory
export const reviseFinishGoodInventory = (id, formValues) => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`api/inventory/finish-good/update-finish-good-inventory/${id}`, { ...formValues }, header);
    dispatch({ type: DISABLE_FINISH_GOOD_INVENTORY, payload: response.data });
    history.push("/finish-good-inventory-dashboard/");
    window.location.reload()
};
//Search finish goods inventory
//Search quotation
export const searchFinishGoodsInventory = (formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('api/inventory/finish-good/search-finish-good-inventory/', { formValues }, header);
    dispatch({ type: SEARCH_FINISH_GOODS_INVENTORY, payload: response.data });
};


//create employee
export const createSalary = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.post('/api/hr/salaries/new-salary/', { ...formValues, user }, header);
    dispatch({ type: NEW_SALARY, payload: response.data });
    console.log(response)
    window.location.reload()
};
//List all distributors
export const fetchSalaries = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/hr/salaries/all-salaries/', header);
    dispatch({ type: FETCH_SALARIES, payload: response.data });
};
//View single distributor
export const fetchSalary = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/hr/salaries/single-salary/${id}`, header);
    console.log(response.data)
    dispatch({ type: FETCH_SALARY, payload: response.data[0] });
};
//Edit distributor
export const editSalary = (id, formValues) => async dispatch => {

    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/hr/salaries/update-salary/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_SALARY, payload: response.data });
    history.push(`/single-salary/${formValues.id}`)
    window.location.reload()
};
//Delete distributor
export const deleteSalary = (id) => async dispatch => {
    console.log(id)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    await api.delete(`/api/hr/salaries/delete-salary/${id}`, header);
    dispatch({ type: DELETE_SALARY, payload: id });
    history.push('/salaries-dashboard');
    window.location.reload()
};
//Print salary sheet
export const printSalary = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf',
            'Content-Disposition': 'attachment;filename=purchaseorderrm.pdf'

        }
    };
    const response = await api.get(`/api/hr/salaries/print-salary/${id}`, { responseType: 'arraybuffer' }, header, { id });
    //Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
};
//Search salary 
export const searchSalaries = (formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('/api/hr/salaries/search-salary/', { formValues }, header);
    console.log(response.data);
    dispatch({ type: SEARCH_SALARIES_RESULT, payload: response.data });
};
export const createBankAccount = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const user = jwt_decode(token);
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    console.log(formValues)
    const response = await api.post('/api/master-data/bank-accounts-master/new-bank-account', { ...formValues, user }, header);
    dispatch({ type: NEW_BANK_ACCOUNT_MASTER, payload: response.status });
    setTimeout(function () {
        window.location.reload()
    }, 3000);
};
//List all distributors
export const fetchBankAccounts = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get('/api/master-data/bank-accounts-master/all-bank-accounts', header);
    dispatch({ type: FETCH_ALL_BANK_ACCOUNTS, payload: response.data });
};
//View single distributor
export const fetchBankAccount = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    console.log(id)
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.get(`/api/master-data/bank-accounts-master/single-bank-account/${id}`, header);
    console.log(response.data)
    dispatch({ type: FETCH_SINGLE_BANK_ACCOUNT, payload: response.data });
};
//Edit distributor
export const editBankAccount = (id, formValues) => async dispatch => {

    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await api.patch(`/api/master-data/bank-accounts-master/update-bank-account/${id}`, { ...formValues }, header);
    dispatch({ type: EDIT_BANK_ACCOUNT, payload: response.status });
    setTimeout(function () {
        history.push('/bank-accounts-dashboard');
        window.location.reload()
    }, 3000);
};
//Delete distributor
export const deleteBankAccount = (id, deleted) => async dispatch => {
    console.log(id)
    console.log(deleted)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    const response = await api.patch(`/api/master-data/bank-accounts-master/delete-bank-account/${id}`, { deleted }, header);
    dispatch({ type: DELETE_BANK_ACCOUNT, payload: response.data });
    console.log(response.data)
    history.push('/bank-accounts-dashboard');
    window.location.reload()
};
//Autheticate User
export function signInAction({ userName, password }, history) {
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return async (dispatch) => {
        try {
            const res = await api.post('/api/auth/login', { userName, password }, header);
            console.log(res)
            dispatch({ type: AUTHENTICATED, payload: res.data });
            history.push('/');
            window.location.reload();
        } catch (error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid username or password'
            });
        }
    };
}
//logout user
export function signOutAction() {
    sessionStorage.clear();
    history.push('/login');
    window.location.reload();
    //window.location.reload();
    return {
        type: UNAUTHENTICATED
    };
}