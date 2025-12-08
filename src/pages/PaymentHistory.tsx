import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PaymentStatus = "success" | "failed" | "pending";

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  method: string;
}

const mockPayments: Payment[] = [
  {
    id: "TXN8A7B6C5D",
    date: "2024-01-15",
    description: "Standard Plan - Monthly",
    amount: 9.99,
    status: "success",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN7F6E5D4C",
    date: "2024-01-10",
    description: "Premium Event: Tech Summit 2024",
    amount: 29.99,
    status: "success",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN6G5H4I3J",
    date: "2024-01-05",
    description: "Standard Plan - Monthly",
    amount: 9.99,
    status: "failed",
    method: "Mastercard •••• 5555",
  },
  {
    id: "TXN5K4L3M2N",
    date: "2023-12-15",
    description: "Standard Plan - Monthly",
    amount: 9.99,
    status: "success",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN4O3P2Q1R",
    date: "2023-12-10",
    description: "Premium Event: Music Festival",
    amount: 49.99,
    status: "success",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN3S2T1U0V",
    date: "2023-11-15",
    description: "Standard Plan - Monthly",
    amount: 9.99,
    status: "success",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN2W1X0Y9Z",
    date: "2023-11-01",
    description: "Plan Upgrade: Mobile to Standard",
    amount: 5.00,
    status: "pending",
    method: "PayPal",
  },
];

const statusConfig = {
  success: {
    icon: CheckCircle,
    label: "Successful",
    className: "text-accent bg-accent/10",
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    className: "text-destructive bg-destructive/10",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "text-yellow-500 bg-yellow-500/10",
  },
};

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filteredPayments = mockPayments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  const totalSpent = mockPayments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Payment History
                </h1>
                <p className="text-muted-foreground">
                  View and manage your transactions
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Successful</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockPayments.length}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Active Plan</p>
                <p className="text-2xl font-bold text-primary">Standard</p>
              </div>
            </div>

            {/* Payment List */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                <div className="col-span-4">Description</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Action</div>
              </div>

              <div className="divide-y divide-border">
                {filteredPayments.map((payment, index) => {
                  const status = statusConfig[payment.status];
                  const StatusIcon = status.icon;

                  return (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid sm:grid-cols-12 gap-2 sm:gap-4 p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="sm:col-span-4">
                        <p className="font-medium text-foreground">
                          {payment.description}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          {payment.method}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono sm:hidden">
                          {payment.id}
                        </p>
                      </div>
                      <div className="sm:col-span-2 text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="sm:col-span-2 font-semibold text-foreground">
                        ${payment.amount.toFixed(2)}
                      </div>
                      <div className="sm:col-span-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="sm:col-span-2">
                        {payment.status === "success" && (
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-3 w-3" />
                            Receipt
                          </Button>
                        )}
                        {payment.status === "failed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/subscribe")}
                          >
                            Retry
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filteredPayments.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No transactions found matching your filter.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentHistory;
