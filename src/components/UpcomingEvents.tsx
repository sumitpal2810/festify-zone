import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Play, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const activeEvents = [
  {
    id: 1,
    title: "AI Summit 2024 - Live Now",
    date: "Live",
    time: "Started 2 hours ago",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
    attendees: 2847,
    price: "Free",
    category: "IT",
    isLive: true,
    viewers: 12500,
  },
  {
    id: 2,
    title: "Global Music Awards Live",
    date: "Live",
    time: "Started 45 mins ago",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    attendees: 5200,
    price: "$29",
    category: "Music",
    isLive: true,
    viewers: 45000,
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "Live",
    time: "Started 1 hour ago",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80",
    attendees: 890,
    price: "Free",
    category: "Corporate",
    isLive: true,
    viewers: 3200,
  },
];

const upcomingEvents = [
  {
    id: 4,
    title: "Tech Conference 2024",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    attendees: 1250,
    price: "$299",
    category: "IT",
  },
  {
    id: 5,
    title: "Summer Music Festival",
    date: "Dec 20, 2024",
    time: "4:00 PM",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
    attendees: 5000,
    price: "$150",
    category: "Music",
  },
  {
    id: 6,
    title: "Wedding Expo 2024",
    date: "Dec 22, 2024",
    time: "10:00 AM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    attendees: 800,
    price: "$50",
    category: "Wedding",
  },
  {
    id: 7,
    title: "Business Summit",
    date: "Jan 5, 2025",
    time: "8:00 AM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
    attendees: 2000,
    price: "$499",
    category: "Corporate",
  },
  {
    id: 8,
    title: "Jazz Night Live",
    date: "Jan 10, 2025",
    time: "7:00 PM",
    location: "New Orleans, LA",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80",
    attendees: 450,
    price: "$75",
    category: "Music",
  },
  {
    id: 9,
    title: "Developer Workshop",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
    attendees: 300,
    price: "$199",
    category: "IT",
  },
];

interface EventCardProps {
  event: typeof activeEvents[0] | typeof upcomingEvents[0];
  isActive?: boolean;
  onWatch?: () => void;
}

const EventCard = ({ event, isActive = false, onWatch }: EventCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      
      {isActive && 'isLive' in event && event.isLive && (
        <>
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-destructive rounded-full">
            <Wifi className="h-3 w-3 text-destructive-foreground animate-pulse" />
            <span className="text-xs font-semibold text-destructive-foreground">LIVE</span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full">
            <Users className="h-3 w-3 text-foreground" />
            <span className="text-xs font-medium text-foreground">
              {('viewers' in event ? event.viewers : 0).toLocaleString()} watching
            </span>
          </div>
        </>
      )}
      
      {!isActive && (
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {event.category}
          </span>
        </div>
      )}
      
      <div className="absolute bottom-3 right-3">
        <span className="px-3 py-1.5 bg-accent text-accent-foreground text-sm font-bold rounded-lg">
          {event.price}
        </span>
      </div>
    </div>

    <div className="p-5">
      <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          {isActive ? (
            <Wifi className="h-4 w-4 text-destructive" />
          ) : (
            <Calendar className="h-4 w-4" />
          )}
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-muted border-2 border-card"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            +{event.attendees.toLocaleString()}
          </span>
        </div>
        <Button 
          size="sm" 
          variant={isActive ? "default" : "outline"} 
          className={isActive ? "gap-2" : ""}
          onClick={isActive ? onWatch : undefined}
        >
          {isActive ? (
            <>
              <Play className="h-4 w-4" />
              Watch Now
            </>
          ) : (
            "Book Now"
          )}
        </Button>
      </div>
    </div>
  </motion.div>
);

const UpcomingEvents = () => {
  const navigate = useNavigate();

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discover Events
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch live events or book tickets for upcoming experiences
          </p>
        </motion.div>

        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="active" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wifi className="h-4 w-4" />
                Live Now
                <span className="ml-1 px-1.5 py-0.5 bg-destructive text-destructive-foreground text-xs rounded-full">
                  {activeEvents.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="h-4 w-4" />
                Upcoming
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isActive={true}
                  onWatch={() => navigate("/stream")}
                />
              ))}
            </div>
            {activeEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No live events at the moment</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} isActive={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg">
            View All Events
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
