import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { isClerkEnabled } from '../lib/auth.constants.js';

const useClerkAuthHook = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuth();

  return {
    user,
    isLoaded,
    isAuthenticated: !!user,
    signOut,
    userId: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
    firstName: user?.firstName,
    lastName: user?.lastName,
    fullName: user?.fullName,
    imageUrl: user?.imageUrl,
  };
};

const useFallbackAuth = () => ({
  user: null,
  isLoaded: true,
  isAuthenticated: false,
  signOut: async () => {},
  userId: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  fullName: undefined,
  imageUrl: undefined,
});

export const useAuth = isClerkEnabled ? useClerkAuthHook : useFallbackAuth;
