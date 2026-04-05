# Backend API Endpoints

This README lists the actual API endpoints implemented in your ecommerce-platform backend, based on your route files.

Base path: `/api`

## Public Routes

- **POST /api/signup** — User signup
- **POST /api/login** — User login
- **GET /api/logout** — User logout
- **GET /api/products** — Get paginated products with filters
  - Query: `category`, `sort`, `maxprice`, `minprice`, `featured`, `search`, `page`, `limit`
  - Sort: `price_asc`, `price_desc`, `newest`
- **GET /api/categories** — Get all categories with product counts

## Authenticated Route (Any Role)

- **GET /api/me** — Get authenticated user from token

## User Routes (Auth + USER)

- **POST /api/user/cart** — Add product to cart
- **GET /api/user/cart** — Get user's cart
- **PATCH /api/user/cart/:productId** — Update cart item quantity
- **DELETE /api/user/cart/:productId** — Remove item from cart
- **POST /api/user/orders** — Place an order
- **GET /api/user/orders** — Get user orders
- **PATCH /api/user/orders/:orderid** — Cancel user order
- **GET /api/user/trackorder/:orderId** — Track order by ID
- **GET /api/user/latest-order** — Get latest user order
- **GET /api/user/profile** — Get user profile
- **PATCH /api/user/profile** — Update user profile
- **PATCH /api/user/passwordchange** — Change user password

## Vendor Routes (Auth + VENDOR)

- **POST /api/vendor/add-product** — Add a new product (with `image` upload)
- **GET /api/vendor/product** — Get all products for vendor
- **DELETE /api/vendor/product/:id** — Delete product by ID
- **PATCH /api/vendor/product/:id** — Update product by ID (supports `image` upload)
- **GET /api/vendor/orders** — Get vendor orders
- **PATCH /api/vendor/orders/:orderid** — Update vendor order status
- **PATCH /api/vendor/orders/shipping-details/:id** — Update shipping details
- **GET /api/vendor/profile** — Get vendor profile
- **PATCH /api/vendor/profile** — Update vendor profile
- **GET /api/vendor/dashboard** — Get vendor dashboard data

## Admin Routes (Auth + ADMIN)

- **GET /api/admin/managevendors** — List all vendors
- **PATCH /api/admin/managevendors/approve/:id** — Approve vendor by ID
- **PATCH /api/admin/managevendors/reject/:id** — Reject vendor by ID
- **DELETE /api/admin/deletevendor/:id** — Delete vendor by ID
- **GET /api/admin/manageusers** — List all users
- **DELETE /api/admin/deleteuser/:id** — Delete user by ID
- **GET /api/admin/dashboard** — Get admin dashboard data
- **GET /api/admin/recentactivities** — Get recent activities
- **GET /api/admin/orders** — Get all orders
- **PATCH /api/admin/products/:id** — Feature/unfeature product
- **DELETE /api/admin/products/:id** — Delete product
- **POST /api/admin/addadmin** — Add new admin

---

### Notes

- Some endpoints require authentication and specific roles (admin, vendor, user).
- Image uploads use `upload.single("image")` middleware.
- See controllers for handler logic in `controllers/`.

## Setup & Usage

Refer to the main README for setup instructions and environment configuration.

## License

MIT License
