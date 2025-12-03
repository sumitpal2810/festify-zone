import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import UpcomingEvents from "@/components/UpcomingEvents";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="pt-16">
        <HeroBanner />
        <CategorySection />
        <UpcomingEvents />
        <SubscriptionPlans />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
