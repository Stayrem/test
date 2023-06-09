import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Configuration from './app.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseOptionsFactory } from './database/options/factory'
import { ApplicationModule } from './application/application.module'
import { APP_FILTER } from '@nestjs/core'
import { ApplicationExceptionFilter } from './common/filters/application.filter'
import { UserModule } from './user/user.module'
import { NotificationModule } from './notification/notification.module'
import { AuthModule } from './auth/auth.module'
import { DocumentModule } from './document/document.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => databaseOptionsFactory(config),
    }),
    ApplicationModule,
    UserModule,
    NotificationModule,
    AuthModule,
    DocumentModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ApplicationExceptionFilter }],
})
export class AppModule {}
