import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  Mic, 
  Video, 
  Coffee, 
  BookOpen, 
  Gamepad2, 
  Heart,
  Zap,
  Moon,
  Filter,
  Plus,
  Crown,
  Volume2
} from "lucide-react";

const CampusLounge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Rooms", icon: Users },
    { id: "study", label: "Study", icon: BookOpen },
    { id: "social", label: "Social", icon: Coffee },
    { id: "gaming", label: "Gaming", icon: Gamepad2 },
    { id: "late-night", label: "Late Night", icon: Moon }
  ];

  const featuredRooms = [
    {
      id: 1,
      name: "Harvard Confessions",
      description: "Anonymous sharing and support",
      participants: 47,
      maxParticipants: 50,
      category: "social",
      mood: "chill",
      university: "Harvard University",
      isLive: true,
      isFeatured: true,
      isPrivate: false,
      recentActivity: "Someone just shared about imposter syndrome"
    },
    {
      id: 2,
      name: "CS Study Gang",
      description: "Coding together, debugging life",
      participants: 23,
      maxParticipants: 30,
      category: "study",
      mood: "focused",
      university: "MIT",
      isLive: true,
      isFeatured: true,
      isPrivate: false,
      recentActivity: "Working on Algorithm problems"
    }
  ];

  const liveRooms = [
    {
      id: 3,
      name: "Stanford Sleep Club",
      description: "For the eternally tired",
      participants: 15,
      maxParticipants: 25,
      category: "late-night",
      mood: "sleepy",
      university: "Stanford University",
      isLive: true,
      isFeatured: false,
      isPrivate: false,
      recentActivity: "Sharing coffee recipes"
    },
    {
      id: 4,
      name: "Brown Breakfast Club",
      description: "Morning motivation and mimosas (virtual)",
      participants: 8,
      maxParticipants: 15,
      category: "social",
      mood: "energetic",
      university: "Brown University",
      isLive: true,
      isFeatured: false,
      isPrivate: false,
      recentActivity: "Planning weekend adventures"
    },
    {
      id: 5,
      name: "Yale Debate Society",
      description: "Intellectual sparring matches",
      participants: 12,
      maxParticipants: 20,
      category: "social",
      mood: "intense",
      university: "Yale University",
      isLive: true,
      isFeatured: false,
      isPrivate: false,
      recentActivity: "Debating pizza toppings (seriously)"
    },
    {
      id: 6,
      name: "Princeton Gaming Lounge",
      description: "Competitive gaming and chill vibes",
      participants: 31,
      maxParticipants: 40,
      category: "gaming",
      mood: "competitive",
      university: "Princeton University",
      isLive: true,
      isFeatured: false,
      isPrivate: false,
      recentActivity: "Among Us tournament starting"
    }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "energetic": return "bg-accent";
      case "chill": return "bg-primary";
      case "focused": return "bg-ivy-600";
      case "sleepy": return "bg-purple-500";
      case "intense": return "bg-red-500";
      case "competitive": return "bg-orange-500";
      default: return "bg-primary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "study": return BookOpen;
      case "social": return Coffee;
      case "gaming": return Gamepad2;
      case "late-night": return Moon;
      default: return Users;
    }
  };

  const filteredRooms = liveRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || room.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="font-display text-mobile-2xl font-bold">Campus Lounge</h1>
            <p className="text-mobile-sm text-muted-foreground">Join themed conversations</p>
          </div>
          <Button className="ivy-gradient organic-button">
            <Plus className="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 organic-button"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 organic-button ${
                    selectedCategory === category.id ? "ivy-gradient text-primary-foreground" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured Rooms */}
        {selectedCategory === "all" && (
          <div className="mb-6">
            <h2 className="font-display text-mobile-lg font-semibold mb-3 flex items-center">
              <Crown className="w-5 h-5 text-accent mr-2" />
              Featured Rooms
            </h2>
            <div className="space-y-3">
              {featuredRooms.map((room) => {
                const CategoryIcon = getCategoryIcon(room.category);
                return (
                  <Card key={room.id} className="organic-card border-accent/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-mobile-base">{room.name}</h3>
                            <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                              Featured
                            </Badge>
                          </div>
                          <p className="text-mobile-sm text-muted-foreground mb-2">{room.description}</p>
                          <p className="text-mobile-xs text-muted-foreground mb-2">
                            📍 {room.university}
                          </p>
                          <div className="flex items-center space-x-3 text-mobile-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{room.participants}/{room.maxParticipants}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getMoodColor(room.mood)} ivy-pulse`} />
                              <span className="capitalize">{room.mood}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CategoryIcon className="w-3 h-3" />
                              <span className="capitalize">{room.category}</span>
                            </div>
                          </div>
                          {room.recentActivity && (
                            <div className="mt-2 p-2 bg-ivy-sage/30 rounded-lg">
                              <p className="text-mobile-xs text-foreground">
                                💬 {room.recentActivity}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex flex-col space-y-2">
                          <Button size="sm" className="ivy-gradient organic-button">
                            <Volume2 className="w-4 h-4 mr-1" />
                            Join
                          </Button>
                          <div className="text-center">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <Avatar key={i} className="w-6 h-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Rooms */}
        <div className="mb-8">
          <h2 className="font-display text-mobile-lg font-semibold mb-3 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full ivy-pulse mr-2" />
            Live Rooms
            <span className="ml-2 text-mobile-sm text-muted-foreground font-normal">
              ({filteredRooms.length})
            </span>
          </h2>
          
          <div className="space-y-3">
            {filteredRooms.map((room) => {
              const CategoryIcon = getCategoryIcon(room.category);
              return (
                <Card key={room.id} className="organic-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-mobile-base">{room.name}</h3>
                          {room.participants >= room.maxParticipants * 0.8 && (
                            <Badge variant="destructive" className="text-xs">
                              Almost Full
                            </Badge>
                          )}
                        </div>
                        <p className="text-mobile-sm text-muted-foreground mb-2">{room.description}</p>
                        <p className="text-mobile-xs text-muted-foreground mb-2">
                          📍 {room.university}
                        </p>
                        <div className="flex items-center space-x-3 text-mobile-xs text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{room.participants}/{room.maxParticipants}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getMoodColor(room.mood)}`} />
                            <span className="capitalize">{room.mood}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CategoryIcon className="w-3 h-3" />
                            <span className="capitalize">{room.category}</span>
                          </div>
                        </div>
                        {room.recentActivity && (
                          <div className="p-2 bg-muted/50 rounded-lg">
                            <p className="text-mobile-xs text-foreground">
                              💬 {room.recentActivity}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-2">
                        <Button 
                          size="sm" 
                          disabled={room.participants >= room.maxParticipants}
                          className="ivy-gradient organic-button"
                        >
                          {room.participants >= room.maxParticipants ? "Full" : "Join"}
                        </Button>
                        <div className="flex -space-x-1">
                          {[1, 2, 3].map((i) => (
                            <Avatar key={i} className="w-5 h-5 border border-background">
                              <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                            </Avatar>
                          ))}
                          {room.participants > 3 && (
                            <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">+{room.participants - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredRooms.length === 0 && (
            <Card className="organic-card">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-mobile-base mb-2">No rooms found</h3>
                <p className="text-mobile-sm text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button className="ivy-gradient organic-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Room
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusLounge;