

# ProjectManagement

2 apis are designed - createProject and requestProject
createProject is used for creating(POST) a new project. requestProject is used for retieving(GET) an existing project.

Working logic for both these apis are written in user.js.

## Usage

Server can be started by using command 'npm start' from the project directory.

cURL commands can be used to call the apis.
For Example:
 POST to createProject API:

		curl -X POST \
		  http://localhost:3000/createProject \
		  -H 'cache-control: no-cache' \
		  -H 'content-type: application/json' \
		  -H 'postman-token: ea38241a-10f1-680a-2e1d-d3a6c9802488' \
		  -d '{
			"id":5,
			"projectName":"test project number 5",
			"creationDate":"05232017 00:00:00",
			"expiryDate":"06202017 00:00:00",
			"enabled":true,
			"targetCountries":["USA","INDIA","MEXICO","BRAZIL"],
			"projectCost":9.5,
			"projectUrl":"http://www.unity3d.com",
			"targetKeys":[{"number":25,"keyword":"animation"},{"number":30,"keyword":"sports"},{"number":50,"keyword":"action"}]
		}'
GET from requestProject API:

		curl -X GET \
		  http://localhost:3000/requestProject \
		  -H 'cache-control: no-cache' \
		  -H 'postman-token: fbd1355c-eda8-0e18-af68-c105adce7ec1'

Some sample cURL commands are mentioned in the Test.txt file.

## Developing

Basic npm modules like http, fs, express, log, etc.

### Tools

Sublime Text for development
Postman for testing
