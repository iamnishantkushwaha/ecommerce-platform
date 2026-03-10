# ecommerce-platform

A full-stack multi-vendor e-commerce platform built with the MERN stack featuring role-based authentication (Admin, Vendor, User), product management, order processing, analytics dashboards, and vendor approval workflow.

## API Endpoints

## API Endpoints

### Static Routes

- `POST /signup` — User signup
- `POST /login` — User login
- `GET /logout` — User logout
- `GET /products` — Get products (query params: `category`, `sort`, `maxprice`, `minprice`, `featured`, `page`, `limit`)
  - Example: `/products?category=electronics&sort=price&minprice=100&maxprice=1000&featured=true&page=1&limit=10`
- `GET /categories` — Get all product categories

### User Routes

- `POST /cart` — Add item to cart
- `GET /cart` — Get cart items
- `PATCH /cart/:productId` — Update cart item
- `DELETE /cart/:productId` — Remove item from cart
- `POST /orders` — Place an order
- `GET /orders` — Get user orders
- `PATCH /orders/:orderid` — Cancel an order

### Vendor Routes

- `POST /add-product` — Add a new product (with image upload)
- `GET /product` — Get all products for the vendor
- `DELETE /product/:id` — Delete a product by ID
- `PATCH /product/:id` — Update a product by ID (with optional image upload)
- `GET /orders` — Get all orders for the vendor
- `PATCH /orders/:orderid` — Update order status

### Admin Routes

- `GET /managevendors` — Get all vendors
- `GET /manageusers` — Get all users
- `PATCH /managevendors/approve/:id` — Approve a vendor by ID
- `DELETE /managevendors/reject/:id` — Reject (delete) a vendor by ID
