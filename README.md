# Shopping-Cart
<ins>Initial setup and Mongo connection</ins><br>
<br>
The code is builded using Visual studio code and is written in node js . To ininitialize and setup new node package "npm init command" is used. npm install command is used to intsall the npm modules to package.<br><br> Express generator hbs is used to create project layout suitable to build a E-commerce web Applcation, for the "npx express-generator --hbs" command is used. after that a config folder and helper folder is created. config folder to configure the mongodb connection and helper folder having js files with functions which is then called from js file in routes. <br>
seperate js file for admin and user is provided in routes.<br>
![alt text](https://user-images.githubusercontent.com/114420318/193441263-c95545c2-1ef7-4dd5-9c1c-b7ae9b45b842.png)<br><br>
Partials are used for user and admin .Because both will have different interface header<br><br>
![alt text](https://user-images.githubusercontent.com/114420318/193441378-cd946ee4-eddd-4f11-a314-63d4684cb767.jpg)<br>
![alt text](https://user-images.githubusercontent.com/114420318/193441385-f15f7f19-fea1-43fa-9522-6f939f8518d8.jpg)<br>
Bootsrap libraries j query libraries are provided in layout.hbs file<br><br>
<ins>User Sign Up and login and admin login , session</ins><br><br>
To generate session express-session module is installed and required it in the app.js file. Session is used in app.js, key and cookie max age also defined.<br>
user sign up hbs file is created in user folder in view folder. sign up form is created . method of form set to POST. after submitting the form , name ,email, password.etc  are sended as request to server . using bcrypt module of node the password is decrypted and all these datas are stored to user collection in database.
<br><br>
![alt text](https://user-images.githubusercontent.com/114420318/193441981-af5c431e-b8e0-43e2-ba05-614ef5a125d8.png)<br>br>
login page also created. in login form after submit request will sent to the server . in server side it will verify user email adress and password. the password is compared by using compare method of bcrypt module. then login is completed and in session we pass this user details and set userLogged in status as true. whenever the user is logouting then the session get destroyed.
![alt text](https://user-images.githubusercontent.com/114420318/193442214-d35023b1-10e0-4e4e-9796-6be12cddf6bf.png)<br><br>
similarly admin login page and admin session has created. for admin sign up page is note provided the admin details are pre-seted in the database.<br><br>
<ins>Products adding</ins><br><br>
Add product page is created in admin portal there we can add product details with image of product .For uploading image to server express-fileupload module has downloaded and required it in the app.js file and it is used. after submitting the form of add product data has been sented to server as the request. the image can be accessed by req.files.(name of image mentioned in form). this data is given to the products collection in data base and unique id is generated for each product that we add. using this unique id as the name of the product image , we stored it in the product image folder of public folder.So that every product have image with unique file name. After adding another product an array of products are made in product collection in database.
