import africastalking from "africastalking";

const africasTalking = africastalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!,
});

const sms = africasTalking.SMS;

export async function sendSMS(to: string, message: string) {
  try {
    const response = await sms.send({
      to: `+${to.replace(/^0/, "254")}`, // convert 07.. to +254..
      message,
      from: process.env.SMS_SHORTCODE || "YourBiz",
    });
    console.log("✅ SMS sent:", response);
  } catch (err) {
    console.error("❌ SMS error:", err);
  }
}
