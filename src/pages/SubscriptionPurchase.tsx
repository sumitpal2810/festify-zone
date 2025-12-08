import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, CreditCard, Lock, ArrowLeft, Smartphone, Monitor, Tv, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    id: "mobile",
    name: "Mobile",
    icon: Smartphone,
    price: 4.99,
    period: "/month",
    description: "Watch on your phone or tablet",
    features: ["Unlimited event streaming", "Watch on 1 device", "720p video quality"],
    resolution: "720p",
    devices: 1,
  },
  {
    id: "standard",
    name: "Standard",
    icon: Monitor,
    price: 9.99,
    period: "/month",
    description: "Great for personal viewing",
    features: ["Unlimited event streaming", "Watch on 2 devices", "1080p Full HD quality", "Ad-free experience"],
    resolution: "1080p",
    devices: 2,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Tv,
    price: 14.99,
    period: "/month",
    description: "Best for families",
    features: ["Unlimited event streaming", "Watch on 4 devices", "4K Ultra HD + HDR", "Spatial audio"],
    resolution: "4K+HDR",
    devices: 4,
  },
  {
    id: "family",
    name: "Family",
    icon: Users,
    price: 22.99,
    period: "/month",
    description: "Share with up to 6 people",
    features: ["Everything in Premium", "6 individual profiles", "Watch on 6 devices", "Priority support"],
    resolution: "4K+HDR",
    devices: 6,
  },
];

const SubscriptionPurchase = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || "standard";
  
  const [selectedPlan, setSelectedPlan] = useState(planId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      if (isSuccess) {
        navigate("/payment-success?plan=" + selectedPlan);
      } else {
        navigate("/payment-failed?plan=" + selectedPlan);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Choose Your Plan
              </h1>
              <p className="text-muted-foreground mb-6">
                Select a plan and complete your subscription
              </p>

              <div className="space-y-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2 right-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedPlan === plan.id
                            ? "bg-hero-gradient"
                            : "bg-muted"
                        }`}
                      >
                        <plan.icon
                          className={`h-6 w-6 ${
                            selectedPlan === plan.id
                              ? "text-primary-foreground"
                              : "text-primary"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground">
                            {plan.name}
                          </h3>
                          <span className="text-lg font-bold text-foreground">
                            ${plan.price}
                            <span className="text-sm text-muted-foreground font-normal">
                              {plan.period}
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-muted rounded text-xs">
                            {plan.resolution}
                          </span>
                          <span className="px-2 py-0.5 bg-muted rounded text-xs">
                            {plan.devices} devices
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === plan.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Payment Details
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold text-foreground mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {currentPlan.name} Plan
                        </span>
                        <span className="text-foreground">
                          ${currentPlan.price}/month
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          7-day free trial
                        </span>
                        <span className="text-accent">-${currentPlan.price}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border font-semibold">
                        <span className="text-foreground">Due today</span>
                        <span className="text-foreground">$0.00</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      After your free trial, you'll be charged ${currentPlan.price}
                      /month. Cancel anytime.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Start Free Trial
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" />
                    Secured by 256-bit SSL encryption
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubscriptionPurchase;
