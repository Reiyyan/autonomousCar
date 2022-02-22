# autonomousCar
 
Please ensure points API is running in your docker environment on localhost:5000
## Docker Setup

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5000:5000 -it ptsdocker16/interview-test-server
```

## Express Setup
Ensure you are on NodeJS v16.7.0+
In your choice of shell

Setup
```bash
$ npm install
```

Running the Server
```bash
$ npm start
```

Manual Testing
http://localhost:3000/drive/
http://localhost:3000/drive/empty-route,
http://localhost:3000/drive/success-no-obstacles,
http://localhost:3000/drive/success-with-obstacles,
http://localhost:3000/drive/failure-out-of-bounds,
http://localhost:3000/drive/failure-hits-obstacle,
http://localhost:3000/drive/random

Automated Testing
```bash
$ npm install
$ npm test
```