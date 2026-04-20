خدي بسرعة ملف read file ارفعيه 
# 🌙 White Night — Hall Booking Platform

A full-stack web application for booking event halls in Egypt. Users can discover, search, and book halls for weddings, engagements, graduation parties, and photo sessions.

---

## 🗂️ Project Structure

```
white-night/
├── app.js                  # Entry point — Express server setup
├── config/
│   └── connectdb.js        # MongoDB connection
├── models/                 # Mongoose schemas
├── routes/                 # Express route definitions
├── controller/             # Business logic
├── middleware/             # Auth, error handling, file upload
├── validators/             # Joi validation schemas
├── Utils/                  # Helpers (Cloudinary, notifications, constants)
├── vercel.json             # Vercel deployment config
└── frontend/               # React + Vite frontend
    └── src/
        ├── App.jsx
        ├── app/
        │   ├── layouts/    # AdminLayout, AuthLayout, MainLayout (stubs)
        │   └── routes/     # AppRoutes, ProtectedRoute (stub)
        └── features/
            ├── home/
            ├── search/
            ├── Hall/
            ├── Booking/
            ├── Auth/
            ├── favorites/
            └── Profile/
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Backend Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcrypt |
| File Storage | Cloudinary |
| File Uploads | Multer (memory storage) |
| Validation | Joi |
| AI Integration | Anthropic Claude API |
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Routing (FE) | React Router DOM v7 |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Anthropic API key

### Backend Setup

```bash
cd white-night
npm install
```

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=7000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

ANTHROPIC_API_KEY=your_anthropic_key
```

```bash
npm run dev     # Development (nodemon)
npm start       # Production
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Auth — `/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login and receive JWT | Public |

### Users — `/user`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/user/me` | Get my profile | Private |
| GET | `/user` | Get all users | Admin |
| GET | `/user/:id` | Get user by ID | Admin |
| PUT | `/user/:id` | Update user | Admin / Account Owner |
| DELETE | `/user/:id` | Delete account | Admin / Account Owner |

### Halls — `/halls`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/halls` | Get all halls (with filters) | Public |
| GET | `/halls/:id` | Get hall details + reviews | Public |
| GET | `/halls/dashboard/me` | Owner dashboard + stats | Owner |
| POST | `/halls` | Create a hall | Owner / Admin |
| PUT | `/halls/:id` | Update hall | Owner / Admin |
| DELETE | `/halls/:id` | Delete hall | Owner / Admin |

#### Hall Query Filters
`GET /halls?hallType=&priceRange=&governorate=&search=&minRating=&sortBy=&order=&page=&limit=`

### Bookings — `/bookings`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/bookings` | Get all bookings | Admin |
| GET | `/bookings/my` | Get my bookings | User |
| GET | `/bookings/hall/:hallId` | Get bookings for a hall | Owner / Admin |
| POST | `/bookings` | Create a booking | User |
| PATCH | `/bookings/:id/status` | Confirm or cancel booking | Owner / Admin |
| PATCH | `/bookings/:id/cancel` | Cancel own booking | User |

#### Booking Body
```json
{
  "hallId": "...",
  "eventDate": "2025-08-15",
  "eventType": "Wedding",
  "guestsCount": 150,
  "contactPhone": "01012345678",
  "notes": "Optional notes"
}
```
**Event Types:** `Foto Session`, `Graduation Party`, `Wedding`, `Engagement`

### Reviews — `/reviews`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/reviews/:hallId` | Get all reviews for a hall | Public |
| POST | `/reviews/:hallId` | Add a review | User (requires confirmed booking) |
| PUT | `/reviews/:reviewId` | Update own review | User |
| DELETE | `/reviews/:reviewId` | Delete a review | Review Owner / Admin |

### Favorites — `/favorites`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/favorites` | Get my favorite halls | User |
| GET | `/favorites/check/:hallId` | Check if hall is favorited | User |
| POST | `/favorites/:hallId` | Add hall to favorites | User |
| DELETE | `/favorites/:hallId` | Remove from favorites | User |

### Notifications — `/notifications`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/notifications` | Get my notifications (last 50) | Private |
| PATCH | `/notifications/read-all` | Mark all as read | Private |
| PATCH | `/notifications/:id/read` | Mark one as read | Private |
| DELETE | `/notifications` | Clear all notifications | Private |

### File Upload — `/upload`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/upload/hall/:id/cover` | Upload/replace cover photo | Owner / Admin |
| POST | `/upload/hall/:id/gallery` | Add gallery images (max 10) | Owner / Admin |
| DELETE | `/upload/hall/:id/gallery/:publicId` | Delete a gallery image | Owner / Admin |

### Owner Requests — `/owner`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/owner/request` | Submit hall data to become owner | User (ownerStatus: pending) |
| GET | `/owner/requests` | View all pending requests | Admin |
| PATCH | `/owner/requests/:id/approve` | Approve owner request | Admin |
| PATCH | `/owner/requests/:id/reject` | Reject owner request | Admin |

### AI Chat — `/ai`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/ai/chat` | AI hall recommendation chat | Public |

#### AI Chat Body
```json
{
  "message": "أنا محتاج قاعة للأفراح في القاهرة لـ 200 شخص",
  "history": []
}
```

---

## 🗄️ Data Models

### User
```
fullname, email, phone, password, role (user|admin|Owner),
ownerStatus (none|pending|approved|rejected), otp, otpExpire
```

### Hall
```
name, email, description, coverPhoto, Gallery[], hallType[],
priceRange (low|medium|high), capacity, phoneNumber, whatsappNumber,
facebookLink, address { governorate, city, street, details },
averageRating, numberOfReviews, Owner (ref: User)
```

### Booking
```
hall (ref), user (ref), eventDate, eventType, guestsCount,
notes, contactPhone, status (pending|confirmed|cancelled), totalPrice
```

### Review
```
title, Content, rating (1–5), Hall (ref), user (ref)
```
> One review per user per hall (unique index on Hall + user)

### FavHall
```
user (ref), hall (ref)
```
> Unique index on user + hall prevents duplicates

### Notification
```
user (ref), type, message, isRead, relatedBooking (ref), relatedHall (ref)
```

**Notification Types:**
- `booking_confirmed` — owner confirmed a booking
- `booking_cancelled` — booking was cancelled
- `booking_received` — owner received a new booking
- `review_added` — owner got a new review
- `owner_request_received` — admin: new owner request
- `owner_approved` — user's owner request was approved
- `owner_rejected` — user's owner request was rejected

### OwnerRequest
```
user (ref), name, email, description, coverPhoto, Gallery[],
hallType[], priceRange, capacity, phoneNumber, whatsappNumber,
facebookLink, address, status (pending|approved|rejected)
```

---

## 🔐 Authentication & Roles

All protected routes require:
```
Authorization: Bearer <token>
```

| Role | Capabilities |
|---|---|
| `user` | Browse halls, book, review, favorites, profile |
| `Owner` | All user capabilities + manage their hall, view bookings, respond to requests |
| `admin` | Full access to all resources |

### Registration Flow for Owners
1. Register with `role: "Owner"` → user is created with `ownerStatus: "pending"`
2. Submit `/owner/request` with hall data + images
3. Admin reviews and approves/rejects
4. On approval: user role becomes `Owner`, hall is created automatically

---

## 🤖 AI Features

The `/ai/chat` endpoint integrates Claude claude-opus-4-5 as a smart hall recommender. It:
- Fetches all halls from the database at request time
- Passes hall data as context to Claude
- Maintains conversation history across messages
- Responds in Arabic
- Recommends halls based on event type, guest count, governorate, and budget

---

## 🖼️ File Upload Rules

- Accepted formats: JPEG, PNG, WEBP
- Max file size: 5MB per image
- Max gallery size: 10 photos per hall
- Files are stored in Cloudinary under `white-night/covers` and `white-night/gallery`

---

## 🌐 Frontend Pages (React)

| Route | Component | Status |
|---|---|---|
| `/` | Home | Stub |
| `/search` | SearchPage | Stub |
| `/hall/:id` | HallDetails | Stub |
| `/booking/:id` | BookingPage | Stub |
| `/login` | Login | Stub |
| `/register` | Register | Stub |
| `/favorites` | Favorites | Stub |
| `/profile` | Profile | Stub |
| `*` | NotFound | Stub |

> **Note:** All frontend page components are currently stubs. Backend is fully implemented.

---

## 📋 Constants

| Constant | Values |
|---|---|
| Hall Types | `Hall`, `Organization_halls`, `Roof`, `Photosation` |
| Event Types | `Foto Session`, `Graduation Party`, `Wedding`, `Engagement` |
| Price Ranges | `low`, `medium`, `high` |

---

## 🚢 Deployment

The project includes a `vercel.json` for Vercel deployment. The backend serves as a serverless API.

---

## 📝 Notes

- JWT tokens expire after **5 hours**
- Bookings check for date conflicts — only one booking per hall per day
- Reviews require a confirmed booking at that hall
- Deleting a hall cascades to reviews, favorites, and bookings
- Deleting the last admin account is blocked
- Notifications are non-blocking — failures are logged but don't interrupt the main flow
