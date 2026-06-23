import React from 'react';
import {
  ClerkProvider,
  SignedIn as ClerkSignedIn,
  SignedOut as ClerkSignedOut,
  SignInButton as ClerkSignInButton,
  UserButton as ClerkUserButton,
} from '@clerk/clerk-react';
import { clerkPublishableKey, isClerkEnabled } from './auth.constants.js';

export const AuthProvider = ({ children }) => {
  if (!isClerkEnabled) {
    return children;
  }

  return <ClerkProvider publishableKey={clerkPublishableKey}>{children}</ClerkProvider>;
};

export const SignedIn = ({ children }) => {
  if (!isClerkEnabled) {
    return null;
  }

  return <ClerkSignedIn>{children}</ClerkSignedIn>;
};

export const SignedOut = ({ children }) => {
  if (!isClerkEnabled) {
    return <>{children}</>;
  }

  return <ClerkSignedOut>{children}</ClerkSignedOut>;
};

export const SignInButton = ({ children, ...props }) => {
  if (!isClerkEnabled) {
    return children;
  }

  return <ClerkSignInButton {...props}>{children}</ClerkSignInButton>;
};

export const UserButton = (props) => {
  if (!isClerkEnabled) {
    return null;
  }

  return <ClerkUserButton {...props} />;
};
