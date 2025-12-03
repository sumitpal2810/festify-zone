import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Heart, Music, Building2, X, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "it",
    name: "IT & Tech",
    icon: Monitor,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    description: "Tech conferences, hackathons, and developer meetups",
    events: 156,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    details: {
      title: "Technology & Innovation Events",
      description: "Explore cutting-edge tech conferences, startup showcases, coding bootcamps, and developer meetups. Stay ahead with the latest in AI, blockchain, cloud computing, and more.",
      upcomingCount: 45,
      avgAttendees: 500,
      popularVenues: ["Tech Convention Center", "Innovation Hub", "Digital Campus"],
    },
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: Heart,
    color: "bg-pink-500",
    lightColor: "bg-pink-100",
    description: "Wedding expos, bridal shows, and ceremony planning",
    events: 89,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    details: {
      title: "Wedding & Celebration Events",
      description: "Discover bridal expos, wedding showcases, venue tours, and planning workshops. Connect with top vendors, florists, photographers, and wedding planners.",
      upcomingCount: 28,
      avgAttendees: 300,
      popularVenues: ["Grand Ballroom", "Garden Estate", "Seaside Resort"],
    },
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    description: "Concerts, festivals, and live performances",
    events: 234,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    details: {
      title: "Music & Entertainment Events",
      description: "Experience live concerts, music festivals, DJ nights, and acoustic sessions. From rock to classical, indie to electronic - find your perfect sound.",
      upcomingCount: 78,
      avgAttendees: 1500,
      popularVenues: ["City Arena", "Open Air Stadium", "Jazz Lounge"],
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    icon: Building2,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100",
    description: "Business conferences, networking, and seminars",
    events: 178,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    details: {
      title: "Corporate & Business Events",
      description: "Attend industry conferences, executive summits, networking events, and professional development workshops. Elevate your career and expand your network.",
      upcomingCount: 52,
      avgAttendees: 400,
      popularVenues: ["Business Center", "Executive Towers", "Conference Hall"],
    },
  },
];

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selected = categories.find((c) => c.id === selectedCategory);

  return (
    <section id="categories" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore events across different categories and find the perfect experience for you
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 ${
                selectedCategory === category.id
                  ? "ring-2 ring-primary shadow-glow"
                  : "hover:shadow-lg"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/60 to-secondary/30" />
              
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 ${category.lightColor} rounded-xl flex items-center justify-center mb-4`}
                >
                  <category.icon className={`h-6 w-6 ${category.color.replace("bg-", "text-")}`} />
                </div>
                <h3 className="text-lg font-semibold text-secondary-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-secondary-foreground/70 mb-3 line-clamp-2">
                  {category.description}
                </p>
                <span className="text-xs font-medium text-primary">
                  {category.events} events →
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Expandable Details Box */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 ${selected.lightColor} ${selected.color.replace(
                            "bg-",
                            "text-"
                          )} rounded-full text-sm font-medium mb-2`}
                        >
                          {selected.name}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground">
                          {selected.details.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {selected.details.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-muted rounded-xl p-4 text-center">
                        <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">
                          {selected.details.upcomingCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Upcoming
                        </div>
                      </div>
                      <div className="bg-muted rounded-xl p-4 text-center">
                        <Users className="h-5 w-5 text-accent mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">
                          {selected.details.avgAttendees}+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg Attendees
                        </div>
                      </div>
                      <div className="bg-muted rounded-xl p-4 text-center">
                        <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">
                          {selected.details.popularVenues.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Top Venues
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selected.details.popularVenues.map((venue) => (
                        <span
                          key={venue}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                        >
                          {venue}
                        </span>
                      ))}
                    </div>

                    <Button className="shadow-glow">
                      View All {selected.name} Events
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategorySection;
