export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const { name, email, subject, message, token } = body;

  if (!name || !email || !subject || !message || !token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const turnstileVerifyResponse = await $fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: {
        secret: config.turnstileSecretKey,
        response: token,
      },
    },
  );

  if (!turnstileVerifyResponse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid captcha",
    });
  }

  const embed = {
    embeds: [
      {
        title: "New Contact Form Submission",
        color: 0x8b5cf6,
        fields: [
          { name: "Name", value: name, inline: true },
          { name: "Email", value: email, inline: true },
          { name: "Subject", value: subject, inline: false },
          { name: "Message", value: message, inline: false },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  if (config.discordWebhookUrl) {
    try {
      await $fetch(config.discordWebhookUrl, {
        method: "POST",
        body: embed,
      });
    } catch (e) {
      console.error("Failed to send Discord webhook:", e);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to deliver message",
      });
    }
  } else {
    console.warn(
      "NUXT_DISCORD_WEBHOOK_URL is not set. Skipping discord notification.",
    );
  }

  return { success: true };
});
