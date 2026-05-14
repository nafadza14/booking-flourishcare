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
      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
      
      console.log("New Booking Received:", bookingData);

      if (webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          });
          const result = await response.json();
          console.log("Google Sheet Response:", result);
        } catch (webhookError) {
          console.error("Webhook failed, but proceeding:", webhookError);
        }
      }
      
      res.json({ 
        success: true, 
        message: "Booking data processed",
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
