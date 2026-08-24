// This file runs on the SERVER, not in the browser — it's a Vercel
// "serverless function." Anything placed in /api/*.js is automatically
// turned into a backend endpoint by Vercel: this one becomes POST /api/contact.
//
// Your Resend API key lives in an environment variable (never in this
// file, and never shipped to the browser), so it stays private.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing name, email, or message" });
  }

  // Very basic email format check — not bulletproof, just catches typos.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // Resend's shared test sender — works immediately, no domain setup.
        // Swap this for an address on your own verified domain later if
        // you want the "from" name to look like your site instead of Resend.
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL, // your inbox — set in env vars
        reply_to: email, // so hitting "reply" goes to the visitor, not Resend
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n—\n${name}\n${email}`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Resend error:", errText);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}