# ecommerce-platform
A full-stack multi-vendor e-commerce platform built with the MERN stack featuring role-based authentication (Admin, Vendor, User), product management, order processing, analytics dashboards, and vendor approval workflow.

## API Endpoints

### Static Routes
- `POST /signup` — User signup
- `POST /login` — User login
- `GET /logout` — User logout

### User Routes
- `POST /orders` — Place an order

### Vendor Routes
- `POST /add-product` — Add a new product (with image upload)
- `GET /product` — Get all products for the vendor
- `DELETE /product/:id` — Delete a product by ID
- `PATCH /product/:id` — Update a product by ID (with optional image upload)
- `GET /orders` — Get all orders for the vendor

### Admin Routes
- `GET /managevendors` — Get all vendors
- `GET /manageusers` — Get all users
- `PATCH /managevendors/approve/:id` — Approve a vendor by ID
- `DELETE /managevendors/reject/:id` — Reject (delete) a vendor by ID
