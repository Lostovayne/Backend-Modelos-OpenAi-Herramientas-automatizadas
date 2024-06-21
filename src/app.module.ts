import { Module } from "@nestjs/common";
import { GptModule } from "./gpt/gpt.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [GptModule, ConfigModule.forRoot()],
})
export class AppModule {}


// xd 