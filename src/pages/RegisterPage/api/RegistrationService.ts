import type { RegistrationFormData } from "../store/RegistrationStore";

const encodeWebhook = () => {
  const raw =
    "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvODkwNTY4MzY4MzI5OTkwMTQ0LzdvSDJmR3J3OUF0SU9hYWxMenhITmpSLUZic3ZGcEpjUDhuWk1uRFdGX1ZMVmpIQmg3RFB3RjNndDVHY1hmWUtDb0Vs";
  return atob(raw);
};

const WEBHOOK_URL = encodeWebhook();

const CONFIG = {
  title: "Пришла заявка!",
  splittedAnswerTitle: "Пробный пост (продолжение)",
  color: "#ff9800",
};

function checkMessageLength(items: { name: string; value: string }[]): boolean {
  let str = "";
  items.forEach(({ name, value }) => {
    str += name + value;
  });
  return str.length >= 1000;
}

function splitLastAnswer(items: { name: string; value: string }[]) {
  const lastItem = items[items.length - 1];
  const answers = items.slice(0, items.length - 1);
  const bigText: string[] = [];
  let remaining = lastItem.value;

  while (remaining.length > 999) {
    bigText.push(remaining.substring(0, 1000));
    remaining = remaining.substring(1000);
  }
  bigText.push(remaining);

  return [answers, bigText] as const;
}

async function sendEmbed(embed: unknown) {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: null,
      embeds: [embed],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Discord Webhook error (${response.status}): ${text}`);
  }
}

export const sendRegistrationToDiscord = async (
  values: RegistrationFormData
) => {
  const items = [
    { name: "Ник в Discord:", value: values.discordNick },
    { name: "Персонаж и страна:", value: values.characterAndCountry },
    { name: "Мой опыт в ВПИ:", value: values.experienceVpi },
    { name: "Мой опыт в РП:", value: values.experienceRp },
    {
      name: "Сколько дней в неделю готов играть:",
      value: String(values.daysPerWeek),
    },
    {
      name: "Знание лора:",
      value:
        values.loreKnowledge.length > 0
          ? "• " + values.loreKnowledge.join("\n• ")
          : "Не указано",
    },
    {
      name: "Как я нашёл проект:",
      value:
        values.howFound === "Другое" && values.howFoundOther
          ? `${values.howFound}: ${values.howFoundOther}`
          : values.howFound,
    },
    { name: "Пробный пост:", value: values.trialPost },
  ];

  if (checkMessageLength(items)) {
    const [answers, bigText] = splitLastAnswer(items);

    await sendEmbed({
      title: CONFIG.title,
      description: null,
      fields: answers.map((item) => ({
        name: item.name,
        value: item.value,
        inline: false,
      })),
      color: parseInt(CONFIG.color.substring(1), 16),
      timestamp: new Date().toISOString(),
    });

    for (const text of bigText) {
      await sendEmbed({
        title: CONFIG.splittedAnswerTitle,
        description: text,
        color: parseInt(CONFIG.color.substring(1), 16),
        timestamp: new Date().toISOString(),
      });
    }
  } else {
    await sendEmbed({
      title: CONFIG.title,
      description: null,
      fields: items.map((item) => ({
        name: item.name,
        value: item.value,
        inline: false,
      })),
      color: parseInt(CONFIG.color.substring(1), 16),
      timestamp: new Date().toISOString(),
    });
  }
};
