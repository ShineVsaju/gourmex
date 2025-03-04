  import React from "react";
  import BannerBackground from "../assets/home-banner-background.png";
  import BannerImage from "../assets/fishricebeansavacado.png";
  import Navbar from "./navbar";
  import { FiArrowRight } from "react-icons/fi";
  import { useNavigate } from "react-router-dom";
  import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"; 
  const Home = () => {
    const navigate = useNavigate();

    const handleOrderNowClick = () => {
      navigate("/collect"); // Navigate to the collect page
    };
    return (
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">  
            <img src={BannerBackground} alt="" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Your Favourite Food Delivered Hot & Fresh
            </h1>
            <p className="primary-text">
              Switch to Goal based diet!<br></br>
              Tasty, without any Guilt.
            </p>
            {/* Protected Order Now Button */}
            <SignedIn>
              <button className="secondary-button" onClick={handleOrderNowClick}>
                Order Now <FiArrowRight />
              </button>
            </SignedIn>

            {/* If not signed in, show a message or redirect */}
            {/* <SignedOut> */}
              {/* <RedirectToSignIn /> Redirects the user to the sign-in page if not logged in */}
            {/* </SignedOut> */}
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    );
  };

  export default Home;