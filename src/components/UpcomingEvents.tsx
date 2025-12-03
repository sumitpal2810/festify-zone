import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "TechCon 2024",
    category: "IT & Tech",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    location: "Tech Convention Center",
    attendees: 1200,
    price: 149,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
    featured: true,
  },
  {
    id: 2,
    title: "Wedding Expo Spring",
    category: "Wedding",
    date: "Jan 20, 2025",
    time: "10:00 AM",
    location: "Grand Ballroom",
    attendees: 450,
    price: 25,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
    featured: false,
  },
  {
    id: 3,
    title: "Summer Music Festival",
    category: "Music",
    date: "Feb 5, 2025",
    time: "4:00 PM",
    location: "Open Air Stadium",
    attendees: 5000,
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
    featured: true,
  },
  {
    id: 4,
    title: "Business Leaders Summit",
    category: "Corporate",
    date: "Feb 12, 2025",
    time: "8:30 AM",
    location: "Executive Towers",
    attendees: 300,
    price: 299,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600",
    featured: false,
  },
  {
    id: 5,
    title: "AI & Machine Learning Conf",
    category: "IT & Tech",
    date: "Feb 28, 2025",
    time: "9:00 AM",
    location: "Innovation Hub",
    attendees: 800,
    price: 199,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    featured: false,
  },
  {
    id: 6,
    title: "Jazz Night Live",
    category: "Music",
    date: "Mar 8, 2025",
    time: "7:00 PM",
    location: "Jazz Lounge",
    attendees: 200,
    price: 45,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "IT & Tech": "bg-blue-100 text-blue-700",
  Wedding: "bg-pink-100 text-pink-700",
  Music: "bg-purple-100 text-purple-700",
  Corporate: "bg-emerald-100 text-emerald-700",
};

const UpcomingEvents = () => {
  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Don't miss out on these exciting upcoming events. Book your tickets now!
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                {event.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                <Badge
                  className={`absolute top-4 right-4 ${categoryColors[event.category]}`}
                  variant="secondary"
                >
                  {event.category}
                </Badge>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.attendees.toLocaleString()} attending</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground">From</span>
                    <div className="text-xl font-bold text-foreground">
                      ${event.price}
                    </div>
                  </div>
                  <Button size="sm">Get Tickets</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
