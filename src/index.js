import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact from './components/contact';
import About from './components/about';
import Navbar from './components/navbar';
import work from './components/work';
import Footer from './components/footer';
import Testimonial from './components/testimonial';
import Cart from './components/cart';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { ClerkProvider } from '@clerk/clerk-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import Collect from './components/collect';
// import { useNavigate } from "react-router-dom";


import ProtectedRoute from './components/ProtectedRoute';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/collect",
    element: <Collect />,
  },
  {
    path: "/testimonials",
    element: <Testimonial/>,
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
   
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Navbar />
     <RouterProvider router={router}></RouterProvider>
    <Footer/>
   </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

