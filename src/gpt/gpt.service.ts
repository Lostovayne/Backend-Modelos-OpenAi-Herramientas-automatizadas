import { Injectable } from "@nestjs/common";
import { orthographyCheckUseCase } from "./use-cases";

@Injectable()
export class GptService {
  // Solo llama casos de uso
  async orthographyCheck() {
    return await orthographyCheckUseCase();
  }
}
