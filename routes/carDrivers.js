var express = require('express');
var router = express.Router();
var carDriverController = require('../controllers/carDriverController');

// Route created for ease of human testing
router.get('/', async function (req, res, next) {
  const baseUrl = 'http://localhost:3000/drive';
  let response = {
    routes: [
      `${baseUrl}/empty-route`,
      `${baseUrl}/success-no-obstacles`,
      `${baseUrl}/success-with-obstacles`,
      `${baseUrl}/failure-out-of-bounds`,
      `${baseUrl}/failure-hits-obstacle`,
      `${baseUrl}/random`
    ]
  }
  res.send(response);
});

router.get('/empty-route', async function (req, res, next) {
  let response = await carDriverController.emptyRoute();
  res.send(response);
});

router.get('/success-no-obstacles', async function (req, res, next) {
  let response = await carDriverController.successNoObstacles();
  res.send(response);
});

router.get('/success-with-obstacles', async function (req, res, next) {
  let response = await carDriverController.successWithObstacles();
  res.send(response);
});

router.get('/failure-out-of-bounds', async function (req, res, next) {
  let response = await carDriverController.failureOutOfBounds();
  res.send(response);
});

router.get('/failure-hits-obstacle', async function (req, res, next) {
  let response = await carDriverController.failureHitsObstacle();
  res.send(response);
});

router.get('/random', async function (req, res, next) {
  let response = await carDriverController.random();
  res.send(response);
});

module.exports = router;
