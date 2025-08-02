import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Camera, 
  Sparkles, 
  GraduationCap, 
  Heart, 
  Users, 
  BookOpen,
  MapPin,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    year: "",
    major: "",
    bio: "",
    interests: [] as string[],
    clubs: [] as string[],
    location: "",
    profilePhoto: ""
  });

  const years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student", "PhD Student"];
  
  const majors = [
    "Computer Science", "Business", "Psychology", "Biology", "Economics",
    "Political Science", "Engineering", "English", "Mathematics", "Art",
    "History", "Chemistry", "Physics", "Pre-Med", "Pre-Law"
  ];

  const interestOptions = [
    "Technology", "Startups", "Sports", "Music", "Art", "Travel", 
    "Photography", "Gaming", "Reading", "Fitness", "Cooking", "Fashion",
    "Environment", "Social Justice", "Research", "Volunteering"
  ];

  const clubOptions = [
    "Student Government", "Greek Life", "Debate Team", "Drama Club",
    "Athletics", "Honor Society", "Volunteer Club", "Study Groups",
    "Cultural Organizations", "Professional Societies", "Research Groups"
  ];

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleClubToggle = (club: string) => {
    setProfileData(prev => ({
      ...prev,
      clubs: prev.clubs.includes(club)
        ? prev.clubs.filter(c => c !== club)
        : [...prev.clubs, club]
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!profileData.firstName || !profileData.lastName || !profileData.year || !profileData.major) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (profileData.interests.length < 3) {
      toast.error("Please select at least 3 interests");
      return;
    }

    // Simulate profile creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Welcome to UniVerse! 🎉");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-primary animate-bounce-subtle" />
            <h1 className="font-display text-mobile-lg font-bold">Create Your Student Card</h1>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ivy-transition ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="organic-card">
              <CardHeader className="text-center">
                <User className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-mobile-xl">Basic Information</CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-mobile-sm font-medium">First Name</label>
                    <Input
                      placeholder="First name"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="h-12 organic-button"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-mobile-sm font-medium">Last Name</label>
                    <Input
                      placeholder="Last name"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="h-12 organic-button"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">Academic Year</label>
                  <Select value={profileData.year} onValueChange={(value) => setProfileData(prev => ({ ...prev, year: value }))}>
                    <SelectTrigger className="h-12 organic-button">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{year}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">Major</label>
                  <Select value={profileData.major} onValueChange={(value) => setProfileData(prev => ({ ...prev, major: value }))}>
                    <SelectTrigger className="h-12 organic-button">
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((major) => (
                        <SelectItem key={major} value={major}>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>{major}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">Location (Optional)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Campus location or dorm"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="h-12 pl-10 organic-button"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setStep(2)}
              disabled={!profileData.firstName || !profileData.lastName || !profileData.year || !profileData.major}
              className="w-full h-12 ivy-gradient organic-button font-semibold"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Interests & Bio */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="organic-card">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-mobile-xl">Interests & Bio</CardTitle>
                <CardDescription>Help others discover what you're passionate about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-mobile-sm font-medium">
                    Interests <span className="text-mobile-xs text-muted-foreground">(Select at least 3)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <Badge
                        key={interest}
                        variant={profileData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer ivy-transition ${
                          profileData.interests.includes(interest) 
                            ? "ivy-gradient text-primary-foreground" 
                            : "hover:border-primary"
                        }`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-mobile-xs text-muted-foreground">
                    Selected: {profileData.interests.length}/16
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-mobile-sm font-medium">
                    Clubs & Activities <span className="text-mobile-xs text-muted-foreground">(Optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {clubOptions.map((club) => (
                      <Badge
                        key={club}
                        variant={profileData.clubs.includes(club) ? "default" : "outline"}
                        className={`cursor-pointer ivy-transition ${
                          profileData.clubs.includes(club) 
                            ? "bg-accent text-accent-foreground" 
                            : "hover:border-accent"
                        }`}
                        onClick={() => handleClubToggle(club)}
                      >
                        <Users className="w-3 h-3 mr-1" />
                        {club}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">Bio</label>
                  <Textarea
                    placeholder="Tell others about yourself... What makes you unique? What are you looking for in conversations?"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[100px] organic-button resize-none"
                    maxLength={200}
                  />
                  <p className="text-mobile-xs text-muted-foreground text-right">
                    {profileData.bio.length}/200
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="h-12 organic-button"
              >
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={profileData.interests.length < 3}
                className="h-12 ivy-gradient organic-button font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Profile Photo */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="organic-card">
              <CardHeader className="text-center">
                <Camera className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-mobile-xl">Profile Photo</CardTitle>
                <CardDescription>Add a photo so others can recognize you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    <AvatarImage src={profileData.profilePhoto} />
                    <AvatarFallback className="text-2xl font-bold ivy-gradient bg-clip-text text-transparent">
                      {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center space-y-2">
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label htmlFor="photo">
                      <Button variant="outline" className="organic-button" asChild>
                        <span>
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Photo
                        </span>
                      </Button>
                    </label>
                    <p className="text-mobile-xs text-muted-foreground">
                      Or skip for now - you can add one later
                    </p>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="bg-ivy-sage/30 rounded-lg p-4">
                  <h4 className="font-semibold text-mobile-sm mb-3 text-center">Preview Your Student Card</h4>
                  <div className="bg-card rounded-lg p-4 ivy-shadow-soft">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={profileData.profilePhoto} />
                        <AvatarFallback className="text-sm font-bold">
                          {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-mobile-sm">
                          {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="text-mobile-xs text-muted-foreground">
                          {profileData.year} • {profileData.major}
                        </p>
                        {profileData.location && (
                          <p className="text-mobile-xs text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {profileData.location}
                          </p>
                        )}
                        {profileData.bio && (
                          <p className="text-mobile-xs mt-2 line-clamp-2">{profileData.bio}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {profileData.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {profileData.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{profileData.interests.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                onClick={() => setStep(2)}
                className="h-12 organic-button"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="h-12 ivy-gradient organic-button font-semibold"
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Join UniVerse</span>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;