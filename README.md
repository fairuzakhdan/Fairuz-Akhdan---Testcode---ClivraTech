# Lead Generation System

A simple lead generation system with admin panel built for a case study task.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Validation**: Zod
- **Storage**: In-memory (array)

## 📋 Features

- Landing page with business intro
- Lead submission form with validation
- REST API for lead management
- Admin panel with authentication
- Filter leads by service type

## 🔌 API Routes

### `POST /api/leads`
Create a new lead
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "serviceType": "Consulting"
}
```

### `GET /api/leads`
Get all leads

### `GET /api/leads?serviceType=Consulting`
Filter leads by service type

## 🔐 Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 🏃 Running Locally

```bash
npm install
npm run dev
```

Visit:
- Landing page: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## 📦 Deployment

Deploy to Vercel:
```bash
vercel --prod
```

## ⏱️ What I'd Improve With More Time

1. **Persistent Storage**: Use PostgreSQL/MongoDB instead of in-memory
2. **Authentication**: Implement JWT-based auth with secure sessions
3. **Email Notifications**: Send confirmation emails to leads
4. **Export Feature**: Allow admins to export leads as CSV
5. **Analytics Dashboard**: Add charts for lead statistics
6. **Form Enhancement**: Add CAPTCHA and better error handling
7. **Testing**: Add unit and integration tests
8. **Pagination**: For large lead datasets
9. **Search**: Full-text search across all lead fields
10. **Responsive Design**: Better mobile optimization

## 📝 Notes

- This uses dummy data only
- In-memory storage resets on server restart
- Hardcoded credentials for demo purposes only
