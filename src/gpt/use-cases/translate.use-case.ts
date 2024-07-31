import OpenAI from "openai";

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, { prompt, lang }: Options) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
                Traduce el siguiente texto al idioma  ${lang} : ${prompt} `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    // max_tokens: 400,
  });

  return { message: response.choices[0].message.content };
};
