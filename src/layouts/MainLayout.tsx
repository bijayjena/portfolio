import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingControls from "@/components/FloatingControls";
import AIChatbot from "@/components/AIChatbot";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingControls />
      <AIChatbot />
    </div>
  );
};

export default MainLayout;
