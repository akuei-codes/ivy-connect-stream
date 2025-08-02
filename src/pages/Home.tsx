import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  Filter, 
  Users, 
  Zap, 
  Coffee, 
  Rocket, 
  Moon,
  Heart,
  MessageCircle,
  Settings,
  Bell,
  Search
} from "lucide-react";
import ivyDecoration from "@/assets/ivy-decoration.png";

const Home = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const moods = [
    { id: "energetic", label: "Energetic", icon: Zap, color: "bg-accent" },
    { id: "chill", label: "Chill", icon: Coffee, color: "bg-primary" },
    { id: "ambitious", label: "Ambitious", icon: Rocket, color: "bg-ivy-600" },
    { id: "night-owl", label: "Night Owl", icon: Moon, color: "bg-purple-500" }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Study Break Vibes",
      description: "Chat with other students taking a break",
      participants: 23,
      mood: "chill",
      tag: "Popular"
    },
    {
      id: 2,
      title: "Startup Corner",
      description: "Entrepreneurial minds unite",
      participants: 8,
      mood: "ambitious",
      tag: "Hot"
    },
    {
      id: 3,
      title: "Late Night Thoughts",
      description: "Deep conversations after midnight",
      participants: 15,
      mood: "night-owl",
      tag: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" />
              <AvatarFallback className="ivy-gradient bg-clip-text text-transparent font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-mobile-lg font-bold">Welcome back, John!</h1>
              <p className="text-mobile-xs text-muted-foreground">Harvard University • Junior</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="organic-button p-2">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="organic-button p-2">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="organic-card mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-mobile-lg font-bold text-primary">47</div>
                <div className="text-mobile-xs text-muted-foreground">Connections</div>
              </div>
              <div>
                <div className="text-mobile-lg font-bold text-accent">12</div>
                <div className="text-mobile-xs text-muted-foreground">This Week</div>
              </div>
              <div>
                <div className="text-mobile-lg font-bold text-ivy-600">89%</div>
                <div className="text-mobile-xs text-muted-foreground">Match Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main CTA */}
        <Card className="organic-card mb-6 relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            style={{
              backgroundImage: `url(${ivyDecoration})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top right'
            }}
          />
          <CardContent className="p-6 relative z-10">
            <div className="text-center space-y-4">
              <Video className="w-16 h-16 text-primary mx-auto ivy-float" />
              <div>
                <h2 className="font-display text-mobile-xl font-bold mb-2">
                  Ready to connect?
                </h2>
                <p className="text-mobile-sm text-muted-foreground">
                  Meet new people from your campus through spontaneous video conversations
                </p>
              </div>
              <Button className="w-full h-14 ivy-gradient organic-button font-semibold text-mobile-base ivy-transition hover:ivy-glow">
                <Video className="w-5 h-5 mr-2" />
                Start Matching
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mood Selection */}
        <div className="mb-6">
          <h3 className="font-display text-mobile-lg font-semibold mb-3">What's your vibe?</h3>
          <div className="grid grid-cols-2 gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <Card 
                  key={mood.id}
                  className={`organic-card cursor-pointer ivy-transition ${
                    selectedMood === mood.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${mood.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-mobile-sm">{mood.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-mobile-lg font-semibold">Recommended for you</h3>
            <Button variant="ghost" size="sm" className="organic-button">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="organic-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-mobile-base">{rec.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {rec.tag}
                        </Badge>
                      </div>
                      <p className="text-mobile-sm text-muted-foreground mb-2">{rec.description}</p>
                      <div className="flex items-center space-x-4 text-mobile-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{rec.participants} active</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full ivy-pulse" />
                          <span>Live now</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="ivy-gradient organic-button ml-4">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/campus-lounge">
            <Card className="organic-card">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-mobile-sm">Campus Lounge</p>
                <p className="text-mobile-xs text-muted-foreground">Join themed rooms</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/explore">
            <Card className="organic-card">
              <CardContent className="p-4 text-center">
                <Search className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="font-semibold text-mobile-sm">Explore Feed</p>
                <p className="text-mobile-xs text-muted-foreground">Discover highlights</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Connections */}
        <div className="mb-8">
          <h3 className="font-display text-mobile-lg font-semibold mb-3">Recent Connections</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0">
                <div className="text-center">
                  <Avatar className="w-16 h-16 border-2 border-primary/20 mb-2">
                    <AvatarFallback className="text-sm">U{i}</AvatarFallback>
                  </Avatar>
                  <p className="text-mobile-xs font-medium">User {i}</p>
                  <p className="text-mobile-xs text-muted-foreground">2h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;