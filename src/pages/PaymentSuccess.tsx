import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Play, Home, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans: Record<string, { name: string; price: number }> = {
  mobile: { name: "Mobile", price: 4.99 },
  standard: { name: "Standard", price: 9.99 },
  premium: { name: "Premium", price: 14.99 },
  family: { name: "Family", price: 22.99 },
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || "standard";
  const plan = plans[planId] || plans.standard;

  const transactionId = "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-accent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground mb-6">
                Welcome to EventStream! Your {plan.name} plan is now active.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-xl p-4 mb-6 text-left"
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Transaction Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="text-foreground font-mono">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{today}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-foreground">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-foreground">${plan.price}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trial Period</span>
                  <span className="text-accent">7 days free</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button
                onClick={() => navigate("/stream")}
                className="w-full gap-2"
              >
                <Play className="h-4 w-4" />
                Start Watching
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full gap-2"
              >
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/payment-history")}
                className="w-full text-muted-foreground"
              >
                View Payment History
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
