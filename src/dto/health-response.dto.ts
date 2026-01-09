import { ApiProperty } from "@nestjs/swagger";

export class HealthResponseDto {
  @ApiProperty({ example: "OK" })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ example: 200 })
  statusCode: number;

  constructor(message: string, error: string | null, statusCode: number) {
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }
}
