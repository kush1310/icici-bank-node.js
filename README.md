# 💳 ICICI Bank Node.js Web App

> A secure and responsive Node.js-based web application simulating online banking services for **ICICI Bank**. It features dynamic UI components, user authentication, session management, payment interface, and QR-based signup logic. Designed with scalability and real-time interactions in mind.

![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
![Made with](https://img.shields.io/badge/Made%20with-Express%20%26%20MySQL-orange)

---

## 📑 Table of Contents

- [Features](#-features)
- [UI Highlights](#-ui-highlights)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## ✨ Features

- 🔐 **User Authentication** (Signup/Login) with session handling
- 🔄 **Session-based login flow**
- 🧾 **Dynamic forms** for signup and payment
- 💳 **QR code logic** (planned, partially implemented)
- 📬 **Email integration** via `nodemailer`
- 🏦 **MySQL database** for user data
- ⚙️ **Responsive frontend** with Bootstrap & custom CSS
- 🔄 **Redirect and navigation pages** for various services (loans, payments)

---

## 🎨 UI Highlights

- Mobile-first responsive design using `Bootstrap 5`
- Styled components with custom media queries
- Navigation bars with hover effects
- Payment forms styled with CSS variables
- Form inputs with validation and error messages
- Slideshow banners, cards, and loan services

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/kush1310/icici-bank-node.js.git
cd icici-bank-node.js

# Install dependencies
npm install

# Create a .env file based on the config below
cp .env.example .env
