/* eslint-disable @typescript-eslint/no-unused-vars */
import Tenant from "@/models/Tenant";
import Room from "@/models/Room";
import Ledger from "@/models/Ledger";
import { sendSMS } from "@/lib/sms";

// 🔹 1. Payment Received
export async function notifyPaymentReceived(tenantId: string, amount: number) {
  const tenant = await Tenant.findById(tenantId).populate("roomId propertyId");
  if (!tenant) return;

  const message = `Hello ${tenant.name}, we’ve received your rent payment of KES ${amount.toFixed(
    2
  )} for ${tenant.roomId.name}. Thank you!`;

  await sendSMS(tenant.phone, message);
}

// 🔹 2. Rent Due Reminder
export async function sendRentDueReminders() {
  const tenants = await Tenant.find({ active: true }).populate("roomId");

  for (const tenant of tenants) {
    const message = `Dear ${tenant.name}, your rent for ${tenant.roomId.name} is due soon. Please make your payment to avoid penalties.`;
    await sendSMS(tenant.phone, message);
  }
}

// 🔹 3. Rent Overdue Warning
export async function sendRentOverdueWarnings() {
  const tenants = await Tenant.find({ active: true }).populate("roomId");

  for (const tenant of tenants) {
    // optionally check ledger for unpaid balance
    const ledger = await Ledger.findOne({ roomId: tenant.roomId._id });
    if (!ledger) continue;

    if (ledger.balance < 0) {
      const message = `⚠️ Dear ${tenant.name}, your rent for ${tenant.roomId.name} is overdue. Please clear the balance of KES ${Math.abs(
        ledger.balance
      )} immediately.`;
      await sendSMS(tenant.phone, message);
    }
  }
}
