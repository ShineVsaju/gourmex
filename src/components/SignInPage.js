import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return <SignIn path="/login" routing="path" />;
};

export default SignInPage;