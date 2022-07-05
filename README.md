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
- [x] - Store UI design
    - [x] - go through the antdesign and be familiar with components
    - [x] - learn how to adujust styles in antdesign
    - [x] - choose a logo and color theme
    - [x] - design dashbaord page

- [x] - Make the design consistant and every page
- [x] - Design Login cards figma UI
- [x] - Make design look better & apply it to all pages

### Front-End
- [x] - Go through react docs and recap everything
- [x] - Start development with Frontend
    - [x] - Configure with AntDesign / Sass
    - [x] - Learn Antdesign layout & Grid
- [ ] - Use useReducer as a state manager 
- [ ] - Learn how pro developers use reactjs

- [/] - Admin Components
    - [x] - Admin top navigation
    - [x] - Side Navbar
    - [x] - Use ant design responsive columns and rows
    - [x] - replace existing styles layout styles with columns and rows
    - [x] - make sidenav and topnav sticky (replicate adminpro styles)
    - [x] - reverse engineer 229-multi-level-dropdown source code (https://youtu.be/IF6k0uZuypA)    
    - [x] - make layout mobile responsive upto iphone SE
    - [x] - use sass modules when styling isolated element
    - [x] - create responsive hamburger menu (google it)
    - [x] - overwrite necessary styles
    - [x] - add routers
        - [x] - vendor/dashboard
        - [ ] - vendor/orders
        - [ ] - vendor/products
        - [ ] - vendor/product/add
        - [ ] - vendor/products/edit/:id
        - [ ] - vendor/customers
        - [ ] - vendor/customers/view/:id
        - [ ] - vendor/settings
    - [x] - clean & structure up the components properly before move into other pages
    - [x] - Dashboard homepage
    - [x] - add active menu state
        - [x] - show the active style if current page is match with the path
    (https://demos.wrappixel.com/premium-admin-templates/react/adminpro-react/main/dashboards/analytical)

    - [/] - Orders page
    - [ ] - Products page
        - [ ] - Products Upload Modal
    - [ ] - Global alert component
    - [ ] - Customers
        - [ ] - Customers modal
    - [ ] - Settings
    - [ ] - User Profile
    - [ ] - Authentication modal


### Backend


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


https://intoli.com/blog/antd-scss-theme-plugin/ - sass for ant design
https://www.mongodb.com/basics/best-practices - data modeling best practices



