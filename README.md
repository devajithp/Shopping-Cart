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
Add product page is created in admin portal there we can add product details with image of product .For uploading image to server express-fileupload module has downloaded and required it in the app.js file and it is used. after submitting the form of add product data has been sented to server as the request. the image can be accessed by req.files.(name of image mentioned in form). this data is given to the products collection in data base and unique id is generated for each product that we add. using this unique id as the name of the product image , we stored it in the product image folder of public folder.So that every product have image with unique file name. After adding another product an array of products are made in product collection in database.<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193444590-ce04429d-9512-4e6d-8474-886529b5bb31.png)<br><br>

Using HTTP GET API, I Displayed the product details in adminHome portal as table by getting product datas from data base. since it is in array format, I use "each" to iterate the data. and image of corresponding product is added from public folder by using it filename which is the product id.<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193445023-a9ceb9a1-af04-42aa-9c8f-173281906638.png)<br><br>

Edit and delete buttons are provided along with the products in admin portal. for each button product id is passed as parameter. so that it will go as request to server and we can access it by req.params . By matching the product id in product collection in database mongo we can update the product details or delete the product.<br><br>
similary the product datas are displayed in userhome page as cards. And for each card addToCart button is provided and product details are passed in button as params.<br><br>
![alt text](https://user-images.githubusercontent.com/114420318/193445426-7a426b94-91e8-460b-acf9-9f78ef90475e.png)<br><br>
<ins>Add to Cart</ins><br><br>
By clicking to add cart product details are passed as params and send to the server as request and this req.body is saved in the cart collection in database. The structure how data stored in cart is given below <br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193446769-9774dfaf-21a9-4d79-b0f7-98ed16fc5ee1.png)<br><br>

Each user have a document with unique cart id. Inside the document user id also there which is passed as the result of params.If the user have no document inside the cart collection then after clicking add to cart, a document is created for user in cart. if the user already have document in the cart then clicking 'add to cart' will update by pushing the product details to product array in user's cart document after matching the userId. Then this cart details are displayed in cart page as the response from the server.<br><br>
![alt text](https://user-images.githubusercontent.com/114420318/193447114-55772c23-d185-4bc3-9197-4456138ed27e.png)<br><br>

Quantity Increment and decrement buttons also provided along with it After clicking this button productId is of corresponding product and its quantity is passed as the request to server. after matching userId and productId using mongo query the quantity can be incremented or decremented. quantity will increment for increment button and decrement for decrement button. and as response the page with redirected and changes get reflected. mongo query to get total amount also written<br><br>
<ins>Order</ins>
By clicking the place order as response it will render hbs page of giving delivery address. in this page we can select the payment option of COD or online payment<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193449365-71725fd6-f01d-46ef-aa2e-a8a527a5a8b3.png)<br><br>
![alt text](https://user-images.githubusercontent.com/114420318/193449382-9357bb6b-2ae4-4f20-a049-11ac2a26bac5.png)<br><br>

After submitting page will go to confirmation page. After clicking confirm  the delivery details , product details, user details etc.. get stored in order collection of database. every document in the order collection have unique orderId,userid, date of order total amount ,product details etc... The format of document in order collection is given below<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193449451-a40689ed-bf03-4a72-babd-3db30d5f745d.png)<br><br>

After details goes to order collection. for COD order will get placed directly. order details collected from data base and display it in the user portal's order only after writting mongo query of userId match. In admin's portal order documents from the order collection is directly displayed.<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193449910-a787b90f-392a-4424-aac1-6c67d21cd9ea.png)<br><br>
![alt text](https://user-images.githubusercontent.com/114420318/193449927-68cd2ca8-870c-479e-9942-79c56c15ab12.png)<br><br>

On admin portal's order confirm and cancel order button is provided. by default after order status is "pending with admin" for COD after clicking  button status will change. This is done through Ajax. A function with orderId has parameter hs given in onclick of button. on clicking the button function get called and ajax is defined in function and url, data and method as post is set in the ajax. this data is sended to server as the request and mongo query is written to update status by matching the orderId. response is sent back as json and in success ajax will reload the page and changed are reflected.
<br><br>
<ins>Online Payment</ins><br><br>
Online payment is setted up through test mode of razorpay.
