import {
    ipAddress
} from './contants';
const axios = require('axios');
const localStorage = require('local-storage');

// let isAuth = true;
// setTimeout(() => {
//     axios.get(`${ipAddress}/api/driver-middleware/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.get('token')}`
//         }
//     })
//     .then((response) => {
        
//     })
//     .catch(error => {
//         isAuth = false;
//         console.log('Error!');
//     });
// }, 500);


class Auth {
    login(cb) {
        cb();
    }

    logout(cb) {
        localStorage.set('token', null);
        cb();
    }

    isAuthenticate() {
        return localStorage.get('token')
    }
}

export default new Auth();