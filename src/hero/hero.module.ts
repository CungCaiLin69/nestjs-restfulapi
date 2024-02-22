import { Module } from "@nestjs/common";
import { heroController } from "./hero.controller";
import { HeroService } from "./hero.service";

@Module({
  controllers: [heroController],
  providers: [HeroService],
})

export class HeroModule {}