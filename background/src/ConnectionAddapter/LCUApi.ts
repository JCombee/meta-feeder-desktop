import axios, {AxiosInstance} from "axios";
import LCUClient from "./LCU";

class LCUApi extends LCUClient {
    axios: AxiosInstance;
    
    initialize() {
        console.log('init api', Buffer.from(`${this.username}:${this.password}`).toString('base64'));

        this.axios = axios.create({
            headers: {
                'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`
            }
        });
    }

    get(uri: string) {
        const url = `${this.protocol}://${this.address}:${this.port}${uri}`;
        console.log('get:', url);
        return this.axios.get(url);
    }
}

export default LCUApi;