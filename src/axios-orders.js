import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8b647.firebaseio.com/'//'https://reactjs-68c81.firebaseio.com'
});

export default instance;