import OpenAI from "openai";

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Debes de responder en formato JSON,
        el texto debe ser coherente ,
        tu tarea es corregir los textos  y retornar información sobre el texto corregido,
        el porcentaje de errores corregidos,
        Si no hay errores , debes de retornar un mensaje de Felicitaciones
        Ejemplo de salida:

        {
          userScore: number,
          error:string[], // ["error => solución"]
          message:string // "Felicitaciones etc etc "
        }
          `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 100,
    temperature: 0.2,
  });

  // console.log(completion);
  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;
};
