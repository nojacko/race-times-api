import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from "path";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files for Expo generated assets
  app.useStaticAssets(join(__dirname, "..", "public-expo"));

  // Serve static files for other assets
  app.useStaticAssets(join(__dirname, "..", "public"));

  // Enable CORS if needed
  app.enableCors();

  // Swagger/OpenAPI setup (disabled in production)
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle("F1 Race Times API")
      .setDescription("OpenAPI documentation for the F1 Race Times API")
      .setVersion("1.0.0")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  if (!isProduction) {
    console.log(`Swagger UI available at: http://localhost:${port}/api/docs`);
  }
}

bootstrap();
