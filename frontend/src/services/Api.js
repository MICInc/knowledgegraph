import axios from 'axios'
import store from '@/store'

export default () => {
    return axios.create({
        baseURL: `https://machineintelligence.cc/`,
        // baseURL: `http://localhost:7000/`,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
            'crossdomain': true,
            'Authorization': 'Bearer ' + store.state.accessToken
        }
    })
}