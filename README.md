# Burak Backend (Express + TypeScript + MongoDB)

A TypeScript Express application that serves two surfaces:

- Public JSON API for a SPA client (members, products, orders)
- Server‑side rendered Admin panel under `/admin` using EJS templates

It uses MongoDB with Mongoose, session storage in MongoDB for the Admin, and JWT cookies for SPA authentication. File uploads are handled with Multer and served statically.

## Quick Start

- Requirements: Node.js 18+, MongoDB, macOS/Linux/Windows
- Install dependencies:

```bash
npm install
```

- Create a `.env` file:

```bash
# Mongo
MONGO_URL=mongodb://localhost:27017/burak

# Web server
PORT=3003

# Secrets
SESSION_SECRET=your-session-secret
TOKEN_SECRET=your-jwt-secret
```

- Run in development with nodemon:

```bash
npm run dev
```

- Or run directly:

```bash
npm start
```

- Optional playground script:

```bash
npm run train
```

Server starts on `http://localhost:${PORT}` and mounts the Admin at `http://localhost:${PORT}/admin`.

## Project Structure

- App bootstrap: [src/server.ts](src/server.ts), [src/app.ts](src/app.ts)
- Routers: [src/router.ts](src/router.ts) (SPA API), [src/router-admin.ts](src/router-admin.ts) (Admin)
- Controllers: [src/controllers](src/controllers)
- Services: [src/models](src/models)
- Schemas: [src/schemas](src/schemas)
- Shared types/enums/config/errors: [src/libs](src/libs)
- Views (EJS): [src/views](src/views)
- Static assets: [src/public](src/public)
- Uploads (runtime): `uploads/` (created automatically if missing)

## Runtime Architecture

- HTTP server: Express configured in [src/app.ts](src/app.ts)
  - Static assets: `public/` served from `src/public` and uploads under `/uploads`
  - Parsers: URL-encoded + JSON
  - CORS: `origin: true`, `credentials: true`
  - Cookies: `cookie-parser`
  - Logging: `morgan` with format from [src/libs/config.ts](src/libs/config.ts#L1)
  - Sessions: `express-session` backed by `connect-mongodb-session` (collection `sessions`)
  - Views: EJS with views path [src/views](src/views)
- Data: MongoDB via Mongoose, connection in [src/server.ts](src/server.ts)
- Auth:
  - SPA: JWT stored in cookie `accessToken` (expires in `AUTH_TIMER` hours; see [src/libs/config.ts](src/libs/config.ts#L7))
  - Admin: Session-based auth in MongoDB store
- File Uploads: Multer storage per `uploads/<folder>`; see [src/libs/utils/uploader.ts](src/libs/utils/uploader.ts)

## Data Models (Mongoose)

- Member: [src/schemas/Member.model.ts](src/schemas/Member.model.ts)
  - Fields: `memberType`, `memberStatus`, `memberNick`(unique), `memberPhone`(unique), `memberPassword`(hashed), `memberAddress`, `memberImage`, `memberDescription`, `memberPoints`
- Product: [src/schemas/Product.model.ts](src/schemas/Product.model.ts)
  - Fields: `productStatus`, `productCollection`, `productName`, `productPrice`, `productLeftCount`, `productSize`, `productVolume`, `productDesc`, `productImages[]`, `productViews`
- Order: [src/schemas/order.model.ts](src/schemas/order.model.ts)
  - Fields: `orderTotal`, `orderDelivery`, `orderStatus`, `memberId`
- OrderItem: [src/schemas/orderItem.model.ts](src/schemas/orderItem.model.ts)
  - Fields: `itemQuantity`, `itemPrice`, `orderId`, `productId`
- View: [src/schemas/View.model.ts](src/schemas/View.model.ts)
  - Records unique member views for products

Enums live under [src/libs/enums](src/libs/enums): `member`, `product`, `order`, `view`.

## Services

- MemberService: [src/models/Member.service.ts](src/models/Member.service.ts)
  - Signup/login (hash via bcrypt), profile get/update, top users, add points
  - Admin flows: single-restaurant signup/login, list/update users
- ProductService: [src/models/Product.service.ts](src/models/Product.service.ts)
  - List with search, filter, sort, pagination; get single product with unique-view tracking; admin CRUD (create, update status)
- OrderService: [src/models/Order.service.ts](src/models/Order.service.ts)
  - Create order (computes delivery: +5 if total < 100), list my orders with items and joined product data, update order status (adds user points on PROCESS)
- ViewService: [src/models/View.service.ts](src/models/View.service.ts)
  - Check/insert unique view records per member + product
- AuthService: [src/models/Auth.service.ts](src/models/Auth.service.ts)
  - JWT create/verify using `TOKEN_SECRET`

## Controllers and Routes

### SPA API (mounted at `/`)

Member endpoints (see [src/controllers/member.controller.ts](src/controllers/member.controller.ts)):

- POST `/member/signup`: body `memberNick`, `memberPhone`, `memberPassword`, ... → sets `accessToken` cookie; returns `{ member, accessToken }`
- POST `/member/login`: same response as signup
- POST `/member/logout`: clears `accessToken`
- GET `/member/detail`: auth required; returns current member
- POST `/member/update`: auth + single upload field `memberImage`; updates profile
- GET `/member/top-users`: returns top 4 by `memberPoints`
- GET `/member/restaurant`: returns the single restaurant profile

Product endpoints (see [src/controllers/product.controller.ts](src/controllers/product.controller.ts)):

- GET `/product/all` query: `page`, `limit`, `order`, optional `productCollection`, `search`
  - Sorting: if `order=productPrice` ascending; otherwise descending by the field
- GET `/product/:id` optionally attaches `member` via cookie auth; returns product and increments `productViews` once per member (unique by view record)

Order endpoints (see [src/controllers/order.controller.ts](src/controllers/order.controller.ts)):

- POST `/order/create`: auth required; body is array of items `{ productId, itemQuantity, itemPrice }` → creates `Order` + `OrderItem[]`
- GET `/order/all` query: `page`, `limit`, `orderStatus` → returns orders with joined `orderItems` and `productData`
- POST `/order/update`: auth required; body `{ orderId, orderStatus }` → updates own order

Authentication flow (SPA):

- Successful signup/login sets `accessToken` cookie (not httpOnly) with TTL `AUTH_TIMER` hours.
- Middleware `verifyAuth` checks cookie and populates `req.member`; `retrieveAuth` is a soft version (does not error if missing).

### Admin (SSR, mounted at `/admin`)

Restaurant and Admin actions (see [src/controllers/restaurant.controller.ts](src/controllers/restaurant.controller.ts)):

- GET `/admin/` → [home.ejs](src/views/home.ejs)
- GET `/admin/signup` → [signup.ejs](src/views/signup.ejs)
- POST `/admin/signup` (multipart; field `memberImage`) → creates the single RESTAURANT member; stores to session
- GET `/admin/login` → [login.ejs](src/views/login.ejs)
- POST `/admin/login` → authenticates RESTAURANT; stores to session
- GET `/admin/check-me` → small check alert based on session
- GET `/admin/logout` → destroys session and redirects to `/admin`

Products (Admin):

- GET `/admin/product/all` (requires session) → renders [products.ejs](src/views/products.ejs)
- POST `/admin/product/create` (requires session; multipart `productImages` up to 5) → creates product
- POST `/admin/product/:id` (requires session) → updates product (e.g., status)

Users (Admin):

- GET `/admin/user/all` (requires session) → renders [users.ejs](src/views/users.ejs)
- POST `/admin/user/edit` (requires session) → updates `memberStatus`

Session auth (Admin):

- Middleware `verifyRestaurant` checks `req.session.member.memberType === 'RESTAURANT'` and continues; otherwise redirects to login.

## File Uploads

- Utility: [src/libs/utils/uploader.ts](src/libs/utils/uploader.ts)
  - Ensures destination directories under `uploads/<address>` exist (created recursively)
  - Filenames are UUIDs + original extension
- Served at `/uploads` via `express.static(process.cwd()/uploads)` in [src/app.ts](src/app.ts)

Upload fields by route:

- Member avatar (SPA): `/member/update` → single field name `memberImage` into `uploads/members`
- Product images (Admin): `/admin/product/create` → array field name `productImages` (max 5) into `uploads/products`

## Views and Front-end Scripts

- EJS templates: [src/views](src/views)
  - Layout includes Bootstrap, jQuery, Axios, and app CSS/JS in [includes/header.ejs](src/views/includes/header.ejs)
- Admin UI pages:
  - [home.ejs](src/views/home.ejs) landing with nav and animation
  - [login.ejs](src/views/login.ejs) and [signup.ejs](src/views/signup.ejs)
  - [products.ejs](src/views/products.ejs) product table + creation form (status inline update via Axios)
  - [users.ejs](src/views/users.ejs) user list with status selector
- Static assets (served from `/`): [src/public](src/public)
  - CSS: [src/public/css](src/public/css)
  - JS: [src/public/js](src/public/js) (e.g., [products.js](src/public/js/products.js), [users.js](src/public/js/users.js), [signup.js](src/public/js/signup.js), [home.js](src/public/js/home.js))

## Configuration and Constants

- Config/helpers: [src/libs/config.ts](src/libs/config.ts)
  - `MORGAN_FORMAT`, `shapeIntoMongooseObjectId`, `AUTH_TIMER`
- Errors: [src/libs/errors.ts](src/libs/errors.ts)
  - Centralized HTTP codes and messages; custom `Errors` class
- Types: [src/libs/types](src/libs/types)
- Enums: [src/libs/enums](src/libs/enums)

## Security Notes

- Passwords: hashed with bcrypt (`bcryptjs`)
- SPA JWT cookie `accessToken` is not httpOnly; consider setting `httpOnly: true` and handling via Authorization header for stricter security in production.
- Validate and sanitize user input in production (current code relies on Mongoose schema validation only).
- Ensure `SESSION_SECRET` and `TOKEN_SECRET` are strong and kept secret.

## Scripts

- `npm run dev`: nodemon + ts-node (watches [src/server.ts](src/server.ts))
- `npm start`: ts-node [src/server.ts](src/server.ts)
- `npm run build`: TypeScript compile via `tsc`
- `npm run train`: runs [src/train.ts](src/train.ts) demo task

## API Usage Examples

Signup (SPA):

```bash
curl -X POST http://localhost:3003/member/signup \
  -H 'Content-Type: application/json' \
  -d '{
    "memberNick": "john",
    "memberPhone": "123456789",
    "memberPassword": "secret"
  }' -i
```

List products:

```bash
curl 'http://localhost:3003/product/all?page=1&limit=12&order=productViews&productCollection=DISH&search=salad'
```

Create order:

```bash
curl -X POST http://localhost:3003/order/create \
  -H 'Content-Type: application/json' \
  --cookie "accessToken=<token-from-login>" \
  -d '[{"productId":"<id>","itemQuantity":2,"itemPrice":10}]'
```

## Notes

- The app assumes a single `RESTAURANT` member for the Admin side; signup will fail if it already exists.
- Order delivery is `5` when subtotal `< 100`, otherwise `0`.
- Product views increment only once per member per product using `View` records.

---

If you want, I can add OpenAPI (Swagger) docs or Postman collection, or switch SPA auth to httpOnly JWT + Authorization headers for production security.
