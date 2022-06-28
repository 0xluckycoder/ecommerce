## Managed ecommerce

this app allows users to create their own store and start selling their products online

## Technologies

### Frontend

- Reactjs/TS
- Sass
- Antdesign
- Redux
- Nextjs

### Backend

- Nodejs/TS
- MongoDB
- AWS tools


## TODO

- [x] - list down features
- [ ] - learn how to properly model nosql databases
- [ ] - start to model the database example

- [x] - Store UI design
    - [x] - go through the antdesign and be familiar with components
    - [x] - learn how to adujust styles in antdesign
    - [/] - choose a logo and color theme
    - [ ] - design dashbaord page

https://www.mongodb.com/nosql-explained/data-modeling

### Features

- Payment
	- required details asked by payment method

- Creating a store
    - required contact infomation
    - when buyer is signing up we will ask him/her to enter the name for their store
    - store name's are unique, no duplicate names

- Dashboard Menus
    - home (analytics)
        - total sales
        - total revenue
        - out of stock products
        - new orders
    - orders
        - list of recurrent orders
        - dispatch button
        - previous dispatch history (optional)
    - products
        - upload new products button (Product Entry)
        - show existing products with CRUD functionality
        - develop a global modal for all type of errors and warinings
    - customers
        - show list of detials of customers (readonly)
            - full name
            - last online time (how long a ago)
            - City & Country
            - Email
        - modal to view customer details


## Database entries

Store Entry
    - ID
    - Store name (unique)
    - Logo
    - Store status - Boolean
    - Store Owner - FK

- Product Entry
    - ID
    - Product Name
    - Price
    - Images
    - Description
    - Stock Availability

- Order Entry
    - ID
    - Total Price
    - Notes
    - Customer ID
    - Product IDs (array)
    - Requested quantity

- Buyer Entry
    - ID
    - First name
    - Last name
    - Profile picture (optional)
    - City
    - Country
    - Address
    - Email
    - Phone (Optional)
    - Online Status / Last Online
    - Total Spent
    - Total Complete Orders
    - Save debit card number (next update feature)

- Vendor Entry
    - ID
    - First Name (Optional)
    - Last Name (Optional)
    - Phone (Optional)
    - Country
    - City
    - store name subdomain
    - Email
    - Password

## Next release products

- Categories

### workflow

- Creating a store
    - store buyer authenticate to the website
    - confirm authentication
    - creating a new store in dashboard (only one store for one user)
        - choose a name for store
        - upload logo to store
        - store will be created

- Uploading products
    - visit to upload menu
    - click add product and fill the form
    - product will be uploaded to store

- Account Feature
    - ability to verify and change (email, password, phone)
    - two factor authentication

Todo

- [x] - Make the design consistant and every page
- [x] - Design Login cards
- [/] - Start development with Frontend
- [ ] - Configure
- [ ] - Learn how pro developers use reactjs 


https://intoli.com/blog/antd-scss-theme-plugin/ - sass for ant design
https://www.mongodb.com/basics/best-practices - data modeling best practices



