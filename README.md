# AFDEC Online Chicken Booking System

This is a Next.js application built with Firebase Studio for managing online chicken bookings.

## Deploying to Vercel

This project is configured and ready for deployment on Vercel. Follow these steps:

### 1. Push to GitHub
- Create a new repository on your GitHub account (e.g., `afdec-booking`).
- Connect your local project to the GitHub repository and push the code.

### 2. Import Project on Vercel
- Sign up for a Vercel account with your GitHub profile.
- Click **Add New Project**.
- Import the repository you just created.
- Vercel will automatically detect that this is a Next.js project.

### 3. Configure Environment Variables
- In the project settings on Vercel, navigate to the **Environment Variables** section.
- Add the following variables. These are your Firebase project keys, which allow your website on Vercel to connect to your Firebase database and authentication.

| Name                                    | Value                                      |
| --------------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`         | `afdec`                                    |
| `NEXT_PUBLIC_FIREBASE_APP_ID`             | `1:582147304168:web:7fded798402f9d2e33775d` |
| `NEXT_PUBLIC_FIREBASE_API_KEY`            | `AIzaSyCl4XwksqQjAk5HAGwypqA4m962uLlR8wI`   |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`        | `afdec.firebaseapp.com`                    |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| `582147304168`                             |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`     |                                            |

### 4. Deploy
- Click the **Deploy** button.
- Vercel will build and deploy your application, providing you with a live URL (e.g., `afdec-booking.vercel.app`).
