import OpenAI from "openai";

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Te serán proveídos textos en español que podrían tener  errores ortográficos y gramaticales,
        debes corregirlos y retornar el texto corregido,
        si hay errores retornarlos en un arreglo el error y su corrección,
        si encuentras algún error  en el texto devuelve un mensaje indicándole al usuario como puede mejorar y también agrega el error al array de la respuesta junto a su solución, 
        Solo felicita al usuario en caso de no haber ningún error en el texto y estar escrito perfectamente
        Debes de responder en formato JSON,
        Asigna un Puntaje al usuario según el número de errores encontrados en el campo userScore usando un porcentaje en relación al texto.
        El puntaje debe ser un número entre 0 y 100, sin decimales.
        ElPorcentaje tiene que tener una breve explicacion de por qué le dió ese puntaje.
   
       
        Ejemplo de salida:

        {
          userScore: number
          errors:string[], // ["error => solución"]
          message:string // "Felicitaciones | Puedes mejorar haciendo estas cosas ... etc etc"
        }
          `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // console.log(completion);
  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;
};
