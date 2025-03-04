import "./App.css";
import Home from "./components/Home";
import About from "./components/about";
import Work from "./components/work";
import Testimonial from "./components/testimonial";
import Contact from "./components/contact";
import Footer from "./components/footer";
import React from "react";
/*import MRU from "./components/MRU";*/

function App() {
  return (
    
 
    <div className="App">
      <Home />
      <About />
       <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
   
  );
}

export default App;