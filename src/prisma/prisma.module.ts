import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv'

@Module({})
export class PrismaModule {
  static forRoot(envFilePath?: string): DynamicModule {
    let envFile = envFilePath || '.env';

    // Checa se o arquivo existe
    const filePath = path.resolve(process.cwd(), envFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo .env ${filePath} não encontrado`);
    }

    dotenv.config({ path: filePath });

    return {
      module: PrismaModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: envFile,
          isGlobal: true, // Define se o ConfigService será global
        }),
      ],
      exports: [ConfigModule],
    };
  }
}
