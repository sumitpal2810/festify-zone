import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, MessageCircle, Users, Heart, Share2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const relatedEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Summit",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&q=80",
    viewers: 8500,
    isLive: true,
  },
  {
    id: 2,
    title: "Web Development Workshop",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&q=80",
    viewers: 3200,
    isLive: true,
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&q=80",
    viewers: 5100,
    isLive: false,
  },
  {
    id: 4,
    title: "Design Systems Conference",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&q=80",
    viewers: 2800,
    isLive: true,
  },
];

const chatMessages = [
  { id: 1, user: "TechFan92", message: "This keynote is amazing! 🔥", time: "2m ago" },
  { id: 2, user: "DevMaster", message: "Great insights on AI trends", time: "1m ago" },
  { id: 3, user: "Sarah_K", message: "Can't wait for the Q&A session", time: "45s ago" },
  { id: 4, user: "CodeNinja", message: "The demo was incredible!", time: "30s ago" },
  { id: 5, user: "StartupGuy", message: "Taking notes 📝", time: "15s ago" },
];

const VideoStream = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([35]);
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} onLogout={() => {}} />
      
      <main className="pt-16">
        <div className="flex flex-col lg:flex-row">
          {/* Main Video Section */}
          <div className={`flex-1 ${showChat ? "lg:mr-80" : ""}`}>
            {/* Back Button */}
            <div className="container mx-auto px-4 py-4">
              <Button 
                variant="ghost" 
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/")}
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Events
              </Button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black aspect-video mx-4 lg:mx-8 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
                alt="Stream"
                className="w-full h-full object-cover"
              />
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive rounded-lg">
                  <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-destructive-foreground">LIVE</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-lg">
                  <Users className="h-4 w-4 text-foreground" />
                  <span className="text-sm font-medium text-foreground">12,547 watching</span>
                </div>
              </div>

              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="h-12 w-12 text-white" />
                  ) : (
                    <Play className="h-12 w-12 text-white" />
                  )}
                </button>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white" />
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? (
                          <VolumeX className="h-5 w-5 text-white" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-white" />
                        )}
                      </button>
                      <Slider
                        value={isMuted ? [0] : volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-24"
                      />
                    </div>

                    <span className="text-sm text-white">1:23:45</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <Settings className="h-5 w-5 text-white" />
                    </button>
                    <button 
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors lg:hidden"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageCircle className="h-5 w-5 text-white" />
                    </button>
                    <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <Maximize className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="container mx-auto px-4 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Tech Summit 2024 - Opening Keynote
                  </h1>
                  <p className="text-muted-foreground">
                    Join us for the biggest tech conference of the year featuring industry leaders and innovators
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2">
                    <Heart className="h-4 w-4" />
                    12.5K
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Related Events */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-foreground mb-4">Related Events</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative rounded-lg overflow-hidden mb-2">
                        <img
                          src={event.thumbnail}
                          alt={event.title}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform"
                        />
                        {event.isLive && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-destructive rounded text-xs font-semibold text-destructive-foreground">
                            LIVE
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-xs text-foreground">
                          {event.viewers.toLocaleString()} viewers
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="hidden lg:flex flex-col w-80 fixed right-0 top-16 bottom-0 bg-card border-l border-border">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Live Chat
                </h3>
                <span className="text-xs text-muted-foreground">12,547 viewers</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-foreground break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1 px-4 py-2 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm">Send</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoStream;
