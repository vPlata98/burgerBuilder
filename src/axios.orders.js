import axios from 'axios'

const instance = axios.create(
    {
        baseURL:'https://react-my-burger-24c2e-default-rtdb.firebaseio.com/'
    }
);

export default instance;