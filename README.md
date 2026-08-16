# 📄 DocuPortal — Document & Application Management System

A full-stack **Document & Application Management System** designed to streamline application submission, review workflows, document generation, template management, authentication, and data export through a centralized web platform.

Built with **Angular, Node.js, Express.js, SQL, REST APIs, Docker, and JWT authentication**, the project demonstrates a modular full-stack architecture suitable for institutional, administrative, academic, and enterprise document workflows.

---

## ✨ Overview

**DocuPortal** provides a centralized platform where users can:

* 🔐 Register and securely authenticate
* 📝 Create and manage applications
* 📊 Monitor application status and dashboard metrics
* 👥 Support role-based application review
* 📄 Create and manage documents
* 🛠️ Build reusable document templates
* 👀 Preview templates before saving
* 📥 Export application and document data
* 🧾 Generate structured documents from templates
* 📋 Maintain activity and workflow records

The system is structured as a multi-layer application with separate frontend, backend, and database components.

---

## 🚀 Core Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Protected API routes
* User profile retrieval
* Role-based authorization
* Support for:

  * `user`
  * `reviewer`
  * `admin`

### 📑 Application Management

Users can create and manage applications through a centralized workflow.

Supported application states:

```text
Draft
   ↓
Submitted
   ↓
In Review
   ↓
Approved / Rejected
```

Additional capabilities include:

* Application creation
* Application listing
* Application detail view
* Status updates
* Priority management
* Dashboard metrics
* Application deletion
* Reviewer notes

### 📄 Document Management

The document module provides centralized document handling.

Features include:

* Document creation
* Document retrieval
* Document deletion
* Document-template relationships
* Document status management
* Application-document relationships
* Document export

Supported document states:

```text
Draft → Generated → Signed → Archived
```

### 🛠️ Template Builder

The project includes a visual template-building interface for creating reusable document layouts.

Features include:

* Template creation
* Template categorization
* Dynamic layout HTML
* Template fields
* Live preview
* Reusable placeholders
* Template persistence

Example dynamic placeholders:

```text
{{applicant_name}}
{{skill_name}}
{{award_date}}
```

### 📊 Dashboard

The dashboard provides a high-level overview of application activity.

Current metrics include:

* Total Applications
* Approved Applications
* Pending Applications
* Generated Documents
* Recent Submissions

### 📥 Export Center

The system supports structured data export, including:

* CSV exports
* JSON exports
* HTML document exports

This makes the platform suitable for reporting, archival, and external processing workflows.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      Client/User     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Angular Frontend   │
                    │   TypeScript / HTML  │
                    │        / CSS         │
                    └──────────┬───────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │      Node.js         │
                    ├──────────────────────┤
                    │ Authentication       │
                    │ Applications         │
                    │ Documents            │
                    │ Templates            │
                    │ Exports              │
                    │ Middleware           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    SQL Database      │
                    │ Users                 │
                    │ Applications          │
                    │ Documents             │
                    │ Templates             │
                    │ Activity Logs         │
                    └──────────────────────┘
```

---

## 🧰 Technology Stack

### Frontend

| Technology     | Purpose               |
| -------------- | --------------------- |
| Angular 17     | Application framework |
| TypeScript     | Frontend development  |
| HTML5          | Structure             |
| CSS3           | Styling               |
| RxJS           | Reactive programming  |
| Angular Router | Client-side routing   |

### Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | Runtime environment        |
| Express.js | REST API framework         |
| JWT        | Authentication             |
| bcryptjs   | Password hashing           |
| CORS       | Cross-origin communication |
| dotenv     | Environment configuration  |
| MySQL2     | Database connectivity      |

### Database

The project contains a relational data model covering:

* Users
* Applications
* Documents
* Templates
* Template fields
* Activity logs

### DevOps

* Docker
* Docker Compose
* Nginx
* GitHub Actions / CI configuration

---

## 📁 Project Structure

```text
New/
│
├── angular/
│   ├── app/
│   │   ├── components/
│   │   │   └── template-builder/
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   └── auth.service.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   │
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   └── exportController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── rateLimiter.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   └── dbQueries.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── documentRoutes.js
│   │   └── exportRoutes.js
│   │
│   ├── tests/
│   │   └── auth.test.js
│   │
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   └── signup.html
│
├── docker-compose.yml
└── .gitignore
```

---

## 🔌 REST API

### Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| `POST` | `/api/auth/register` | Register a new user            |
| `POST` | `/api/auth/login`    | Authenticate user              |
| `GET`  | `/api/auth/profile`  | Retrieve authenticated profile |

### Applications

| Method   | Endpoint                       | Description               |
| -------- | ------------------------------ | ------------------------- |
| `GET`    | `/api/applications`            | Get applications          |
| `GET`    | `/api/applications/:id`        | Get application details   |
| `POST`   | `/api/applications`            | Create application        |
| `GET`    | `/api/applications/metrics`    | Get dashboard metrics     |
| `PATCH`  | `/api/applications/:id/status` | Update application status |
| `DELETE` | `/api/applications/:id`        | Delete application        |

### Documents & Templates

| Method   | Endpoint                       | Description     |
| -------- | ------------------------------ | --------------- |
| `GET`    | `/api/documents`               | List documents  |
| `GET`    | `/api/documents/:id`           | Get document    |
| `POST`   | `/api/documents`               | Create document |
| `DELETE` | `/api/documents/:id`           | Delete document |
| `GET`    | `/api/documents/templates`     | List templates  |
| `GET`    | `/api/documents/templates/:id` | Get template    |
| `POST`   | `/api/documents/templates`     | Create template |

### Export

| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| `GET`  | `/api/export/applications/csv`  | Export applications as CSV |
| `GET`  | `/api/export/:type/:id/json`    | Export entity as JSON      |
| `GET`  | `/api/export/document/:id/html` | Export document as HTML    |

---

## 🗄️ Database Model

The primary data model consists of the following entities:

```text
Users
  │
  ├───────────────┐
  │               │
  ▼               ▼
Applications    Templates
  │               │
  │               ▼
  │         Template Fields
  │
  ▼
Documents
  │
  └───────────────► Activity Logs
```

### Main Tables

#### `users`

Stores authentication and user information.

Key fields:

* `id`
* `full_name`
* `email`
* `password_hash`
* `role`
* `is_active`
* `created_at`

#### `applications`

Stores user-submitted applications.

Key fields:

* `user_id`
* `title`
* `category`
* `status`
* `priority`
* `form_data`
* `reviewer_notes`
* `reviewed_by`

#### `templates`

Stores reusable document templates.

Key fields:

* `name`
* `category`
* `description`
* `layout_template`
* `created_by`

#### `template_fields`

Defines dynamic fields associated with templates.

Supported field types include:

```text
text
number
email
date
textarea
select
checkbox
```

#### `documents`

Stores generated documents and their metadata.

#### `activity_logs`

Provides an audit-style record of application activity.

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm
* Angular CLI 17+
* MySQL
* Git
* Docker *(optional)*

---

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd New
```

---

## 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=doc_app_db

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=1d

CORS_ORIGIN=http://localhost:4200
```

---

## 3. Configure the Database

Create the database and execute the SQL schema:

```bash
mysql -u root -p < database/schema.sql
```

Then load the seed data if required:

```bash
mysql -u root -p doc_app_db < database/seed.sql
```

---

## 4. Start the Backend

```bash
cd backend
npm start
```

Development mode:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

---

## 5. Start the Angular Frontend

```bash
cd angular
npm install
npm start
```

The Angular application will normally be available at:

```text
http://localhost:4200
```

---

## 🐳 Docker Deployment

The repository also contains Docker configuration for containerized deployment.

Run:

```bash
docker compose up --build
```

Services are configured around:

```text
Frontend  → Port 80
Backend   → Port 5000
Database  → Port 5432
```

### ⚠️ Database Configuration Note

The current repository contains **mixed database implementations**:

* Backend `db.js` includes MySQL connectivity through `mysql2`.
* `docker-compose.yml` configures PostgreSQL.
* Some SQL definitions use MySQL syntax.
* Other backend code uses PostgreSQL-style queries such as `$1` parameters.

Therefore, the database layer should be standardized to **either MySQL or PostgreSQL** before production deployment.

For the cleanest production architecture, choose one database engine and align:

* `db.js`
* `schema.sql`
* `seed.sql`
* SQL queries
* `package.json`
* `docker-compose.yml`
* environment variables

---

## 🔒 Security

The project includes several security-oriented components:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Role-based authorization
* Request validation middleware
* Rate-limiting middleware
* Centralized error handling
* Environment-based secrets

### Production Security Checklist

Before deploying publicly:

* [ ] Replace development JWT secrets
* [ ] Remove committed `.env` files
* [ ] Use HTTPS
* [ ] Configure production CORS
* [ ] Use strong database credentials
* [ ] Add request validation to every relevant endpoint
* [ ] Standardize and secure database access
* [ ] Add refresh-token/session strategy if required
* [ ] Review authorization rules
* [ ] Add security headers
* [ ] Configure production logging
* [ ] Run dependency vulnerability scans

---

## 🧪 Testing

Backend tests are located in:

```text
backend/tests/
```

Example:

```bash
cd backend
npm test
```

> Additional test coverage should be added for applications, documents, templates, exports, authorization, and validation before production release.

---

## 📈 Future Improvements

The current architecture provides a strong foundation, but several upgrades would make the project significantly more production-ready.

### High Priority

* PostgreSQL/MySQL architecture standardization
* Complete automated test coverage
* Stronger request validation
* Improved role-based permissions
* Secure document storage
* Production-grade logging
* API documentation with OpenAPI/Swagger
* Pagination and filtering
* Better frontend-backend error handling

### Advanced Features

* 📧 Email notifications
* 🔔 Real-time application status updates
* 📱 Responsive mobile-first interface
* 📊 Advanced analytics dashboard
* 🔎 Full-text document search
* 📝 Rich document editor
* 🖊️ Digital signatures
* 📑 PDF generation
* ☁️ Cloud document storage
* 🧑‍💼 Advanced admin dashboard
* 🔐 Multi-factor authentication
* 📜 Complete audit trail
* 🧩 Drag-and-drop template designer

---

## 🎯 Use Cases

DocuPortal can be adapted for:

* Universities and colleges
* Government application portals
* HR document workflows
* Employee onboarding
* Certificate generation
* Scholarship applications
* Administrative departments
* Internal enterprise workflows
* Document approval systems
* Digital application processing

---

## 📚 Learning Outcomes

This project demonstrates practical experience with:

* Full-stack application architecture
* Angular development
* REST API development
* Node.js and Express
* JWT authentication
* Password hashing
* Role-based authorization
* Relational database design
* SQL
* CRUD operations
* Middleware architecture
* Docker
* API integration
* Template-driven document generation
* Data export
* Git-based development
* Basic CI/CD concepts

---

## 🛣️ Development Roadmap

```text
[x] Authentication foundation
[x] Application management
[x] Document management
[x] Template management
[x] Export functionality
[x] Role-based workflow foundation
[x] Docker configuration
[ ] Database architecture standardization
[ ] Complete automated testing
[ ] API documentation
[ ] Production security hardening
[ ] PDF generation
[ ] Digital signatures
[ ] Cloud deployment
[ ] Advanced analytics
```

---

## 👨‍💻 Author

**Prafull Kumar**

BCA — Computer Applications

Interested in:

* Full-Stack Development
* Cybersecurity
* Software Engineering
* AI-powered Applications
* Web Technologies

---

## 📄 License

This project is currently intended for **educational and portfolio purposes**.

Add an appropriate open-source license before distributing the project publicly.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

> **DocuPortal — A structured approach to applications, documents, templates, and digital workflows.**
