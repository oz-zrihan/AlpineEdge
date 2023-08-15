# AlpineEdgeApp

My AlpineEdge ski shop app

This app where built with:

Backend: NodeJs, Express, TypeScript.
security: express-rate-limit, prevent-xss, helmet, cyber, hashing password with crypto ,and prevent Sql-injections...

Database: MySql.

Frontend: Angular 16.1.0, Angular forms, rxjs, TypeScript, emailjs-com, SASS, bootstrap, bootswatch,ngx-bootstrap, xng-breadcrumb, font-awesome...

- All images created with Adobe firefly
- All text (names, description, brands) created with ChatGPT

================================================================

sign-up & login pages
![Sign-up Screen](/screenshots/signup.png)
![Login Screen](/screenshots/login.png)

====== Home Interface =====

Homepage is contain animated banner,
and categories,
click on one of the categories navigate to the shop with the corresponding filter

![Homepage](/screenshots/home.png)

====== Shop Interface =====

The shop interface contains the products and filter & sorting menu.
The user can sort the products by Alphabet or price Descending or Ascending.
The user can filter the products by brand, type, or free text

![Shop](/screenshots/shop.png)
![Shop filtered](/screenshots/shop-filterd.png)

also the user can add the product to his basket from this screen

![Add product to basket](/screenshots/shop-add-item.png)

====== Product Interface =====

In the product detail page the user have more descriptive information about the product,
also the user get indication if he have this product in his basket.
He can also add or remove the quantity of the product in the basket

![Product page](/screenshots/item.png)

====== Basket Interface =====

In this screen the user get a summery of his basket,
he can edit it by adding or removing the quantity of a product

![Basket](/screenshots/basket.png)

====== Checkout Interface =====

The checkout interface is made using stepper with four steps:
Client address, Shipping options, Order summary, Payment.
After payment the client is redirected to "success page" where he could navigate to his orders list page.

![Order-address](/screenshots/order-address.png)
![Order-shiping](/screenshots/order-shiping.png)
![Order-summary](/screenshots/order-summary.png)
![Order-payment](/screenshots/order-payment.png)
![Order-success](/screenshots/order-success.png)

====== Orders Interface =====

In this page, the client can see his orders history,
and he can click on one of them and see more information about it

![Orders-list](/screenshots/orders-list.png)
![Order-display](/screenshots/orders-display.png)

================================================================

logging info:

username: oz@test.com
password: Pa$$w0rd

login info for emailjs:

https://dashboard.emailjs.com/admin

username: 'alpineedgestore@gmail.com'
password: 'alpine123456'
