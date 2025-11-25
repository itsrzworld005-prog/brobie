import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";


const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Navbar */}
      <Navigation />
    
      {/* Page-specific content will load here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
