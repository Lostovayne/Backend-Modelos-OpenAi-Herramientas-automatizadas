import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { OrthographyDto, ProsConsDiscusserDto } from "./dtos";
import { GptService } from "./gpt.service";

@Controller("gpt")
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post("orthography-check")
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post("pros-cons-discusser")
  prosConstDiscusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConstDiscusser(prosConsDiscusserDto);
  }

  @Post("pros-cons-discusser-stream")
  async prosConstDiscusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.prosConstDiscusserStream(prosConsDiscusserDto);

    res.setHeader("Content-Type", "application/json");
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || "";
      res.write(piece);
    }
    res.end();
  }
}
