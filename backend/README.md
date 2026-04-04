# Backend API Endpoints

This README lists the actual API endpoints implemented in your ecommerce-platform backend, based on your route files.

## Static Routes

- **POST /api/signup** — User signup
- **POST /api/login** — User login
- **GET /api/logout** — User logout
- **GET /api/products** — Get paginated products with filters
  - Query: `category`, `sort`, `maxprice`, `minprice`, `featured`, `search`, `page`, `limit`
  - Sort: `price_asc`, `price_desc`, `newest`
- **GET /api/categories** — Get all categories with product counts

## Authenticated Route (Any Role)

- **GET /api/me** — Get authenticated user from token

## Admin Routes

- **GET /api/admin/managevendors** — List all vendors
- **GET /api/admin/manageusers** — List all users
- **PATCH /api/admin/managevendors/approve/:id** — Approve vendor by ID
- **DELETE /api/admin/managevendors/reject/:id** — Reject vendor by ID
- **GET /api/admin/dashboard** — Get admin dashboard data

## Vendor Routes

- **POST /api/vendor/add-product** — Add a new product (with image upload)
- **GET /api/vendor/product** — Get all products for vendor
- **DELETE /api/vendor/product/:id** — Delete product by ID
- **PATCH /api/vendor/product/:id** — Update product by ID (with image upload)
- **GET /api/vendor/orders** — Get vendor orders
- **PATCH /api/vendor/orders/:orderid** — Update vendor order status
- **GET /api/vendor/profile** — Get vendor profile
- **PATCH /api/vendor/profile** — Update vendor profile
- **GET /api/vendor/dashboard** — Get vendor dashboard data

## User Routes

- **POST /api/user/cart** — Add product to cart
- **GET /api/user/cart** — Get user's cart
- **PATCH /api/user/cart/:productId** — Update cart item
- **DELETE /api/user/cart/:productId** — Remove item from cart
- **POST /api/user/orders** — Place an order
- **GET /api/user/orders** — Get user orders
- **PATCH /api/user/orders/:orderid** — Cancel user order
- **GET /api/user/trackorder/:orderId** — Track order by ID
- **GET /api/user/latest-order** — Get latest order
- **GET /api/user/profile** — Get user profile
- **PATCH /api/user/profile** — Update user profile
- **PATCH /api/user/passwordchange** — Change user password
- **GET /api/user/api/me** — Auth user info route currently present in user router

---

### Notes

- Some endpoints require authentication and specific roles (admin, vendor, user).
- Image uploads use `upload.single("image")` middleware.
- See controllers for handler logic in `controllers/`.

## Setup & Usage

Refer to the main README for setup instructions and environment configuration.

## License

MIT License
