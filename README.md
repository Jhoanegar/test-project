
# Kavak Task List

## ⚙️ Software

This project requieres:

| Software | Version  | Comment                                                         |
|----------|----------|-----------------------------------------------------------------|
| NodeJS   | v10.16.0 | A `.nvmrc` file is included for NVM                             |
| MySQL    | v8       | It should work in older versions because legacy auth was tested |


## ⚙️ Setup
* Run ```$ npm install```
* If it does not exist already, create your database and verify it is up and running.
* *Important* Update the contents of the `/.env` file according to your MySQL setup.
* run ```$ npm run db:init```
* Alternatively, you can find databse dump in the `/bin` folder.

The app runs by default on port 9001



## 🔥 How to run this project
* Run ```$ npm run start```
* You can also run `$ npm run debug` to see detailed info

## 📚 Reference

| Method |      Endpoint     |                                                                                       Query String | Body                                                                                        | Headers                       |
|--------|:-----------------:|---------------------------------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------|-------------------------------|
| POST   |    /auth/login    |                                                                                                N/A | ```  {   "email": "jhoanegar@gmail.com"   ,"password": "12345678" }  ```                    | NONE                          |
| GET    |       /tasks      | filterColumn (optional)  filterValue (optional)  orderColumn (optional)  orderDirection (optional) | NONE                                                                                        | Authorization: Bearer :token |
| GET    |  /tasks/:idTask  |                                                                                                N/A | NONE                                                                                        | Authorization: Bearer :token |
| POST   | /tasks/           | N/A                                                                                                | ``` {"id": 5,"name": "Make commit","order": 1,"expiresAt": "2019-12-01T06:00:00.000Z" } ``` | Authorization: Bearer :token |
| PATCH  | /tasks/:idTask   | N/A                                                                                                | ``` { :property: :newValue}  ```                                                          | Authorization: Bearer :token |
| DELETE | /tasks/:idTask   | N/A                                                                                                | NONE                                                                                        | Authorization: Bearer :token |
| POST   | /matrix/findIndex | N/A                                                                                                |  ```{ "matrix": [1,3,5,6,10] "target": 9 } ```                                              | Authorization: Bearer :token |

*A sample Postman collection is available to import in the `bin` folder*

## Generate passwords

This project uses bcrypt to store user passwords. To generate a new one you can use:
```
$ node bin/generate_password <password>
```


## TODOs

* Add support for mutliple filter columns for the `/tasks` endpoint 
* Prevent multisessions for users by tracking the active tokens
* Maybe autorenewal of tokens
* Enforce uniqueness of order columns for tasks
* Enforce secure passwords
