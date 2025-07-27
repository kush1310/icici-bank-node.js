# ICICI Bank Node.js Web Application

A full-stack simulation of ICICI Bank’s online banking portal using Node.js, Express, MySQL, and Bootstrap 5. The application enables user registration, login, QR code generation, session-based routing, and financial service navigation in a responsive web interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [UI Components](#ui-components)
- [License](#license)

---

## Overview

This Node.js-based web application is designed to emulate ICICI Bank’s digital services portal, incorporating backend logic, secure user session handling, frontend UI with dynamic routing, and modular scalability. It uses MySQL for data persistence, supports user signup/login, and includes a structured dashboard and payment interface with responsive UI components.

---

## Features

- Secure user authentication with session management
- Dynamic user registration and login forms
- MySQL-backed user table with auto-creation logic
- Frontend payment dashboard with validation
- User dashboard and service redirection
- Email sending capability using Nodemailer
- Structured QR code integration (template present)
- Responsive UI using Bootstrap 5 and custom media queries

---

## Technologies

| Layer        | Tools & Libraries                                  |
|--------------|-----------------------------------------------------|
| Frontend     | HTML, CSS, Bootstrap 5                              |
| Backend      | Node.js, Express, dotenv, express-session           |
| Database     | MySQL, mysql2                                       |
| Utilities    | body-parser, cors, nodemailer, QRCode, uuid         |

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/kush1310/icici-bank-node.js.git
   cd icici-bank-node.js
