# Backend API Endpoints

This README lists the actual API endpoints implemented in your ecommerce-platform backend, based on your route files.


## Static Routes

- **POST /signup** — User signup
- **POST /login** — User login
- **GET /logout** — User logout
- **GET /products** — Get paginated products (query: `page`, `limit`)

## Admin Routes

- **GET /managevendors** — List all vendors
- **GET /manageusers** — List all users
- **PATCH /managevendors/approve/:id** — Approve vendor by ID
- **DELETE /managevendors/reject/:id** — Reject vendor by ID

## Vendor Routes

- **POST /add-product** — Add a new product (with image upload)
- **GET /product** — Get all products for vendor
- **DELETE /product/:id** — Delete product by ID
- **PATCH /product/:id** — Update product by ID (with image upload)
- **GET /orders** — Get vendor orders
- **PATCH /orders/:orderid** — Update vendor order status

## User Routes

- **POST /cart** — Add product to cart
- **GET /cart** — Get user's cart
- **PATCH /cart/:productId** — Update cart item
- **DELETE /cart/:productId** — Remove item from cart
- **POST /orders** — Place an order
- **GET /orders** — Get user orders
- **PATCH /orders/:orderid** — Cancel user order

---

### Notes

- Some endpoints require authentication and specific roles (admin, vendor, user).
- Image uploads use `upload.single("image")` middleware.
- See controllers for handler logic: `authentication.js`, `vendors.js`, `user.js`, `Admin.js`.

## Setup & Usage

Refer to the main README for setup instructions and environment configuration.

## License

MIT License
