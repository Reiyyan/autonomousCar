var chai = require('chai')
var chaiHttp = require('chai-http');
var expect = require('chai').expect
chai.use(chaiHttp);
var equal = require('deep-equal');

// Services for testing
var CarDriver = require('../services/CarDriver');
var RouteAPI = require('../services/RouteAPI');

// Timeout at 6 seconds (due to random taking up to 5 seconds)
const time = 6000;

let driverObject = new CarDriver();

let baseUrl = 'http://localhost:3000'

// NOTE: I've kept all tests in one file for sake of simplicity for the time being, in a real project tests would be split out per components.

describe('Testing Points API', function () {
    it('GET /empty-route', async () => {
        let resultAPI = await RouteAPI.getEmptyRoute();
        let expectedResult = {
            status: 200,
            data: {
                route: {
                    "track": [],
                    "travelLog": []
                }
            }
        }
        expect(resultAPI).to.be.an('object');
        expect(resultAPI.status).to.equal(200);
        expect(resultAPI).to.eql(expectedResult);
    }).timeout(time);

    it('GET /success-no-obstacles', async () => {
        let resultAPI = await RouteAPI.getSuccessNoObstacles();
        let expectedResult = {
            status: 200,
            data: {
                route: {
                    "track": [],
                    "travelLog": [
                        {
                            "position": 1,
                            "laneChange": "left"
                        },
                        {
                            "position": 5,
                            "laneChange": "right"
                        },
                        {
                            "position": 10,
                            "laneChange": "right"
                        }
                    ]
                }
            }
        }
        expect(resultAPI).to.be.an('object');
        expect(resultAPI.status).to.equal(200);
        expect(resultAPI).to.eql(expectedResult);

    }).timeout(time);

    it('GET /success-with-obstacles', async () => {
        let resultAPI = await RouteAPI.getSuccessWithObstacles();
        let expectedResult = {
            status: 200,
            data: {
                route: {
                    "track": [
                        {
                            "position": 2,
                            "obstacles": ["a"]
                        },
                        {
                            "position": 5,
                            "obstacles": ["b"]
                        },
                        {
                            "position": 10,
                            "obstacles": ["b", "c"]
                        }
                    ],
                    "travelLog": [
                        {
                            "position": 5,
                            "laneChange": "left"
                        },
                        {
                            "position": 6,
                            "laneChange": "right"
                        },
                        {
                            "position": 8,
                            "laneChange": "left"
                        }
                    ]
                }
            }
        }
        expect(resultAPI).to.be.an('object');
        expect(resultAPI.status).to.equal(200);
        expect(resultAPI).to.eql(expectedResult);
    }).timeout(time);

    it('GET /failure-out-of-bounds', async () => {
        let resultAPI = await RouteAPI.getFailureOutOfBounds();
        let expectedResult = {
            status: 200,
            data: {
                route: {
                    "track": [],
                    "travelLog": [
                        {
                            "position": 1,
                            "laneChange": "left"
                        },
                        {
                            "position": 2,
                            "laneChange": "left"
                        },
                        {
                            "position": 3,
                            "laneChange": "left"
                        }
                    ]
                }
            }
        }
        expect(resultAPI).to.be.an('object');
        expect(resultAPI.status).to.equal(200);
        expect(resultAPI).to.eql(expectedResult);
    }).timeout(time);

    it('GET /failure-hits-obstacle', async () => {
        let resultAPI = await RouteAPI.getFailureHitsObstacle();
        let expectedResult = {
            status: 200,
            data: {
                route: {
                    "track": [
                        {
                            "position": 3,
                            "obstacles": ["b"]
                        }
                    ],
                    "travelLog": []
                }
            }
        }
        expect(resultAPI).to.be.an('object');
        expect(resultAPI.status).to.equal(200);
        expect(resultAPI).to.eql(expectedResult);
    }).timeout(time);

    it('GET /random', async () => {
        let resultAPI = await RouteAPI.getRandom();
        expect(resultAPI).to.be.an('object');
        expect(resultAPI).to.satisfy(function (resultAPI) { return (resultAPI.status === 200 || resultAPI.status === 500); });
        expect(resultAPI).to.satisfy(function (resultAPI) {
            // Performing a test on each expected output of random
            return (
                equal(resultAPI,
                    {
                        status: 200,
                        data: {
                            route: {
                                "track": [],
                                "travelLog": []
                            }
                        }
                    }
                )

                ||

                equal(resultAPI,
                    {
                        status: 200,
                        data: {
                            route: {
                                "track": [],
                                "travelLog": [
                                    {
                                        "position": 1,
                                        "laneChange": "left"
                                    },
                                    {
                                        "position": 5,
                                        "laneChange": "right"
                                    },
                                    {
                                        "position": 10,
                                        "laneChange": "right"
                                    }
                                ]
                            }
                        }
                    }
                )

                ||

                equal(resultAPI, {
                    status: 200,
                    data: {
                        route: {
                            "track": [
                                {
                                    "position": 2,
                                    "obstacles": ["a"]
                                },
                                {
                                    "position": 5,
                                    "obstacles": ["b"]
                                },
                                {
                                    "position": 10,
                                    "obstacles": ["b", "c"]
                                }
                            ],
                            "travelLog": [
                                {
                                    "position": 5,
                                    "laneChange": "left"
                                },
                                {
                                    "position": 6,
                                    "laneChange": "right"
                                },
                                {
                                    "position": 8,
                                    "laneChange": "left"
                                }
                            ]
                        }
                    }
                })

                ||

                equal(resultAPI,
                    {
                        status: 200,
                        data: {
                            route: {
                                "track": [],
                                "travelLog": [
                                    {
                                        "position": 1,
                                        "laneChange": "left"
                                    },
                                    {
                                        "position": 2,
                                        "laneChange": "left"
                                    },
                                    {
                                        "position": 3,
                                        "laneChange": "left"
                                    }
                                ]
                            }
                        }
                    })

                ||

                equal(resultAPI, {
                    status: 200,
                    data: {
                        route: {
                            "track": [
                                {
                                    "position": 3,
                                    "obstacles": ["b"]
                                }
                            ],
                            "travelLog": []
                        }
                    }
                })

                ||

                equal(resultAPI, { status: 500, data: null })

            );
        });
    }).timeout(time);

});

describe('Testing Car Driving Services', function () {
    it('GET /empty-route', async () => {
        let testRoute = {
            status: 200,
            data: {
                route: {
                    "track": [],
                    "travelLog": []
                }
            }
        }

        let resultDriver = await driverObject.runRoute(testRoute);
        expect(resultDriver).to.be.an('object');
        expect(resultDriver.status).to.equal('success');
    }).timeout(time);

    it('GET /success-no-obstacles', async () => {
        let testRoute = {
            status: 200,
            data: {
                route: {
                    "track": [],
                    "travelLog": [
                        {
                            "position": 1,
                            "laneChange": "left"
                        },
                        {
                            "position": 5,
                            "laneChange": "right"
                        },
                        {
                            "position": 10,
                            "laneChange": "right"
                        }
                    ]
                }
            }
        }

        let resultDriver = await driverObject.runRoute(testRoute);
        expect(resultDriver).to.be.an('object');
        expect(resultDriver.status).to.equal('success');

    }).timeout(time);

    it('GET /success-with-obstacles', async () => {
        let testRoute = {
            status: 200,
            data: {
                route: {
                    "track": [
                        {
                            "position": 2,
                            "obstacles": ["a"]
                        },
                        {
                            "position": 5,
                            "obstacles": ["b"]
                        },
                        {
                            "position": 10,
                            "obstacles": ["b", "c"]
                        }
                    ],
                    "travelLog": [
                        {
                            "position": 5,
                            "laneChange": "left"
                        },
                        {
                            "position": 6,
                            "laneChange": "right"
                        },
                        {
                            "position": 8,
                            "laneChange": "left"
                        }
                    ]
                }
            }
        }

        let resultDriver = await driverObject.runRoute(testRoute);
        expect(resultDriver).to.be.an('object');
        expect(resultDriver.status).to.equal('success');

    }).timeout(time);

    it('GET /failure-out-of-bounds', async () => {
        let testRoute = {
            status: 200,
            data: {
                route: {
                    "track": [],
                    "travelLog": [
                        {
                            "position": 1,
                            "laneChange": "left"
                        },
                        {
                            "position": 2,
                            "laneChange": "left"
                        },
                        {
                            "position": 3,
                            "laneChange": "left"
                        }
                    ]
                }
            }
        }

        let resultDriver = await driverObject.runRoute(testRoute);
        expect(resultDriver).to.be.an('object');
        expect(resultDriver.status).to.equal('error');
        expect(resultDriver.position).to.equal(2);
    }).timeout(time);

    it('GET /failure-hits-obstacle', async () => {
        let testRoute = {
            status: 200,
            data: {
                route: {
                    "track": [
                        {
                            "position": 3,
                            "obstacles": ["b"]
                        }
                    ],
                    "travelLog": []
                }
            }
        }

        let resultDriver = await driverObject.runRoute(testRoute);
        expect(resultDriver).to.be.an('object');
        expect(resultDriver.status).to.equal('error');
        expect(resultDriver.position).to.equal(3);
    }).timeout(time);

    it('GET /random', async () => {
        let testRoute = {
            status: 500,
            data: null
        }

        let resultDriver = await driverObject.runRoute(testRoute);
        expect(resultDriver.status).to.equal('error');
        expect(resultDriver.position).to.equal(0);
    }).timeout(time);

});

describe('Testing Express Routes', function () {
    it('GET /empty-route', async () => {
        let result = await chai.request(baseUrl).get(`/drive/empty-route`);
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body.status).to.equal('success');
    }).timeout(time);

    it('GET /success-no-obstacles', async () => {
        let result = await chai.request(baseUrl).get(`/drive/success-no-obstacles`);
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body.status).to.equal('success');
    }).timeout(time);

    it('GET /success-with-obstacles', async () => {
        let result = await chai.request(baseUrl).get(`/drive/success-with-obstacles`);
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body.status).to.equal('success');
    }).timeout(time);

    it('GET /failure-out-of-bounds', async () => {
        let result = await chai.request(baseUrl).get(`/drive/failure-out-of-bounds`);
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body.status).to.equal('error');
        expect(result.body.position).to.equal(2);
    }).timeout(time);

    it('GET /failure-hits-obstacle', async () => {
        let result = await chai.request(baseUrl).get(`/drive/failure-hits-obstacle`);
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body.status).to.equal('error');
        expect(result.body.position).to.equal(3);
    }).timeout(time);

    it('GET /random', async () => {
        let result = await chai.request(baseUrl).get(`/drive/random`);
        expect(result.status).to.equal(200);
        if (result.body.status === 'error') {
            expect(result.body.position).to.be.an('number');
        }
        else {
            expect(result.body.status).to.equal('success');
        }

    }).timeout(time);

});