var CarDriver = require('../services/CarDriver');
var RouteAPI = require('../services/RouteAPI');

let driverObject = new CarDriver();

exports.emptyRoute = async function (req, res) {
    let resultAPI = await RouteAPI.getEmptyRoute();
    let resultDriving = await driverObject.runRoute(resultAPI);
    return (resultDriving);
};

exports.successNoObstacles = async function (req, res) {
    let resultAPI = await RouteAPI.getSuccessNoObstacles();
    let resultDriving = await driverObject.runRoute(resultAPI);
    return (resultDriving);
};

exports.successWithObstacles = async function (req, res) {
    let resultAPI = await RouteAPI.getSuccessWithObstacles();
    let resultDriving = await driverObject.runRoute(resultAPI);
    return (resultDriving);
};

exports.failureOutOfBounds = async function (req, res) {
    let resultAPI = await RouteAPI.getFailureOutOfBounds();
    let resultDriving = await driverObject.runRoute(resultAPI);
    return (resultDriving);
};

exports.failureHitsObstacle = async function (req, res) {
    let resultAPI = await RouteAPI.getFailureHitsObstacle();
    let resultDriving = await driverObject.runRoute(resultAPI);
    return (resultDriving);
};

exports.random = async function (req, res) {
    let resultAPI = await RouteAPI.getRandom();
    let resultDriving = await driverObject.runRoute(resultAPI);
    return (resultDriving);
};