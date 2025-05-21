# Nearby-School-API

This project is a simple RESTful API built with Node.js and Express that allows users to manage and retrieve school data based on geographical proximity. The API provides two main functionalities: adding a new school to a MySQL database and listing all nearby schools sorted by distance from the user's current location. Users can add a school by sending a POST request to /addSchool with details like the school's name, address, latitude, and longitude. To retrieve the list of schools sorted by proximity, users can send a GET request to /listSchools/:latitude/:longitude, where the latitude and longitude are provided as URL parameters. The distance between the user and each school is calculated using the Geolib library, and the list is returned in order of closeness. This project includes a Postman collection for testing both endpoints with example data and responses.


 <h1>API: /listSchools</h1>
 <p>Description</p>
<i>This API provides a list of schools that are near a user's location based on the coordinates provided (latitude & longitude).</i>

 Endpoint
<b>GET https://nearby-school-api.onrender.com/listSchools</b>

 <p>Query Parameters (required)</p>
You must pass the user's location through query parameters:

latitude:	float ------------	User's current latitude
longitude:float	-------------User's current longitude

Example request 
<h3>GET https://nearby-school-api.onrender.com/listSchools?latitude=19.21&longitude=72.84</h3>
 Expected Response (200 OK)

[
{
  "id": "0f48eff7-d474-4998-8c92-c4634358ec9c",
    "name": "Mount Mary English High School",
    "address": "Vasai",
    "latitude": 19.3826,
    "longitude": 72.832
  },
  {
    "id": "7c609a91-0e96-4e49-9086-480b1c06c310",
    "name": "Viva college",
    "address": "virar",
    "latitude": 19.4564,
    "longitude": 72.7925
  },
  ...
]



<h1>API: /addSchool</h1>
 <p>Description</p>
<i>This API allows you to add new schools to the database. These schools will then appear in the list of nearby schools when someone searches by coordinates.</i>


<h3>Endpoint</h3>
<b>POST https://nearby-school-api.onrender.com/addSchool</b>

Request Body (JSON)
Send the following keys in the body as raw JSON:

name---	string	--Name of the school
address	--string	--Address of the school
latitude	--float	--Latitude coordinate of the school
longitude	--float	--Longitude coordinate of the school


<h2>example request body</h2>
{
  "name": "Narse Monjee School",
  "address": "Vile Parle",
  "latitude": 19.0968,
  "longitude": 72.8517
}


