import asyncHandler from "express-async-handler";
import { hallModel } from "../models/Hall.js";

// @desc  AI Chat Assistant - Smart Hall Recommender
// @route POST /ai/chat
// @access Public (optional auth for personalization)
const aiChat = asyncHandler(async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || !message.trim())
    return res.status(400).json({ message: "الرسالة مطلوبة" });

  // Fetch all halls from DB to give Claude context
  const halls = await hallModel
    .find({})
    .select("name description hallType priceRange capacity address averageRating numberOfReviews phoneNumber whatsappNumber facebookLink")
    .lean();

  const hallsContext = halls.map((h, i) => `
[${i + 1}] ${h.name}
- النوع: ${h.hallType?.join(", ")}
- السعر: ${h.priceRange}
- السعة: ${h.capacity ? h.capacity + " شخص" : "غير محدد"}
- المحافظة: ${h.address?.governorate} - ${h.address?.city}
- التقييم: ${h.averageRating}/5 (${h.numberOfReviews} تقييم)
- التليفون: ${h.phoneNumber}
${h.whatsappNumber ? `- واتساب: ${h.whatsappNumber}` : ""}
${h.description ? `- الوصف: ${h.description}` : ""}
  `.trim()).join("\n\n");

  // Build conversation history for Claude
  const messages = [
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: message }
  ];

  // Call Anthropic API
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type":         "application/json",
      "x-api-key":            process.env.ANTHROPIC_API_KEY,
      "anthropic-version":    "2023-06-01",
    },
    body: JSON.stringify({
      model:      "claude-opus-4-5",
      max_tokens: 1024,
      system: `أنت مساعد ذكي لموقع "وايت نايت" لحجز القاعات في مصر.
مهمتك مساعدة المستخدمين في:
1. اختيار القاعة المناسبة بناءً على احتياجاتهم (نوع المناسبة، عدد الضيوف، المحافظة، الميزانية)
2. الإجابة على أسئلتهم عن القاعات المتاحة
3. مقارنة القاعات وإعطاء توصيات واضحة

القاعات المتاحة حالياً في النظام:
${hallsContext || "لا توجد قاعات مسجلة حالياً"}

قواعد مهمة:
- رد دائماً بالعربية
- كن ودوداً ومختصراً
- لو المستخدم ذكر نوع مناسبة أو عدد ضيوف أو محافظة، رشحله القاعات المناسبة بالاسم
- لو مفيش قاعات مناسبة قوله بصراحة
- لو سألك عن حاجة مش متعلقة بالقاعات، قوله إنك مساعد حجز قاعات بس
- دايماً اذكر رقم التليفون أو الواتساب لما ترشح قاعة`,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("Anthropic API error:", err);
    return res.status(500).json({ message: "خطأ في الاتصال بالـ AI، حاول تاني" });
  }

  const data = await response.json();
  const reply = data.content?.[0]?.text || "مش قادر أرد دلوقتي، حاول تاني";

  res.status(200).json({
    reply,
    // Return updated history for frontend to store
    history: [
      ...history,
      { role: "user",      content: message },
      { role: "assistant", content: reply   },
    ],
  });
});

export { aiChat };
