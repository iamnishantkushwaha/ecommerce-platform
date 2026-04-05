# ecommerce-platform

A full-stack multi-vendor e-commerce platform built with the MERN stack featuring role-based authentication (Admin, Vendor, User), product management, order processing, analytics dashboards, and vendor approval workflow.

## API Endpoints

Base API path: `/api`

### Public (No Auth)

- `POST /api/signup` — User signup
- `POST /api/login` — User login
- `GET /api/logout` — User logout
- `GET /api/products` — Get paginated products with filters
  - Query params: `category`, `sort`, `maxprice`, `minprice`, `featured`, `search`, `page`, `limit`
  - Sort values: `price_asc`, `price_desc`, `newest`
- `GET /api/products/:id` — Get single product detail by product ID
- `GET /api/categories` — Get product categories with product counts

## Frontend Routes

- `/products` — Product listing page
- `/products/:id` — Product detail page

### Authenticated (Any Logged-In User)

- `GET /api/me` — Get authenticated user details

### User APIs (Auth + USER Role)

- `POST /api/user/cart` — Add item to cart
- `GET /api/user/cart` — Get cart items
- `PATCH /api/user/cart/:productId` — Update cart item quantity
- `DELETE /api/user/cart/:productId` — Remove item from cart
- `POST /api/user/orders` — Place order
- `GET /api/user/orders` — Get user orders
- `PATCH /api/user/orders/:orderid` — Cancel user order
- `GET /api/user/trackorder/:orderId` — Track order by ID
- `GET /api/user/latest-order` — Get latest user order
- `GET /api/user/profile` — Get user profile
- `PATCH /api/user/profile` — Update user profile
- `PATCH /api/user/passwordchange` — Change user password

### Vendor APIs (Auth + VENDOR Role)

- `POST /api/vendor/add-product` — Add product (multipart form-data, image field: `image`)
- `GET /api/vendor/product` — Get vendor products
- `PATCH /api/vendor/product/:id` — Update product (supports image upload)
- `DELETE /api/vendor/product/:id` — Delete product
- `GET /api/vendor/orders` — Get vendor orders
- `PATCH /api/vendor/orders/:orderid` — Update order status
- `PATCH /api/vendor/orders/shipping-details/:id` — Update shipping metadata (courier, tracking, ETA)
- `GET /api/vendor/dashboard` — Get vendor dashboard data
- `GET /api/vendor/profile` — Get vendor profile
- `PATCH /api/vendor/profile` — Update vendor profile

### Admin APIs (Auth + ADMIN Role)

- `GET /api/admin/managevendors` — Get all vendors
- `PATCH /api/admin/managevendors/approve/:id` — Approve vendor
- `PATCH /api/admin/managevendors/reject/:id` — Reject vendor
- `DELETE /api/admin/deletevendor/:id` — Delete vendor
- `GET /api/admin/manageusers` — Get all users
- `DELETE /api/admin/deleteuser/:id` — Delete user
- `GET /api/admin/dashboard` — Get admin dashboard data
- `GET /api/admin/recentactivities` — Get recent admin activities
- `GET /api/admin/orders` — Get all orders for admin
- `PATCH /api/admin/products/:id` — Feature/unfeature product
- `DELETE /api/admin/products/:id` — Delete product
- `POST /api/admin/addadmin` — Create new admin
