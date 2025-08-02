import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Camera, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Verification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verificationMethod, setVerificationMethod] = useState("");
  const [studentId, setStudentId] = useState("");
  const [university, setUniversity] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const universities = [
    "Harvard University", "Stanford University", "MIT", "Yale University",
    "Princeton University", "Columbia University", "University of Chicago",
    "University of Pennsylvania", "Brown University", "Cornell University"
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    toast.success("Document uploaded successfully!");
    setStep(3);
  };

  const handleVerificationSubmit = async () => {
    if (!university || !studentId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsUploading(false);
    
    toast.success("Verification submitted! You'll hear back within 24 hours.");
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen bg-surface mobile-safe-area">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="organic-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
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

        {/* Step 1: Choose Method */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="font-display text-mobile-2xl font-bold mb-2">
                Manual Verification
              </h1>
              <p className="text-mobile-sm text-muted-foreground">
                Choose how you'd like to verify your student status
              </p>
            </div>

            <div className="space-y-4">
              <Card 
                className={`organic-card cursor-pointer ivy-transition ${
                  verificationMethod === "student-id" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setVerificationMethod("student-id")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Camera className="w-6 h-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-mobile-base mb-1">
                        Student ID Photo
                      </h3>
                      <p className="text-mobile-sm text-muted-foreground mb-2">
                        Upload a photo of your student ID card
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Fastest verification
                      </Badge>
                    </div>
                    {verificationMethod === "student-id" && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`organic-card cursor-pointer ivy-transition ${
                  verificationMethod === "enrollment" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setVerificationMethod("enrollment")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Upload className="w-6 h-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-mobile-base mb-1">
                        Enrollment Document
                      </h3>
                      <p className="text-mobile-sm text-muted-foreground mb-2">
                        Upload your enrollment verification, transcript, or schedule
                      </p>
                      <Badge variant="outline" className="text-xs">
                        1-2 business days
                      </Badge>
                    </div>
                    {verificationMethod === "enrollment" && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={() => setStep(2)}
              disabled={!verificationMethod}
              className="w-full h-12 ivy-gradient organic-button font-semibold"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Upload & Info */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h1 className="font-display text-mobile-2xl font-bold mb-2">
                Upload Document
              </h1>
              <p className="text-mobile-sm text-muted-foreground">
                {verificationMethod === "student-id" 
                  ? "Take a clear photo of your student ID"
                  : "Upload your enrollment verification document"
                }
              </p>
            </div>

            <Card className="organic-card">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">University</label>
                  <Select value={university} onValueChange={setUniversity}>
                    <SelectTrigger className="h-12 organic-button">
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">Student ID Number</label>
                  <Input
                    placeholder="Enter your student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="h-12 organic-button"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-mobile-sm font-medium">
                    {verificationMethod === "student-id" ? "Student ID Photo" : "Document"}
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center ivy-transition hover:border-primary">
                    <input
                      type="file"
                      id="document"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="document" 
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      {isUploading ? (
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      )}
                      <span className="text-mobile-sm font-medium">
                        {isUploading ? "Uploading..." : "Tap to upload"}
                      </span>
                      <span className="text-mobile-xs text-muted-foreground">
                        PNG, JPG or PDF (Max 5MB)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-accent mt-0.5" />
                    <div className="text-mobile-xs text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Keep your info safe:</p>
                      <p>Your documents are encrypted and only used for verification. We'll delete them after approval.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="font-display text-mobile-2xl font-bold mb-2">
                Ready to Submit
              </h1>
              <p className="text-mobile-sm text-muted-foreground">
                Review your information before submitting
              </p>
            </div>

            <Card className="organic-card">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-mobile-sm text-muted-foreground">University:</span>
                    <span className="text-mobile-sm font-medium">{university}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mobile-sm text-muted-foreground">Student ID:</span>
                    <span className="text-mobile-sm font-medium">***{studentId.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mobile-sm text-muted-foreground">Method:</span>
                    <Badge variant="secondary">
                      {verificationMethod === "student-id" ? "Student ID Photo" : "Enrollment Document"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mobile-sm text-muted-foreground">Document:</span>
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                onClick={handleVerificationSubmit}
                disabled={isUploading}
                className="w-full h-12 ivy-gradient organic-button font-semibold"
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit for Review"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="w-full h-12 organic-button"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;