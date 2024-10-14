/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import cors from "cors";
// import express, { Application } from "express";
// import globalErrorHandler from "./app/middlewares/globalErrorhandler";
// import notFound from "./app/middlewares/notFound";
// import router from "./app/routes";
// import cookieParser from "cookie-parser";
// import Stripe from "stripe";
// import {
//   createCheckoutSession,
//   paymentWebhook,
// } from "./app/modules/payment/payment";
// import bodyParser from "body-parser";
// import { IncomingMessage } from "http";

// declare module "http" {
//   interface IncomingMessage {
//     rawBody?: Buffer;
//   }
// }

// const app: Application = express();

// //parsers
// app.use(
//   bodyParser.json({
//     verify: function (req, res, buf) {
//       req.rawBody = buf; // Store the raw body in req.rawBody
//     },
//   }),
// );
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-09-30.acacia",
// });

// app.post("/webhook", express.raw({ type: "application/json" }), paymentWebhook);

// app.use(express.json());

// app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5000",
//       "http://localhost:3001",
//       "https://tasty-hub-chi.vercel.app",
//     ],
//     credentials: true,
//     exposedHeaders: ["set-cookie"],
//   }),
// );

// app.set("trust proxy", true);

// app.post("/api/v1/create-checkout-session", createCheckoutSession);

// // application routes
// app.use("/api/v1", router);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to TastyHub",
//   });
// });

// app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

// export default app;
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import {
  createCheckoutSession,

} from "./app/modules/payment/payment";

const app: Application = express();

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

// Middleware to parse raw body for Stripe webhooks

// Set up CORS, cookie parser, and JSON parsing
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:3001",
      "https://tasty-hub-chi.vercel.app",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);

app.set("trust proxy", true);

app.use(express.json());
app.post("/api/v1/create-checkout-session", createCheckoutSession);
// Set trust proxy for secure cookies (if behind a proxy)

// Define routes


// Application routes
app.use("/api/v1", router);

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to TastyHub",
  });
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound); // 404 handler

export default app;
