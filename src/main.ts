import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.AADHAR_PAN_LINK_API, 'dewdklmlekwm AADHAR_PAN_LINK_API');

  // app.useStaticAssets(path.join(__dirname, 'public'));

  const config = new DocumentBuilder()
    .setTitle('EasyLink')
    .setDescription(
      '<b>"Streamlining Your Workflow, Simplifying Your Success."</b> <br> <br> <ul><li>  EasyLink is a platform designed to simplify complex workflows and accelerate business processes. With a focus on ease-of-use and efficiency, EasyLink provides intuitive tools that enable businesses to streamline operations, enhance productivity, and deliver exceptional value.</li>  <br>  <li> Whether you are automating tasks, managing data, or improving decision-making, EasyLink helps you do more in less time. With its flexible, user-friendly interface and robust features, EasyLink empowers businesses to focus on what truly matters—growth, innovation, and customer satisfaction.</li>  <br> <li>  At the heart of EasyLink is simplicity, allowing you to seamlessly integrate multiple functionalities into your existing systems, while keeping things intuitive and easy to manage. </li></ul>',
    )

    .setVersion('v1.0.0')
    .addOAuth2()
    .addBasicAuth()
    // .addTag('cats')
    .build();

  // Reading the custom CSS file
  const customCss = fs.readFileSync(path.join('swagger-custom.css'), 'utf-8');


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: customCss, // Inject the CSS directly
  });

  await app.listen(1995);


}
bootstrap();
