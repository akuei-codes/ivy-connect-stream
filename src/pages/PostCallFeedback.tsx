import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Share, 
  Coffee,
  Zap,
  ThumbsUp,
  ArrowLeft,
  Save,
  Shield
} from "lucide-react";
import { toast } from "sonner";

const PostCallFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { otherUser, duration } = location.state || {};
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [connectRequested, setConnectRequested] = useState(false);
  const [memoryClipSaved, setMemoryClipSaved] = useState(false);

  const vibeOptions = [
    { id: "funny", label: "Funny", icon: "😄" },
    { id: "smart", label: "Smart", icon: "🧠" },
    { id: "chill", label: "Chill", icon: "😎" },
    { id: "energetic", label: "Energetic", icon: "⚡" },
    { id: "thoughtful", label: "Thoughtful", icon: "🤔" },
    { id: "creative", label: "Creative", icon: "🎨" }
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleConnect = () => {
    setConnectRequested(true);
    toast.success("Connection request sent! 🎉");
  };

  const handleSaveMemoryClip = () => {
    setMemoryClipSaved(true);
    toast.success("Memory clip saved to your highlights! ✨");
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please rate your conversation");
      return;
    }

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thanks for your feedback! 🌟");
    navigate("/home");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <p className="text-mobile-xs text-muted-foreground">Call Duration</p>
            <p className="font-mono font-semibold">{formatDuration(duration || 0)}</p>
          </div>
        </div>

        {/* Call Summary */}
        {otherUser && (
          <Card className="organic-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarFallback className="text-lg font-bold">
                    {otherUser.name.charAt(0)}{otherUser.name.split(' ')[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-display text-mobile-lg font-bold">{otherUser.name}</h2>
                  <p className="text-mobile-sm text-muted-foreground">
                    {otherUser.year} • {otherUser.major}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {otherUser.interests.map((interest: string) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant={connectRequested ? "default" : "outline"}
                  onClick={handleConnect}
                  disabled={connectRequested}
                  className="organic-button"
                >
                  {connectRequested ? (
                    <>
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Request Sent
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect
                    </>
                  )}
                </Button>
                
                <Button 
                  variant={memoryClipSaved ? "default" : "outline"}
                  onClick={handleSaveMemoryClip}
                  disabled={memoryClipSaved}
                  className="organic-button"
                >
                  {memoryClipSaved ? (
                    <>
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Clip
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rating */}
        <Card className="organic-card mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-mobile-xl">How was your conversation?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Star Rating */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 ivy-transition"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= rating 
                        ? "fill-accent text-accent" 
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            
            {rating > 0 && (
              <p className="text-center text-mobile-sm text-muted-foreground">
                {rating === 1 && "Not great - we'll try better matches next time"}
                {rating === 2 && "Could be better - thanks for the feedback"}
                {rating === 3 && "Good conversation!"}
                {rating === 4 && "Great conversation! 🌟"}
                {rating === 5 && "Amazing conversation! ✨"}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Vibe Tags */}
        <Card className="organic-card mb-6">
          <CardHeader>
            <CardTitle className="text-mobile-lg">What was the vibe?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {vibeOptions.map((vibe) => (
                <Button
                  key={vibe.id}
                  variant={selectedTags.includes(vibe.id) ? "default" : "outline"}
                  onClick={() => handleTagToggle(vibe.id)}
                  className={`h-12 organic-button ${
                    selectedTags.includes(vibe.id) 
                      ? "ivy-gradient text-primary-foreground" 
                      : ""
                  }`}
                >
                  <span className="text-lg mr-2">{vibe.icon}</span>
                  {vibe.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Written Feedback */}
        <Card className="organic-card mb-6">
          <CardHeader>
            <CardTitle className="text-mobile-lg">Any additional thoughts?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share what you enjoyed or any suggestions (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] organic-button resize-none"
              maxLength={300}
            />
            <p className="text-mobile-xs text-muted-foreground text-right mt-2">
              {feedback.length}/300
            </p>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="organic-card mb-6 bg-ivy-sage/30">
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <div className="text-mobile-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Privacy & Safety</p>
                <p>Your feedback helps us improve matching. Memory clips are only saved with your consent and can be deleted anytime.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full h-12 ivy-gradient organic-button font-semibold mb-8"
        >
          <Heart className="w-4 h-4 mr-2" />
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

export default PostCallFeedback;