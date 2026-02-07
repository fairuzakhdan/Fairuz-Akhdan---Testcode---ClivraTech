# Lead Generation System - ClivraTech

A simple lead generation system with admin panel built for a case study task.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Validation**: Zod
- **Storage**: JSON File (Persistent)
- **Authentication**: localStorage (Demo purposes)

## 📋 Features

- Landing page with business intro and service showcase
- Lead submission form with client & server-side validation
- REST API for lead management
- Admin panel with authentication
- Filter leads by service type
- Unique email and phone validation
- Persistent data storage
- Responsive design with glassmorphism UI

## 🔌 API Routes

### `POST /api/leads`
Create a new lead with validation
```json
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+6281234567890",
  "serviceType": "Web Development"
}

Response (201):
{
  "lead": {
    "id": "1770458153193",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+6281234567890",
    "serviceType": "Web Development",
    "createdAt": "2026-02-07T09:55:53.195Z"
  }
}

Error (400):
{
  "error": "Email already registered"
}
```

### `GET /api/leads`
Get all leads
```json
Response (200):
{
  "leads": [...]
}
```

### `GET /api/leads?serviceType=Web Development`
Filter leads by service type
```json
Response (200):
{
  "leads": [
    // Only leads with matching serviceType
  ]
}
```

## 🔐 Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit:
- Landing page: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## 📦 Deployment

Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## ⏱️ What I'd Improve With More Time

### 1. **Architecture & Scalability**
- **Separate Frontend & Backend**: Split into React (FE) and Express.js/NestJS (BE) for better separation of concerns and team collaboration
- **Microservices Architecture**: Break down into independent services (Auth Service, Lead Service, Notification Service) for scalability
- **API Gateway**: Implement gateway pattern for routing and load balancing

### 2. **Database & Storage**
- **MongoDB/PostgreSQL**: Replace JSON file with proper database for ACID compliance, indexing, and query optimization
- **Database Migrations**: Use Prisma/TypeORM for schema versioning and migrations
- **Caching Layer**: Implement Redis for frequently accessed data and session management

### 3. **Authentication & Security**
- **JWT-based Auth**: Replace localStorage with secure HTTP-only cookies and refresh tokens
- **Role-Based Access Control (RBAC)**: Implement admin, manager, and viewer roles
- **Rate Limiting**: Prevent spam and DDoS attacks
- **Input Sanitization**: Add XSS and SQL injection protection
- **HTTPS & CORS**: Proper security headers and CORS configuration

### 4. **Features & Functionality**
- **Email Notifications**: Send confirmation emails to leads and alerts to admins
- **Export Data**: CSV/Excel export for leads with date range filters
- **Advanced Filtering**: Search, sort, pagination, and multi-field filtering
- **Lead Status Management**: Track lead stages (New, Contacted, Qualified, Converted)
- **Analytics Dashboard**: Charts for lead trends, conversion rates, and service popularity
- **Soft Delete**: Archive leads instead of permanent deletion

### 5. **Code Quality & Best Practices**
- **Atomic Design Pattern**: Organize components into atoms, molecules, organisms, templates
- **Unit & Integration Tests**: Jest, React Testing Library, Supertest for API testing
- **E2E Testing**: Playwright/Cypress for user flow testing
- **API Documentation**: Swagger/OpenAPI for interactive API docs
- **Error Tracking**: Sentry for production error monitoring
- **Logging**: Winston/Pino for structured logging

### 6. **DevOps & CI/CD**
- **Docker**: Containerize application for consistent environments
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- **Environment Management**: Proper .env handling for dev/staging/production
- **Monitoring**: Prometheus + Grafana for metrics and alerts

### 7. **Performance Optimization**
- **Server-Side Rendering (SSR)**: For better SEO and initial load time
- **Image Optimization**: Next.js Image component with CDN
- **Code Splitting**: Lazy loading for better performance
- **Database Indexing**: Optimize queries with proper indexes

### 8. **User Experience**
- **Form Validation**: Real-time validation with better error messages
- **Loading States**: Skeleton screens and optimistic UI updates
- **Accessibility (a11y)**: WCAG compliance, keyboard navigation, screen reader support
- **Internationalization (i18n)**: Multi-language support
- **Dark Mode**: Theme switching capability


## 📝 Notes

- This uses dummy data only for demonstration purposes
- JSON file storage is suitable for MVP/prototype but not production-ready
- Hardcoded credentials are for demo only - never use in production
- For production, implement proper authentication, database, and security measures

## 📄 License

This project is for case study purposes only.
