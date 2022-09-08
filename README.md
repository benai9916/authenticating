## Steps to run Backend
1. Install node 16+
2. `run node app.js` to run the server 
3. Databse is MongoDb, and it is connect Mongodb Atlas


### Accessing the api's
- Backend server is deployed in heroku 
- BASE URL `authenticatingapi.herokuapp.com/api/v1/`
- All the routes are protecte via jtw token, it is httponly token
- To generate token you can register yourself 
```
    API: https://authenticatingapi.herokuapp.com/api/v1/signup
    Method: POST
    Body: {
	"firstName": "",
	"lastName": "",
	"email": "",
	"password": "",
	"role": "admin" 
  }
```


- or Sign in using



```
    API: https://authenticatingapi.herokuapp.com/api/v1/signin
     Methos: POST
    Body :
      {
	    "email": "test@gmail.com",
	    "password": "test@123"
      }
```

#### Ticket Route
- Get all ticket -> `GET: https://authenticatingapi.herokuapp.com/api/v1/ticket/all`
- Get open ticket -> `GET: https://authenticatingapi.herokuapp.com/api/v1/ticket/open`
- Get close ticket -> `GET: https://authenticatingapi.herokuapp.com/api/v1/ticket/close`
- Book Seat -> 
```
API: https://authenticatingapi.herokuapp.com/api/v1/ticket/{seatNumber}/book
Method: POST
Body: 
Required field: none
Optional: {
	"firstName": "",
	"lastName": "",
  "source": "",
  "destination": ""
}
```
- Get ticket status -> `https://authenticatingapi.herokuapp.com/api/v1/ticket/{seatNumber}/status`
- Get ticket detail -> `https://authenticatingapi.herokuapp.com/api/v1/ticket/{seatNumber}/detail`
- Update ticket detail ->
```
API: https://authenticatingapi.herokuapp.com/api/v1/ticket/2C/update
Method: PATCH
Body:
Required fields : none
Optional fields: {
	"pricePerSeat": 600,
	"firstName": "",
	"lastName": "",
  "source": "",
  "destination": ""
}

-------- or ------
# close ticket by passing seatStatus to close
API: https://authenticatingapi.herokuapp.com/api/v1/ticket/2C/update
Method: PATCH
Body:
{ "seatStatus": "close" }

```
- Add ticket (more seats) -> 
```
API : https://authenticatingapi.herokuapp.com/api/v1/ticket/add
Method: POST
Body : { "seatNumber": "1A"}
```
- Open up all tickets (reset) -> `https://authenticatingapi.herokuapp.com/api/v1/ticket/reset`
