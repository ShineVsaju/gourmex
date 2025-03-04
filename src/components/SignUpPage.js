import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return <SignUp path="/signup" routing="path" />;
};

export default SignUpPage;