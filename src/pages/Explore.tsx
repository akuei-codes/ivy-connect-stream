import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Play, 
  Heart, 
  MessageCircle, 
  Share, 
  Crown,
  TrendingUp,
  Clock,
  Eye,
  Filter,
  Flame
} from "lucide-react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");

  const trendingContent = [
    {
      id: 1,
      type: "highlight",
      title: "Stanford Startup Pitch Battle",
      description: "Epic entrepreneurship discussion",
      thumbnail: "🚀",
      creator: {
        name: "Alex Chen",
        university: "Stanford",
        avatar: "AC"
      },
      stats: {
        views: 1247,
        likes: 89,
        duration: "2:34"
      },
      tags: ["Startups", "Business", "Innovation"],
      timeAgo: "2h ago"
    },
    {
      id: 2,
      type: "moment",
      title: "Harvard Law Student Life Hack",
      description: "Study techniques that actually work",
      thumbnail: "📚",
      creator: {
        name: "Sarah Kim",
        university: "Harvard",
        avatar: "SK"
      },
      stats: {
        views: 892,
        likes: 156,
        duration: "1:45"
      },
      tags: ["Study Tips", "Law School", "Productivity"],
      timeAgo: "4h ago"
    },
    {
      id: 3,
      type: "confession",
      title: "MIT Student's Coding Journey",
      description: "From zero to tech internship",
      thumbnail: "💻",
      creator: {
        name: "Jamie Rodriguez",
        university: "MIT",
        avatar: "JR"
      },
      stats: {
        views: 2156,
        likes: 234,
        duration: "3:12"
      },
      tags: ["Coding", "Career", "Computer Science"],
      timeAgo: "6h ago"
    }
  ];

  const topStudents = [
    {
      id: 1,
      name: "Emma Watson",
      university: "Brown University",
      major: "Literature",
      stats: {
        connections: 234,
        rating: 4.9,
        streak: 15
      },
      badges: ["Top Conversationalist", "Ivy Legend"],
      recentTopic: "Discussed climate policy"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      university: "Yale University",
      major: "Political Science",
      stats: {
        connections: 189,
        rating: 4.8,
        streak: 12
      },
      badges: ["Debate Master", "Rising Star"],
      recentTopic: "Philosophy deep dive"
    },
    {
      id: 3,
      name: "Priya Patel",
      university: "Princeton University",
      major: "Neuroscience",
      stats: {
        connections: 167,
        rating: 4.9,
        streak: 18
      },
      badges: ["Science Communicator", "Friendly Face"],
      recentTopic: "Research breakthroughs"
    }
  ];

  const campusHighlights = [
    {
      id: 1,
      university: "Harvard University",
      title: "Midnight Study Session Vibes",
      description: "Widener Library after hours energy",
      image: "🏛️",
      engagement: 145,
      timeAgo: "1h ago"
    },
    {
      id: 2,
      university: "Stanford University",
      title: "Campus Food Truck Revolution",
      description: "Engineering students created the best kimchi tacos",
      image: "🌮",
      engagement: 98,
      timeAgo: "3h ago"
    },
    {
      id: 3,
      university: "MIT",
      title: "Hack Night Success Story",
      description: "24-hour coding marathon produced an amazing AI tool",
      image: "🤖",
      engagement: 267,
      timeAgo: "5h ago"
    }
  ];

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="font-display text-mobile-2xl font-bold">Explore</h1>
            <p className="text-mobile-sm text-muted-foreground">Discover campus highlights</p>
          </div>
          <Button variant="ghost" size="sm" className="organic-button">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search highlights, students, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 organic-button"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 organic-button">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="students">Top Students</TabsTrigger>
            <TabsTrigger value="campus">Campus</TabsTrigger>
          </TabsList>

          {/* Trending Content */}
          <TabsContent value="trending" className="space-y-4 mt-6">
            {trendingContent.map((content) => (
              <Card key={content.id} className="organic-card">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {content.thumbnail}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-mobile-base line-clamp-1">
                            {content.title}
                          </h3>
                          <p className="text-mobile-sm text-muted-foreground line-clamp-1">
                            {content.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2 p-2">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Creator Info */}
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{content.creator.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-mobile-xs text-muted-foreground">
                          {content.creator.name} • {content.creator.university}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {content.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-mobile-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{content.stats.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{content.stats.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{content.stats.duration}</span>
                          </div>
                        </div>
                        <span className="text-mobile-xs text-muted-foreground">
                          {content.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-4 pt-4 border-t border-border">
                    <Button variant="ghost" size="sm" className="organic-button">
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="organic-button">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="organic-button">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Top Students */}
          <TabsContent value="students" className="space-y-4 mt-6">
            {topStudents.map((student, index) => (
              <Card key={student.id} className="organic-card">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarFallback className="text-lg font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-accent-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-mobile-base">{student.name}</h3>
                          <p className="text-mobile-sm text-muted-foreground">
                            {student.major} • {student.university}
                          </p>
                        </div>
                        <Badge className="ivy-gradient text-primary-foreground">
                          #{index + 1}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                        <div>
                          <div className="text-mobile-base font-bold text-primary">
                            {student.stats.connections}
                          </div>
                          <div className="text-mobile-xs text-muted-foreground">Connections</div>
                        </div>
                        <div>
                          <div className="text-mobile-base font-bold text-accent">
                            {student.stats.rating}⭐
                          </div>
                          <div className="text-mobile-xs text-muted-foreground">Rating</div>
                        </div>
                        <div>
                          <div className="text-mobile-base font-bold text-ivy-600">
                            {student.stats.streak}🔥
                          </div>
                          <div className="text-mobile-xs text-muted-foreground">Day Streak</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {student.badges.map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-mobile-xs text-muted-foreground">
                        💬 {student.recentTopic}
                      </p>

                      <Button size="sm" className="mt-3 ivy-gradient organic-button">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Campus Highlights */}
          <TabsContent value="campus" className="space-y-4 mt-6">
            {campusHighlights.map((highlight) => (
              <Card key={highlight.id} className="organic-card">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-ivy-sage/30 to-primary/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {highlight.image}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-mobile-base">
                            {highlight.title}
                          </h3>
                          <p className="text-mobile-sm text-muted-foreground">
                            {highlight.description}
                          </p>
                        </div>
                        <span className="text-mobile-xs text-muted-foreground">
                          {highlight.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          📍 {highlight.university}
                        </Badge>
                        <div className="flex items-center space-x-1 text-mobile-xs text-muted-foreground">
                          <Flame className="w-3 h-3 text-accent" />
                          <span>{highlight.engagement} reactions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;