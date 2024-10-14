import { stripe } from "../../../app";

import catchAsync from "../../utils/catchAsync";
import { User } from "../User/user.model";
import { Payment } from "./payment.model";

export const createCheckoutSession = catchAsync(async (req, res) => {
  const userId = req.body.userId;


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Premium membership",
          },
          unit_amount: 20000, // 200 USD in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    //   success_url: "http://localhost:3000/success",
    //   cancel_url: "http://localhost:3000/cancel",
    success_url: "https://tasty-hub-chi.vercel.app/success",
    cancel_url: "https://tasty-hub-chi.vercel.app/cancel",
  });

  // Save the payment details in MongoDB
  const payment = new Payment({
    userId,
    amount: 200, // Store the actual amount in dollars
    sessionId: session.id,
    createdAt: new Date(),
    currency: "usd",
    paymentStatus:"completed"
  });
  await payment.save();
const user = await User.findById(userId);
if (user) {
    user.isPremium = true;
    await user.save();
    }







  // Respond with the session ID
  res.status(200).json({ id: session.id });
});

// export const paymentWebhook = catchAsync(async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   if (!sig) {
//     return res
//       .status(400)
//       .send("Webhook Error: Missing stripe-signature header");
//   }

//   try {
//     const webhookSecret = "we_1Q9cD1Fqe3FUEwXB40zwYFm6";
//     if (!webhookSecret) {
//       return res
//         .status(400)
//         .send(
//           "Webhook Error: Missing STRIPE_WEBHOOK_SECRET environment variable",
//         );
//     }

//     event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//   } catch (err) {
//     if (err instanceof Error) {
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//     return res.status(400).send("Webhook Error: Unknown error");
//   }

//   // Handle the event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     // Find the payment in the database and update it
//     const payment = await Payment.findOneAndUpdate(
//       { sessionId: session.id },
//       {
//         paymentStatus: "completed",
//         paymentIntentId: session.payment_intent,
//       },
//       { new: true },
//     );
//     const userId = await Payment.findOne({ sessionId: session.id }).select(
//       "userId",
//     );
//     const user = await User.findById(userId);
//     if (user) {
//       user.isPremium = true;
//     }

//     console.log("Payment Completed:", payment);
//   }
//   // Handle other events if needed
//   if (event.type === "payment_intent.payment_failed") {
//     const paymentIntent = event.data.object;

//     // Handle the payment failure (e.g., update payment status to "failed")
//     const payment = await Payment.findOneAndUpdate(
//       { paymentIntentId: paymentIntent.id },
//       {
//         paymentStatus: "failed",
//       },
//       { new: true },
//     );
//     console.log("Payment Failed:", payment);
//   }

//   res.json({ received: true });
// });
