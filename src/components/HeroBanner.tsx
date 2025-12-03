import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Tech Summit 2024",
    subtitle: "The Future of Innovation",
    description: "Join industry leaders and visionaries for the biggest tech event of the year",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
    category: "IT Conference",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    subtitle: "Feel The Beat",
    description: "Three days of non-stop music featuring world-class artists",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80",
    category: "Music",
  },
  {
    id: 3,
    title: "Dream Wedding Expo",
    subtitle: "Your Perfect Day Awaits",
    description: "Discover the latest trends and meet top wedding planners",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    category: "Wedding",
  },
  {
    id: 4,
    title: "Business Leadership Forum",
    subtitle: "Lead. Innovate. Succeed.",
    description: "Connect with executives and entrepreneurs shaping tomorrow",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=80",
    category: "Corporate",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-4">
                {banner.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-2 leading-tight">
                {banner.title}
              </h1>
              <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
                {banner.subtitle}
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {banner.description}
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="shadow-glow gap-2">
                  <Play className="h-5 w-5" />
                  Watch Trailer
                </Button>
                <Button size="lg" variant="outline" className="backdrop-blur-sm">
                  Get Tickets
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-all"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex gap-8">
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground">10K+</div>
          <div className="text-sm text-muted-foreground">Events</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground">500+</div>
          <div className="text-sm text-muted-foreground">Venues</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground">100K+</div>
          <div className="text-sm text-muted-foreground">Attendees</div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
