import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HealthResponseDto } from "./dto/health-response.dto";

@ApiTags("Health")
@Controller("api/v1")
export class HealthController {
  @Get("_health")
  @ApiOkResponse({ description: "Health check successful", type: HealthResponseDto })
  getHealth(): HealthResponseDto {
    return new HealthResponseDto("OK", null, 200);
  }
}
