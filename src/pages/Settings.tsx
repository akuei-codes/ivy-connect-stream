import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  User, 
  Bell, 
  Eye, 
  Volume2, 
  Timer, 
  UserX, 
  Flag, 
  HelpCircle,
  LogOut,
  ArrowLeft,
  Settings2,
  Moon,
  Sun,
  Smartphone,
  AlertTriangle,
  Heart,
  MessageCircle,
  Lock
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      newMatches: true,
      messages: true,
      roomInvites: false,
      weeklyDigest: true
    },
    privacy: {
      showOnlineStatus: true,
      allowAnonymousMode: true,
      saveConversationClips: false,
      shareWithFriends: true
    },
    matching: {
      preferSameUniversity: false,
      preferSameMajor: false,
      ageRange: [18, 25],
      maxCallDuration: 10
    },
    safety: {
      autoReportInappropriate: true,
      requireMutualInterest: true,
      cooldownBetweenCalls: 5
    }
  });

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof any]
      }
    }));
    toast.success("Settings updated");
  };

  const handleSliderChange = (category: string, setting: string, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: category === "matching" && setting === "ageRange" ? value : value[0]
      }
    }));
  };

  const blockedUsers = [
    { id: 1, name: "Anonymous User", university: "Unknown", reason: "Inappropriate behavior", date: "2 days ago" },
    { id: 2, name: "John Smith", university: "Yale", reason: "Spam", date: "1 week ago" }
  ];

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Link to="/home">
            <Button variant="ghost" size="sm" className="organic-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="font-display text-mobile-lg font-bold">Settings & Safety</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Profile Section */}
        <Card className="organic-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarFallback className="text-lg font-bold ivy-gradient bg-clip-text text-transparent">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-display text-mobile-lg font-bold">John Doe</h2>
                <p className="text-mobile-sm text-muted-foreground">Harvard University • Junior</p>
                <Badge variant="secondary" className="mt-1">Verified Student</Badge>
              </div>
            </div>
            <Link to="/profile-edit">
              <Button variant="outline" className="w-full organic-button">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="organic-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-mobile-lg">
              <Bell className="w-5 h-5 mr-2 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Control what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Matches</p>
                <p className="text-mobile-sm text-muted-foreground">Get notified when someone wants to connect</p>
              </div>
              <Switch
                checked={settings.notifications.newMatches}
                onCheckedChange={() => handleToggle("notifications", "newMatches")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Messages</p>
                <p className="text-mobile-sm text-muted-foreground">Chat notifications from connections</p>
              </div>
              <Switch
                checked={settings.notifications.messages}
                onCheckedChange={() => handleToggle("notifications", "messages")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Room Invites</p>
                <p className="text-mobile-sm text-muted-foreground">When friends invite you to themed rooms</p>
              </div>
              <Switch
                checked={settings.notifications.roomInvites}
                onCheckedChange={() => handleToggle("notifications", "roomInvites")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Digest</p>
                <p className="text-mobile-sm text-muted-foreground">Summary of your week on UniVerse</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyDigest}
                onCheckedChange={() => handleToggle("notifications", "weeklyDigest")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="organic-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-mobile-lg">
              <Eye className="w-5 h-5 mr-2 text-primary" />
              Privacy
            </CardTitle>
            <CardDescription>Manage your privacy preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Online Status</p>
                <p className="text-mobile-sm text-muted-foreground">Let others see when you're active</p>
              </div>
              <Switch
                checked={settings.privacy.showOnlineStatus}
                onCheckedChange={() => handleToggle("privacy", "showOnlineStatus")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Anonymous Ivy Mode</p>
                <p className="text-mobile-sm text-muted-foreground">Join conversations with hidden identity</p>
              </div>
              <Switch
                checked={settings.privacy.allowAnonymousMode}
                onCheckedChange={() => handleToggle("privacy", "allowAnonymousMode")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Save Conversation Clips</p>
                <p className="text-mobile-sm text-muted-foreground">Allow saving 15s highlights (with consent)</p>
              </div>
              <Switch
                checked={settings.privacy.saveConversationClips}
                onCheckedChange={() => handleToggle("privacy", "saveConversationClips")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Matching Preferences */}
        <Card className="organic-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-mobile-lg">
              <Heart className="w-5 h-5 mr-2 text-primary" />
              Matching Preferences
            </CardTitle>
            <CardDescription>Customize how we find your matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Prefer Same University</p>
                <p className="text-mobile-sm text-muted-foreground">Prioritize students from Harvard</p>
              </div>
              <Switch
                checked={settings.matching.preferSameUniversity}
                onCheckedChange={() => handleToggle("matching", "preferSameUniversity")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Prefer Same Major</p>
                <p className="text-mobile-sm text-muted-foreground">Match with Economics students</p>
              </div>
              <Switch
                checked={settings.matching.preferSameMajor}
                onCheckedChange={() => handleToggle("matching", "preferSameMajor")}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Age Range</p>
                <span className="text-mobile-sm text-muted-foreground">
                  {settings.matching.ageRange[0]} - {settings.matching.ageRange[1]} years
                </span>
              </div>
              <Slider
                value={settings.matching.ageRange}
                onValueChange={(value) => handleSliderChange("matching", "ageRange", value)}
                max={30}
                min={17}
                step={1}
                className="w-full"
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Max Call Duration</p>
                <span className="text-mobile-sm text-muted-foreground">
                  {settings.matching.maxCallDuration} minutes
                </span>
              </div>
              <Slider
                value={[settings.matching.maxCallDuration]}
                onValueChange={(value) => handleSliderChange("matching", "maxCallDuration", value)}
                max={30}
                min={3}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Safety Center */}
        <Card className="organic-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-mobile-lg">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Safety Center
            </CardTitle>
            <CardDescription>Tools to keep you safe on UniVerse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Report Inappropriate Content</p>
                <p className="text-mobile-sm text-muted-foreground">AI detects and reports violations</p>
              </div>
              <Switch
                checked={settings.safety.autoReportInappropriate}
                onCheckedChange={() => handleToggle("safety", "autoReportInappropriate")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require Mutual Interest</p>
                <p className="text-mobile-sm text-muted-foreground">Only match when both users like each other</p>
              </div>
              <Switch
                checked={settings.safety.requireMutualInterest}
                onCheckedChange={() => handleToggle("safety", "requireMutualInterest")}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Cooldown Between Calls</p>
                <span className="text-mobile-sm text-muted-foreground">
                  {settings.safety.cooldownBetweenCalls} minutes
                </span>
              </div>
              <Slider
                value={[settings.safety.cooldownBetweenCalls]}
                onValueChange={(value) => handleSliderChange("safety", "cooldownBetweenCalls", value)}
                max={30}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Blocked Users */}
        {blockedUsers.length > 0 && (
          <Card className="organic-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-mobile-lg">
                <UserX className="w-5 h-5 mr-2 text-destructive" />
                Blocked Users
              </CardTitle>
              <CardDescription>Manage users you've blocked</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {blockedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-mobile-sm">{user.name}</p>
                    <p className="text-mobile-xs text-muted-foreground">{user.university}</p>
                    <p className="text-mobile-xs text-destructive">Blocked for: {user.reason}</p>
                    <p className="text-mobile-xs text-muted-foreground">{user.date}</p>
                  </div>
                  <Button variant="outline" size="sm" className="organic-button">
                    Unblock
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="outline" className="h-16 organic-button">
            <div className="text-center">
              <Flag className="w-5 h-5 mx-auto mb-1 text-destructive" />
              <span className="text-mobile-sm">Report Issue</span>
            </div>
          </Button>
          <Button variant="outline" className="h-16 organic-button">
            <div className="text-center">
              <HelpCircle className="w-5 h-5 mx-auto mb-1 text-primary" />
              <span className="text-mobile-sm">Help Center</span>
            </div>
          </Button>
        </div>

        {/* Emergency Features */}
        <Card className="organic-card mb-6 border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center text-mobile-lg text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="destructive" className="w-full organic-button">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Panic Exit (Immediately End & Report)
            </Button>
            <p className="text-mobile-xs text-muted-foreground text-center">
              Triple-tap your screen during any call to instantly exit and report
            </p>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="organic-card mb-8">
          <CardContent className="p-4 space-y-3">
            <Button variant="ghost" className="w-full organic-button justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="ghost" className="w-full organic-button justify-start">
              <Smartphone className="w-4 h-4 mr-2" />
              Connected Devices
            </Button>
            <Button variant="ghost" className="w-full organic-button justify-start text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;