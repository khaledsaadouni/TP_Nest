import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { ToDoModule } from './to-do/to-do.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [
    PremierModule,
    ToDoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp_nest',
      // entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    SkillModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/todo/*');
  }
}
