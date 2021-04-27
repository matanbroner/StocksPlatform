import axios from "axios";
import mockRoutes from "./mockRoutes";

class ApiHandler {
  constructor() {
    // if mock explicitly set or null api token, mock all responses
    // this means we should never pass null if not mocking
    if (process.env.REACT_ENV_API_MOCK === true) {
      this.mock = true;
    }
    if (process.env.NODE_ENV === "production") {
      this.urlBase = `https://${process.env.REACT_ENV_DOMAIN}/api`;
    } else {
      this.urlBase = "http://localhost/api";
    }
  }

  setToken(authToken){
      this.authToken = authToken
  }

  revokeToken(){
    this.authToken = null
}

  get(service, route, headers = {}, data = {}) {
    return this._request("GET", service, route, headers, data);
  }

  post(service, route, headers = {}, data = {}) {
    return this._request("POST", service, route, headers, data);
  }

  put(service, route, headers = {}, data = {}) {
    return this._request("PUT", service, route, headers, data);
  }

  delete(service, route, headers = {}, data = {}) {
    return this._request("DELETE", service, route, headers, data);
  }

  async _request(method, service, route, headers = {}, data = {}) {
    if (this.mock) {
      return this._mock_request(service, method, route, headers, data);
    }
    headers["Authorization"] = `Bearer ${this.authToken}`;
    headers["Access-Control-Allow-Origin"] = "*";
    const url = `${this.urlBase}/${service}/${route}`;
    try {
      const res = await axios({
        method,
        headers,
        url,
        data,
      });
      return Promise.resolve(res.data);
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({
          status: 500,
          error: "HTTP Error",
        });
      }
    }
  }

  _mock_request(service, method, route, headers = {}, data = {}) {
    let methods = mockRoutes[service];
    route = route.split("/");
    let routeIndex = 0;
    let activeMethod = methods[route[routeIndex]];
    while (true) {
      if (route[routeIndex + 1] !== null) {
        activeMethod = route[++routeIndex];
      } else {
        break;
      }
    }
    return activeMethod(method, route.slice(routeIndex), data);
  }
}

export default new ApiHandler();
