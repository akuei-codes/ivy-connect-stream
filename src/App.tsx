import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import VideoCall from "./pages/VideoCall";
import PostCallFeedback from "./pages/PostCallFeedback";
import CampusLounge from "./pages/CampusLounge";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/post-call-feedback" element={<PostCallFeedback />} />
          <Route path="/campus-lounge" element={<CampusLounge />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
