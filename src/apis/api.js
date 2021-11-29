import axios from 'axios';

export default axios.create({    
    baseURL: 'https://helawaruna-erp-backend.herokuapp.com/'
    //baseURL: 'http://localhost:5001/'    
});