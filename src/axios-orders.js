import axios from 'axios';

// const accessToken = 'AAAAl-QYQOs:APA91bF2fEH91X8BLaXTkDdMEIyQaq7bwyRW7W823WNhpwWFrLiqrQrDQ8_IQ8mWz16yU2ji3q_xnxws7CtqhyFDn6Z4WTPVrkXHCLQFmjvIE-Buu1m9Vuw0BwHm_aTU7ctHXB-SAoRN';

const instance = axios.create({
 baseURL: 'https://reactjs-68c81.firebaseio.com',//'https://react-my-burger-8b647.firebaseio.com'
//  headers: {
//     'Authorization': 'Bearer ' + accessToken
//   }
});


export default instance;