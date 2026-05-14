import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Booking Submission
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = req.body;
      
      console.log("New Booking Received:", bookingData);

      // In a real scenario, you would use a Webhook URL from Google Apps Script or Zapier
      // Example: const response = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, { ... });
      
      // For now, we simulate a successful save
      // You can add your Google Sheet Webhook URL in the .env file later
      
      res.json({ 
        success: true, 
        message: "Booking data saved successfully to system (Simulated Google Sheet integration)",
        bookingCode: `FLR-${Math.floor(Math.random() * 90000) + 10000}`
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      res.status(500).json({ success: false, message: "Failed to save booking" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
