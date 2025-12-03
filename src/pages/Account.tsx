import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  Ticket,
  Edit2,
  Check,
  X,
  ArrowLeft,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinedDate: "January 2024",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
};

const mockSubscription = {
  plan: "Pro",
  price: 19,
  startDate: "Nov 15, 2024",
  nextBilling: "Dec 15, 2024",
  status: "Active",
  features: [
    "Priority ticket access",
    "10% discount on all tickets",
    "Early bird notifications",
    "Event calendar sync",
    "Priority support",
  ],
};

const mockTickets = [
  {
    id: "TKT-001",
    event: "TechCon 2024",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    location: "Tech Convention Center",
    ticketType: "VIP Pass",
    price: 299,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300",
  },
  {
    id: "TKT-002",
    event: "Summer Music Festival",
    date: "Feb 5, 2025",
    time: "4:00 PM",
    location: "Open Air Stadium",
    ticketType: "General Admission",
    price: 89,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300",
  },
  {
    id: "TKT-003",
    event: "AI & ML Conference",
    date: "Oct 20, 2024",
    time: "9:00 AM",
    location: "Innovation Hub",
    ticketType: "Standard",
    price: 149,
    status: "Attended",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300",
  },
];

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setUserData(mockUser);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const statusColors: Record<string, string> = {
    Upcoming: "bg-accent text-accent-foreground",
    Attended: "bg-muted text-muted-foreground",
    Cancelled: "bg-destructive text-destructive-foreground",
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar isLoggedIn onLogout={() => {}} />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to events
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-8">
              My Account
            </h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4">
                        <img
                          src={userData.avatar}
                          alt={userData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>

                    {/* Form */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                          Personal Information
                        </h2>
                        {!isEditing ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancel}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                              <Check className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative mt-1.5">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="name"
                              name="name"
                              value={userData.name}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <div className="relative mt-1.5">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={userData.email}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <div className="relative mt-1.5">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="phone"
                              name="phone"
                              value={userData.phone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <div className="relative mt-1.5">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="location"
                              name="location"
                              value={userData.location}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          Member since {userData.joinedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Current Plan */}
                  <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center">
                            <Crown className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-foreground">
                              {mockSubscription.plan} Plan
                            </h2>
                            <Badge
                              variant="secondary"
                              className="bg-accent/10 text-accent"
                            >
                              {mockSubscription.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-foreground">
                          ${mockSubscription.price}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Start Date
                        </p>
                        <p className="font-medium text-foreground">
                          {mockSubscription.startDate}
                        </p>
                      </div>
                      <div className="bg-muted rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Next Billing
                        </p>
                        <p className="font-medium text-foreground">
                          {mockSubscription.nextBilling}
                        </p>
                      </div>
                    </div>

                    <h3 className="font-medium text-foreground mb-3">
                      Included Features
                    </h3>
                    <ul className="space-y-2">
                      {mockSubscription.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-accent" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="ghost" className="text-destructive">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>

                  {/* Upgrade Card */}
                  <div className="bg-dark-gradient rounded-2xl p-6 text-secondary-foreground">
                    <h3 className="text-lg font-semibold mb-2">
                      Upgrade to Business
                    </h3>
                    <p className="text-secondary-foreground/70 text-sm mb-4">
                      Get 20% off all tickets and manage your team with up to 10
                      members.
                    </p>
                    <Button variant="secondary" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets">
                <div className="space-y-4">
                  {mockTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-2xl border border-border overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-40 md:h-auto relative">
                          <img
                            src={ticket.image}
                            alt={ticket.event}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-5 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="secondary"
                                  className={statusColors[ticket.status]}
                                >
                                  {ticket.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {ticket.id}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {ticket.event}
                              </h3>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {ticket.date} • {ticket.time}
                                </p>
                                <p className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {ticket.location}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Ticket className="h-4 w-4" />
                                  {ticket.ticketType}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
                              <div className="text-right">
                                <span className="text-2xl font-bold text-foreground">
                                  ${ticket.price}
                                </span>
                              </div>
                              {ticket.status === "Upcoming" && (
                                <Button size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Account;
