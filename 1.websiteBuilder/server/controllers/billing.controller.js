import Stripe from "stripe";
import User from "../models/user.model.js";

let stripe;
const getStripe = () => {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

const plans = {
  pro: { credits: 500, price: 49900 }, // ₹499 in paise
  enterprise: { credits: 1000, price: 149900 }, // ₹1499 in paise
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { planType } = req.body;
    
    if (!plans[planType]) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const plan = plans[planType];
    const stripeClient = getStripe();
    
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `GenWeb.ai ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
              description: `${plan.credits} credits for AI website generation`,
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId: req.user._id.toString(),
        planType: planType,
        credits: plan.credits.toString(),
      },
    });

    return res.status(200).json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Create checkout session error:", error);
    return res.status(500).json({ message: `Checkout error: ${error.message}` });
  }
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const stripeClient = getStripe();
  
  try {
    const event = stripeClient.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      // Add credits to user
      const userId = session.metadata.userId;
      const credits = parseInt(session.metadata.credits);
      
      const user = await User.findById(userId);
      if (user) {
        user.credits += credits;
        await user.save();
        console.log(`Added ${credits} credits to user ${userId}`);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ message: `Webhook error: ${error.message}` });
  }
};
