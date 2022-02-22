var axios = require('axios');

let baseUrl = 'http://localhost:5000/autonomous-car/routes'

/**
 *  Simple helper class to handle autonomous-car API calls and sanitize data as needed.
 * */
class RouteAPI {

    static async getEmptyRoute() {
        let result = await axios.get(`${baseUrl}/empty-route`).catch(e => {
            return { status: e.response.status, data: null }
        });
        return { status: result.status, data: result.data };
    }

    static async getSuccessNoObstacles() {
        let result = await axios.get(`${baseUrl}/success-no-obstacles`).catch(e => {
            return { status: e.response.status, data: null }
        });
        return { status: result.status, data: result.data };
    }

    static async getSuccessWithObstacles() {
        let result = await axios.get(`${baseUrl}/success-with-obstacles`).catch(e => {
            return { status: e.response.status, data: null }
        });
        return { status: result.status, data: result.data };
    }

    static async getFailureOutOfBounds() {
        let result = await axios.get(`${baseUrl}/failure-out-of-bounds`).catch(e => {
            return { status: e.response.status, data: null }
        });
        return { status: result.status, data: result.data };
    }

    static async getFailureHitsObstacle() {
        let result = await axios.get(`${baseUrl}/failure-hits-obstacle`).catch(e => {
            return { status: e.response.status, data: null }
        });
        return { status: result.status, data: result.data };
    }

    static async getRandom() {
        let result = await axios.get(`${baseUrl}/random`).catch(e => {
            return { status: e.response.status, data: null }
        });

        return { status: result.status, data: result.data };
    }
}

module.exports = RouteAPI;