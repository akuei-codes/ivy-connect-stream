import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, 
  PhoneOff, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  Plus,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  Volume2,
  VolumeX,
  MessageCircle,
  Lightbulb,
  Heart,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const VideoCall = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [showExtendOptions, setShowExtendOptions] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const prompts = [
    "What's the most interesting class you've taken this semester?",
    "If you could have dinner with any professor, who would it be?",
    "What's your biggest college confession?",
    "What's the weirdest study spot on campus?",
    "If you could add one class to your university, what would it be?"
  ];

  const otherUser = {
    name: "Sarah Chen",
    year: "Sophomore",
    major: "Computer Science",
    university: "Harvard University",
    interests: ["AI", "Photography", "Travel"]
  };

  useEffect(() => {
    // Set random prompt on start
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowExtendOptions(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate("/post-call-feedback", { 
      state: { 
        otherUser,
        duration: 180 - timeLeft 
      } 
    });
  };

  const handleExtendCall = (duration: number) => {
    setTimeLeft(timeLeft + duration);
    setShowExtendOptions(false);
    toast.success(`Call extended by ${duration / 60} minutes!`);
  };

  const handleReport = () => {
    toast.success("Report submitted. Call will end now.");
    setTimeout(() => navigate("/home"), 1000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivy-600/20 via-black to-ivy-800/20" />
      
      {/* Top Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-mono text-lg font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Connection Quality */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-1 h-3 rounded-full ${
                    i <= 3 ? "bg-primary" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-white text-sm">Good</span>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="relative h-screen flex flex-col">
        {/* Top Half - Other User */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          
          {/* Other User Info Overlay */}
          <div className="absolute bottom-4 left-4 z-10">
            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 border-2 border-white/30">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{otherUser.name}</h3>
                    <p className="text-white/80 text-xs">
                      {otherUser.year} • {otherUser.major}
                    </p>
                    <div className="flex space-x-1 mt-1">
                      {otherUser.interests.slice(0, 2).map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Half - Your Video */}
        <div className="flex-1 relative border-t-2 border-white/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Your Info */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="text-right">
              <p className="text-white font-semibold text-sm">You</p>
              <p className="text-white/80 text-xs">Junior • Economics</p>
            </div>
          </div>

          {/* Video Off Overlay */}
          {isVideoOff && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <div className="text-center">
                <VideoOff className="w-12 h-12 text-white/60 mx-auto mb-2" />
                <p className="text-white/80">Camera is off</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Icebreaker Prompt */}
      {currentPrompt && (
        <div className="absolute top-20 left-4 right-4 z-20">
          <Card className="bg-accent/90 backdrop-blur-sm border-accent/30">
            <CardContent className="p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-accent-foreground/80 mb-1">Icebreaker of the Day</p>
                  <p className="text-sm text-accent-foreground font-medium">{currentPrompt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Extend Call Options */}
      {showExtendOptions && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
          <Card className="mx-4 organic-card">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">Great conversation!</h3>
              <p className="text-sm text-muted-foreground mb-6">Want to keep talking?</p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => handleExtendCall(300)}
                  className="w-full ivy-gradient organic-button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Extend +5 minutes
                </Button>
                <Button 
                  onClick={() => handleExtendCall(600)}
                  variant="outline"
                  className="w-full organic-button"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Extend +10 minutes
                </Button>
                <Button 
                  onClick={handleEndCall}
                  variant="ghost"
                  className="w-full organic-button"
                >
                  End Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center space-x-4">
          {/* Audio Controls */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full ${
              isMuted ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </Button>

          {/* Video Toggle */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full ${
              isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-6 h-6 text-white" />
            ) : (
              <VideoIcon className="w-6 h-6 text-white" />
            )}
          </Button>

          {/* Speaker Toggle */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsSpeakerOff(!isSpeakerOff)}
            className={`w-14 h-14 rounded-full ${
              isSpeakerOff ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isSpeakerOff ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex justify-center space-x-6 mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 organic-button"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 organic-button"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReport}
            className="text-red-400 hover:bg-red-500/20 organic-button"
          >
            <Flag className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
