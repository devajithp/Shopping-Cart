# Shopping-Cart

Source code is uploaded in Master Branch.<br><br>

## Stacks used
Nodejs-Express -Backend<br>
MongoDB- database<br>
HTML<br>
CSS<br>
Bootstrap<br>
Ajax<br><br>
### <ins>Initial setup and Mongo connection</ins><br>
<br>
The code is builded using Visual studio code and is written in node js . To initialize and setup new node package "npm init command" is used. npm install command is used to intsall the npm modules to package.<br><br> Express generator hbs is used to create project layout suitable to build a E-commerce web Applcation, for that "npx express-generator --hbs" command is used.<br><br> After that a config folder and helper folder is created. config folder to configure the mongodb connection and helper folder having js files with functions which is then called from js file in routes. <br><br>
seperate js file for admin and user are provided in routes.<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193441263-c95545c2-1ef7-4dd5-9c1c-b7ae9b45b842.png)<br><br>

Partials are used for user and admin .Because both will have different interface header<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193441378-cd946ee4-eddd-4f11-a314-63d4684cb767.jpg)<br>
![alt text](https://user-images.githubusercontent.com/114420318/193441385-f15f7f19-fea1-43fa-9522-6f939f8518d8.jpg)<br>

Bootsrap libraries jQuery libraries are provided in layout.hbs file<br><br>
### <ins>User Sign Up and login and admin login , session</ins><br><br>
To generate session, express-session module is installed and required it in the app.js file. Session is used in app.js, key and cookie max age also defined.<br><br>
User signup hbs file is created in user folder in view folder. Signup form is created . Method of form set to POST.<br><br> After submitting the form , name ,email, password.etc  are sended as request to server .Using bcrypt module of node the password is decrypted and all these datas are stored to user collection in database.
<br><br>


![user signup](https://user-images.githubusercontent.com/114420318/196027544-7746e5d6-3b6c-46fc-87d1-9ef1cd63dfc8.png)<br><br>


login page also created. In login form after submit, request will sent to the server .<br><br> In server side it will verify user's email adress and password. the password is compared by using compare method of bcrypt module. then login is completed and in session we pass this user details and set userLogged  status as true. <br><br>Whenever the user is logouting then the session get destroyed.<br><br>

![user login](https://user-images.githubusercontent.com/114420318/196027582-06bb85ec-c838-4b55-b63c-d743322ac469.png)<br><br>



similarly admin login page and admin session has created. For admin sign up page is note provided the admin details are pre-seted in the database.<br><br>
### <ins>Products adding</ins><br><br>
'Add product' page is created in admin portal there we can add product's details with image of product .For uploading image to server, express-fileupload module has downloaded and required it in the app.js file and it is used.<br><br> After submitting the form of add product, data has been sented to server as the request. The image can be accessed by req.files.(name of image mentioned in form).<br><br> This data is given to the products collection in data base and unique id is generated for each product that we add. using this unique id as the name of the product image , we stored it in the product image folder of public folder.So that every product have image with unique file name. After adding another product, an array of products are made in product collection in database.<br><br>

![admin add product](https://user-images.githubusercontent.com/114420318/196027636-16febbf8-6546-48a8-919e-de3f13bcf0dc.png)<br><br>



Displayed the product details in adminHome portal as table by getting product datas from data base. since it is in array format, I use "each" to iterate the data. and image of corresponding product is added from public folder by using it's filename which is the product id.<br><br>

![admin home](https://user-images.githubusercontent.com/114420318/196027681-bb50b734-30ea-4a31-93ae-f4494112a143.png)<br><br>


Edit and delete buttons are provided along with the products in admin portal. For each button product id is passed as parameter. so that it will go as request to server and we can access it by req.params . By matching the product id in product collection in database by mongo query, we can update the product details or delete the product.<br><br>
Similary the product datas are displayed in userhome page as cards. And for each card addToCart button is provided and product details are passed in button as params.<br><br>
![user home](https://user-images.githubusercontent.com/114420318/196027755-9f8705fe-3dac-49a7-b99f-b94ac1d8e016.png)<br><br>

### <ins>Add to Cart</ins><br><br>
By clicking to add cart product details are passed as params and send to the server as request and this req.body is saved in the cart collection in database. The structure how data stored in cart is given below <br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193446769-9774dfaf-21a9-4d79-b0f7-98ed16fc5ee1.png)<br><br>

Each user have a document with unique cart id. Inside the document user id also added which is passed as the result of params.<br><br>If the user have no document inside the cart collection then after clicking add to cart, a document is created for user in cart.<br><br> if the user already have document in the cart then clicking 'add to cart' will update by pushing the new product details to product array in user's cart document after matching the userId.<br><br> Then this cart details are displayed in cart page as the response from the server.<br><br>
![user add to cart](https://user-images.githubusercontent.com/114420318/196027850-f8079678-156f-4a7f-85c2-af471a49d359.png)<br><br>


Quantity Increment and decrement buttons also provided along with it. After clicking this button productId  of corresponding product and its quantity is passed as the request to server.<br><br> After matching userId and productId using mongo query the quantity can be incremented or decremented. Quantity will increment for increment button and decrement for decrement button.<br><br> As the response the page with redirected and changes get reflected. mongo query to get total amount also written<br><br>
### <ins>Order</ins><br><br>
By clicking the place order, as response it will render hbs page for giving delivery address. In this page, we can select the payment option either COD or online payment<br><br>

![user adding delivery address](https://user-images.githubusercontent.com/114420318/196027936-87ca8cc1-fdf3-4784-b710-5911fe365364.png)<br><br>


![user order summary](https://user-images.githubusercontent.com/114420318/196027954-a676eb78-8e90-4e5d-9a35-aad4fb9eea94.png)<br><br>

After submitting, page will go to confirmation page. After clicking confirm  the delivery details , product details, user details etc.. get stored in order collection of database.<br><br> Every document in the order collection have unique orderId,userid, date of order, total amount ,product details etc... The format of document in order collection is given below<br><br>

![alt text](https://user-images.githubusercontent.com/114420318/193449451-a40689ed-bf03-4a72-babd-3db30d5f745d.png)<br><br>

After details goes to order collection. for COD, order will get placed directly. order details collected from data base and display it in the user portal's order only after  mongo query of userId match.<br><br> In admin's portal order documents from the order collection is directly displayed without any matching .<br><br>

![user orders](https://user-images.githubusercontent.com/114420318/196028017-7e26df1d-d7cb-4e04-bc17-16b86f959f4d.png)<br><br>

![admin orders](https://user-images.githubusercontent.com/114420318/196028039-a4ee944a-49cf-46bb-92bd-748a3b31de17.png)<br><br>


In admin portal's order, confirm and cancel order button is provided. by default after the order placement, status is "pending with admin" for COD after clicking  button status will change. This is done through Ajax.<br><br> A function with orderId as the parameter is given in onclick of button. on clicking the button function get called and ajax is defined in function and url, data and method as post is set in the ajax.<br><br> This data is sended to server as the request and mongo query is written to update status by matching the orderId. response is sent back as json and in success, ajax will reload the page and changed are reflected.
<br><br>
### <ins>Online Payment</ins><br><br>
Online payment is setted up through test mode of razorpay.
