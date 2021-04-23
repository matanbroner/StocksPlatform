const jsonResponse = (status, data = {}, error = "") => {
    if (status < 200 || status > 299) {
        return {
            status,
            error
        }
    } else {
        return {
            status,
            data
        }
    }
}

const login = (method, params, data) => {
    return jsonResponse(200, {
        username: "mock_username",
        email: data.email,
    })
}

const restStocks = (method, params, data) => {
    if(method === "GET"){
        if(params.length > 0){
            return jsonResponse(200, [{
                id: 1,
                ticker: "TSLA",
                created_at: "2021-04-21 19:39:11.378040",
                updated_at: "2021-04-21 19:39:11.378040"
            }])
        } else {
            return jsonResponse(200, {
                id: 1,
                ticker: params[0],
                created_at: "2021-04-21 19:39:11.378040",
                updated_at: "2021-04-21 19:39:11.378040"
            })
        }
    }
}

export default {
    services: {
        users: {
            login: login
        },
        data: {
            stock: restStocks
        }
    }
}