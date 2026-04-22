import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Set up Razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Validation Logic
  const validateInput = (type: string, value: string) => {
    switch (type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        // at least 8 chars, one uppercase, one lowercase, one number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
      case 'classCode':
        // Format: FC-XXX-XXXX-X (e.g. FC-KVS-2026-A)
        return /^FC-[A-Z]{3,6}-\d{4}-[A-Z0-9]$/.test(value);
      default:
        return true;
    }
  };

  app.post("/api/validate", (req, res) => {
    const { type, value } = req.body;
    const isValid = validateInput(type, value);
    res.json({ isValid });
  });

  app.post("/api/create-order", async (req, res) => {
    try {
      const { amount, receipt } = req.body;
      const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: receipt || "receipt_order_74394",
      };
      
      if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'dummy_key_id') {
        const order = await razorpay.orders.create(options);
        res.json(order);
      } else {
        // Mock success if Razorpay isn't configured
        res.json({
          id: `order_mock_${Math.floor(Math.random() * 1000000)}`,
          entity: "order",
          amount: options.amount,
          amount_paid: 0,
          amount_due: options.amount,
          currency: "INR",
          receipt: options.receipt,
          status: "created",
          attempts: 0,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
