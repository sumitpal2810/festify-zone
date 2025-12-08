import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { XCircle, RefreshCw, Home, HelpCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || "standard";

  const errorReasons = [
    "Insufficient funds in the account",
    "Card details were entered incorrectly",
    "Card has expired or is not activated",
    "Transaction was declined by your bank",
  ];

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
              className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="h-12 w-12 text-destructive" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Payment Failed
              </h1>
              <p className="text-muted-foreground mb-6">
                We couldn't process your payment. Don't worry, no charges were made.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-xl p-4 mb-6 text-left"
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Common Reasons
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {errorReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button
                onClick={() => navigate("/subscribe?plan=" + planId)}
                className="w-full gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/subscribe")}
                className="w-full gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Use Different Card
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="w-full gap-2 text-muted-foreground"
              >
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted-foreground mt-6"
            >
              Need help? Contact our support team at support@eventstream.com
            </motion.p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentFailed;
