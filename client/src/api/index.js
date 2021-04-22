import axios from "axios";
import mockRoutes from "./mockRoutes"

class ApiHandler {
    constructor(authToken = null) {
        // if mock explicitly set or null api token, mock all responses
        // this means we should never pass null if not mocking
        if (process.env.REACT_ENV_API_MOCK === true) {
            this.mock = true;
        } else {
            this.authToken = authToken;
        }
        if (process.env.NODE_ENV === "production") {
            this.urlBase = `https://${REACT_ENV_DOMAIN}`
        } else {
            this.urlBase = "http://localhost";
        }
    }

    get(service, route, headers = {}, data = {}) {
        return this._request("GET", service, route, headers, data)
    }

    post(service, route, headers = {}, data = {}) {
        return this._request("POST", service, route, headers, data)
    }

    put(service, route, headers = {}, data = {}) {
        return this._request("PUT", service, route, headers, data)
    }

    delete(service, route, headers = {}, data = {}) {
        return this._request("DELETE", service, route, headers, data)
    }

    _request(method, service, route, headers = {}, data = {}) {
        if (this.mock) {
            return this._mock_request(service, method, route, headers, json);
        }
        headers["Authorization"] = `Bearer ${this.authToken}`;
        const url = `${this.urlBase}/${route}`
        return axios({
            method,
            headers,
            url,
            data
        })
    }

    _mock_request(service, method, route, headers = {}, data = {}) {
        let methods = mockRoutes[service]
        route = route.split("/");
        let routeIndex = 0;
        let activeMethod = methods[route[routeIndex]]
        while (true){
            if(route[routeIndex + 1] !== null){
                activeMethod = route[++routeIndex];
            } else {
                break;
            }
        }
        return activeMethod(method, route.slice(routeIndex), data);
    }
}

let api = ApiHandler("123")

export default ApiHandler