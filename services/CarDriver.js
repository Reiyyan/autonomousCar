// import RouteAPI from './RouteAPI.js';
// var RouteAPI = require('./RouteAPI')

/**
 *  Class to handle driving the car, and running its route.
 * */
class CarDriver {

    /**
     * Get the largest endpoint between the given track or travel log
     * @return {number} The end point of travelling.
     */
    getEndPoint(track, travelLog) {
        let lastTrack = track?.[track.length - 1]?.position ?? 0;
        let lastTravel = travelLog?.[travelLog.length - 1]?.position ?? 0;
        return lastTrack > lastTravel ? lastTrack : lastTravel;
    }

    /**
     * Build a map of positions and their respective obstacles in tracks.
     * @return {object} { positions: [obstacles] }
     */
    buildTrackSet(routeList) {
        let trackMap = {};
        for (let item of routeList ?? []) {
            trackMap[item.position] = item.obstacles;
        }
        return trackMap;
    }

    /**
     * Build a map of positions and their respective obstacles in travel logs.
     * @return {object} { positions: [obstacles] }
     */
    buildTravelLog(routeList) {
        let travelMap = {};
        for (let item of routeList ?? []) {
            travelMap[item.position] = item.laneChange;
        }
        return travelMap;
    }

    /**
     * Runs car through the input route.
     */
    async runRoute(input) {
        if (input.status >= 500) {
            return { status: 'error', position: 0 };
        }
        let track = this.buildTrackSet(input?.data?.route?.track);
        let travelLog = this.buildTravelLog(input?.data?.route?.travelLog);
        let endPoint = this.getEndPoint(
            input?.data?.route?.track,
            input?.data?.route?.travelLog
        );

        let currentPosition = 0;

        // I'm choosing to use lanes as integers, for quick/easy handling
        let laneList = ['a', 'b', 'c'];
        let currentLane = 1;

        for (currentPosition; currentPosition <= endPoint; currentPosition++) {
            // Handle travelLog first
            if (travelLog[currentPosition]) {
                if (travelLog[currentPosition] === 'left') {
                    currentLane -= 1;
                } else {
                    currentLane += 1;
                }
            }

            // Check if there is an obstacle here
            if (track[currentPosition]) {
                // If the obstacle array is in our lane, we have a collision
                if (track[currentPosition].includes(laneList[currentLane])) {
                    return { status: 'error', position: currentPosition };
                }
            }

            if (currentLane <= -1 || currentLane > 2) {
                return { status: 'error', position: currentPosition };
            }
        }
        return { status: 'success' };
    }
}

module.exports = CarDriver;