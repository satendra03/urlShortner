# Firebase Migration Guide

## Changes Made

This project has been successfully migrated from **MongoDB** to **Firebase Firestore**.

### Key Changes:

1. **Database**: MongoDB → Firebase Firestore
2. **Driver**: Mongoose → Firebase Admin SDK
3. **Connection**: Replaced `connection.js` with Firebase initialization
4. **Models**: Replaced Mongoose schemas with Firestore helper functions
5. **Controllers**: Updated to use Firestore queries instead of Mongoose methods

---

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Create a new project**
3. Enter your project name and follow the setup wizard
4. Enable Firestore Database

### 2. Get Service Account Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click on the **Service Accounts** tab
3. Click **Generate New Private Key**
4. Copy the entire JSON content

### 3. Set Environment Variables

1. Create a `.env` file in the `backend/` directory (or update existing one)
2. Add the following:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT=<paste the entire JSON here>
PORT=8000
BASE_URL=http://localhost:8000
```

**Important**: Keep `FIREBASE_SERVICE_ACCOUNT` as a single line JSON string without line breaks.

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Start the Server

```bash
npm run dev
```

---

## Database Structure

### Collection: `urls`

Each document contains:
- `shortId` (String): Unique identifier for the short URL
- `redirectUrl` (String): Original URL to redirect to
- `shortUrl` (String): Generated short URL
- `visitHistory` (Array): Array of visit timestamps
  - Each entry: `{ timestamp: number }`
- `createdAt` (Timestamp): When the URL was created
- `updatedAt` (Timestamp): Last updated time

---

## Testing the API

### Generate Short URL
```bash
curl -X POST http://localhost:8000/shorten \
  -H "Content-Type: application/json" \
  -d '{"redirectUrl":"https://example.com"}'
```

### Redirect to Original URL
```bash
curl -L http://localhost:8000/abc12345
```

### Analyze URL Visits
```bash
curl http://localhost:8000/analytics/abc12345
```

---

## Additional Notes

- **Firestore Pricing**: You get 1 million free reads/writes per month
- **Auto-scaling**: Firestore automatically scales with your needs
- **Real-time Updates** (optional): You can easily add real-time listeners if needed
- **Backup**: Firebase provides automatic backups

---

## Migration Checklist

- ✅ Replaced MongoDB connection with Firebase
- ✅ Removed Mongoose dependency
- ✅ Updated models to use Firestore
- ✅ Updated controllers with error handling
- ✅ Updated package.json
- ✅ Created environment variable example

---

For more help, refer to the [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup).
