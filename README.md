
# ICICI Bank Node.js Web Application

A professional-grade Node.js-based simulation of ICICI Bank’s digital banking portal. The platform includes secure user authentication, dynamic service navigation, responsive UI design, and scalable backend architecture using MySQL and Express.js. It also integrates automation hooks like session control, auto-DB table creation, and dynamic UI routing.

---

## Table of Contents

1. Overview
2. Features
3. Technologies Used
4. Installation
5. Usage
6. Project Structure
7. Environment Configuration
8. Database Setup
9. UI Components and Enhancements
10. Automation
11. License

---

## 1. Overview

This application replicates ICICI Bank’s online service structure using a backend system built with Node.js and Express. The platform supports user authentication, dynamic dashboards, automated routing, and backend-driven operations with integrated MySQL databases. Responsive design and smooth UX flow are accomplished using Bootstrap and tailored CSS.

---

## 2. Features

- Session-based user authentication and middleware access control
- Signup/Login with form validation and username duplication check
- Nodemailer-ready email support (plug & play)
- QR Code structure ready for encoding user credentials
- Responsive HTML/CSS frontend using Bootstrap 5
- Payment and Loan service interfaces
- Auto-redirect logic between key banking services
- Cross-browser compatible UI
- Route error handling and centralized redirects

---

## 3. Technologies Used

| Layer      | Technologies / Libraries                             |
|------------|-------------------------------------------------------|
| Frontend   | HTML5, CSS3, Bootstrap 5                              |
| Backend    | Node.js, Express, dotenv, express-session             |
| Database   | MySQL, MySQL2                                         |
| Utilities  | body-parser, cors, nodemailer, qrcode, uuid           |

---

## 4. Installation

```bash
git clone https://github.com/kush1310/icici-bank-node.js.git
cd icici-bank-node.js
npm install
```

---

## 5. Usage

```bash
npm start
```

Open in browser:

```
http://localhost:3000
```

---

## 6. Project Structure

```
.
├── server.js
├── package.json
├── .env
├── public/                      # Static files (QR code images)
├── log-in.html                  # Login UI
├── signup.html                  # Signup form
├── payment.html                 # Payments
├── user-dashboard.html          # Post-login dashboard
├── services_loans.html          # Loan-related services
├── redirect_home-loans.html     # Auto-redirect logic
├── redirect.css                 # Styling file
```

---

## 7. Environment Configuration

Create a `.env` file in the root directory:

```
PORT=3000
SESSION_SECRET=your_session_key_here
```

---

## 8. Database Setup

Create and configure the MySQL database:

```sql
CREATE DATABASE iciciBank;
```

The `Users` table is automatically created on first run:

```sql
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  qrCode TEXT NOT NULL
);
```

---

## 9. UI Components and Enhancements

- **Responsive Layout**: Fully mobile-optimized with media queries.
- **Navbar System**: Persistent top navigation with hover animations.
- **Form UX**: Validated inputs, subtle transitions, and error messages.
- **Visual Feedback**: Loader-free page transitions and modals.
- **Slideshow Integration**: Banner-style UI for loan and service promotion.
- **Payment Dashboard**: Styled with cards and interactive button behavior.
- **Redirect Pages**: Smart timed redirection using JS `setTimeout()`.

---

## 10. Automation

- **Session Management**: Express-session handles logins with max age control.
- **DB Auto-setup**: `Users` table is programmatically created if missing.
- **Public Directory**: QR image directory is auto-generated if not present.
- **Routing Checks**: Middleware functions enforce access on protected routes.
- **Redirection Logic**: Auto-redirects on loan and service pages.

---

## 11. License

This project is licensed under the ISC License.
