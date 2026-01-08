import { Controller, Get } from "@nestjs/common";

@Controller("api/v1")
export class HealthController {
  @Get("_health")
  getHealth() {
    return {
      message: "OK",
      error: null,
      statusCode: 200,
    };
  }
}
