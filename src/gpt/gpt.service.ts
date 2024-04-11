import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { OrthographyDto } from "./dtos";
import { orthographyCheckUseCase } from "./use-cases";

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Solo llama casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
}
