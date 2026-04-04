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
- `GET /api/categories` — Get product categories with product counts

### Authenticated (Any Logged-In User)

- `GET /api/me` — Get authenticated user details

### User APIs (Auth + USER Role)

- `POST /api/user/cart` — Add item to cart
- `GET /api/user/cart` — Get cart items
- `PATCH /api/user/cart/:productId` — Update cart item quantity/details
- `DELETE /api/user/cart/:productId` — Remove item from cart
- `POST /api/user/orders` — Place an order
- `GET /api/user/orders` — Get user orders
- `PATCH /api/user/orders/:orderid` — Cancel order
- `GET /api/user/trackorder/:orderId` — Track a specific order
- `GET /api/user/latest-order` — Get latest user order
- `GET /api/user/profile` — Get user profile
- `PATCH /api/user/profile` — Update user profile
- `PATCH /api/user/passwordchange` — Change user password
- `GET /api/user/api/me` — Get authenticated user details (exists in current routes)

### Vendor APIs (Auth + VENDOR Role)

- `POST /api/vendor/add-product` — Add a new product (multipart image upload: `image`)
- `GET /api/vendor/product` — Get all products for the vendor
- `PATCH /api/vendor/product/:id` — Update product by ID (optional multipart image upload: `image`)
- `DELETE /api/vendor/product/:id` — Delete product by ID
- `GET /api/vendor/orders` — Get vendor orders
- `PATCH /api/vendor/orders/:orderid` — Update order status
- `GET /api/vendor/profile` — Get vendor profile
- `PATCH /api/vendor/profile` — Update vendor profile
- `GET /api/vendor/dashboard` — Get vendor dashboard analytics

### Admin APIs (Auth + ADMIN Role)

- `GET /api/admin/managevendors` — Get all vendors
- `PATCH /api/admin/managevendors/approve/:id` — Approve vendor by ID
- `DELETE /api/admin/managevendors/reject/:id` — Reject vendor by ID
- `GET /api/admin/manageusers` — Get all users
- `GET /api/admin/dashboard` — Get admin dashboard analytics
