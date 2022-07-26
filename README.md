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
- [ ] - Learn how expert developers use reactjs

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
        - [x] - vendor/orders
        - [x] - vendor/products
        - [ ] - vendor/product/add
        - [ ] - vendor/products/edit/:id
        - [x] - vendor/customers
        - [ ] - vendor/customers/view/:id
        - [ ] - vendor/settings
    - [x] - clean & structure up the components properly before move into other pages
    - [x] - Dashboard homepage
    - [x] - add active menu state
        - [x] - show the active style if current page is match with the path
    (https://demos.wrappixel.com/premium-admin-templates/react/adminpro-react/main/dashboards/analytical)

    - [x] - fix scss style conflicts - https://www.freecodecamp.org/news/how-to-style-react-apps-with-css/
    - [x] - seperate global files from sass modules
    - [x] - Orders page
    - [x] - Products page
        - [x] - Products Upload Modal
        - [ ] - Reactive auto sorting images
    - [ ] - Global alert component
    - [x] - Customers
        - [x] - Customers modal
    - [ ] - Settings
    - [ ] - User Profile
    - [ ] - Authentication modal

## Fix these

[ ] - fix max font size showing ... in front end
[ ] - validate max and min user inputs

### Backend

- [x] - create a simple REST API with mongodb
- [/] - Handle Errors properly
        - example - https://github.com/CodingGarden/inventory-app/blob/master/backend/src/middlewares.js
- [ ] - configure eslint on backend code
- [ ] - Model the data entries
- [ ] - update errorHandler middleware after configuring dotenv

- [ ] - create mongoose schema for all entries
    - [x] - Store Entry
    - [ ] - Vendor Entry
    - [ ] - Product Entry
    - [ ] - Order Entry
    - [ ] - Buyer Entry

- [x] - configure IAM

- [x] - configure cognito

- [x] - user signup
    - [x] - validate user input
    - [x] - save user in cognito user pool

- [x] - user email confirm
    - [x] - configure nodemailer SMTP to send emails
    - [x] - generate confirmation url securly with jwt
    - [x] - create a route to verify emails (jwt decode)
    - [x] - confirm cognito user (adminConfirmSignup)

- [ ] - rename auth routes properly

- [ ] - user sign in
    - [ ] - 

- [ ] - resend verification link feature
    - [ ] - create seperate endpoint
    - [ ] - add custom rate limits for resending

- [ ] - modulerize and cleanup the backend code
    - https://github.dev/async-labs/builderbook/tree/master/builderbook/server

- [ ] - Follow the this auth flow and choose a secured secret to generate email confirmation links
https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-post-confirmation.html

- When using cognito
    - [/] - create an sample fully functioning custom auth API with cognito
    - [ ] - receive accessToken and refreshToken properly
        - read more about token based authentication
    - [ ] - learn to secure custom API endpoints with cognito
    - [ ] - configure federated providers with Google
    - [ ] - implement it to the project

Cognito App client config
    - Refresh toekn expiration - 30 days
    - Access token expiration - 60 mins
    - ID token expiration - 60 mins

- [ ] - update branding information to Oauth 2.0 API in google console
    - [ ] - add callback redirect after login
    - app logo
    - app homelink
    - app privacy policy link
    - app terms of service link
    - authorized domains
                                                          
store domain - freebiesell.xyz
 
https://joi.dev/ - for schema validation

data model - https://www.mongodb.com/docs/manual/applications/data-models/
Many to many relationship - http://learnmongodbthehardway.com/schema/schemabasics/
https://www.mongodb.com/nosql-explained/data-modeling

### Development phase with Workflow

[/] - vendor creating a store
        - singup from the landing page
            - POST request to /api/vendor/signup
            - retieve the created object response and save it in frontend state
            - prompt the user to step form
                - after signup if user tried to close the browser without completing the step form, it will be prompted again to complete
                    - add { "isCompletedStoreSetup": false }
                - inlcude store & vendor details in step form fields
                    - 1st step
                        - store details
                    - 2nd step
                        - vendor details
                            - retreive already know data from frontend state
                    - 3rd step
                        - payment details - (need to research stripe API for payment field requirements)
        - success sign after compeletion
        - redirect to the dashboard


- users and admins both cannot have the same email address

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
    - Banner
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
    - add payment details later



