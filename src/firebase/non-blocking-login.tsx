'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance)
    .catch((error) => {
        // Even non-blocking calls should log errors to the console
        // in case something goes wrong during initialization.
        console.error("Anonymous sign-in failed:", error);
    });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
