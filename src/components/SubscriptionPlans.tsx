import { motion } from "framer-motion";
import { Check, Tv, Monitor, Users, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Mobile",
    icon: Smartphone,
    price: 4.99,
    period: "/month",
    description: "Watch on your phone or tablet",
    features: [
      "Unlimited event streaming",
      "Watch on 1 device",
      "720p video quality",
      "Download on 1 device",
    ],
    quality: "Good",
    resolution: "720p",
    devices: 1,
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Standard",
    icon: Monitor,
    price: 9.99,
    period: "/month",
    description: "Great for personal viewing",
    features: [
      "Unlimited event streaming",
      "Watch on 2 devices",
      "1080p Full HD quality",
      "Download on 2 devices",
      "Ad-free experience",
    ],
    quality: "Better",
    resolution: "1080p",
    devices: 2,
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    icon: Tv,
    price: 14.99,
    period: "/month",
    description: "Best for families",
    features: [
      "Unlimited event streaming",
      "Watch on 4 devices",
      "4K Ultra HD + HDR",
      "Download on 6 devices",
      "Ad-free experience",
      "Spatial audio",
    ],
    quality: "Best",
    resolution: "4K+HDR",
    devices: 4,
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Family",
    icon: Users,
    price: 22.99,
    period: "/month",
    description: "Share with up to 6 people",
    features: [
      "Everything in Premium",
      "6 individual profiles",
      "Watch on 6 devices",
      "Download on 10 devices",
      "Parental controls",
      "Group watch parties",
      "Priority support",
    ],
    quality: "Best",
    resolution: "4K+HDR",
    devices: 6,
    cta: "Start Free Trial",
    popular: false,
  },
];

const SubscriptionPlans = () => {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stream Events Live & On-Demand
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your plan and start watching events from anywhere. All plans include a 7-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-glow"
                  : "border-border hover:shadow-lg hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-hero-gradient py-1.5 text-center">
                  <span className="text-primary-foreground text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`p-6 ${plan.popular ? "pt-10" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.popular ? "bg-hero-gradient" : "bg-muted"
                    }`}
                  >
                    <plan.icon
                      className={`h-6 w-6 ${
                        plan.popular ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl text-muted-foreground">$</span>
                    <span className="text-4xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                {/* Quality Badges */}
                <div className="flex gap-2 mb-6">
                  <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                    {plan.resolution}
                  </span>
                  <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                    {plan.devices} {plan.devices === 1 ? "device" : "devices"}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "shadow-glow" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Cancel anytime. No commitments, no contracts.
        </motion.p>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
