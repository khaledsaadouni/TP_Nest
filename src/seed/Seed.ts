import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { randEmail } from '@ngneat/falso';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.entity';
import { CvService } from '../cv/cv.service';
import { Cv } from '../cv/entities/cv.entity';
import { randFullName } from '@ngneat/falso';
import { randLastName } from '@ngneat/falso';
import { randFirstName } from '@ngneat/falso';
import { randJobArea } from '@ngneat/falso';
import { randJobTitle } from '@ngneat/falso';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const skillService = app.get(SkillService);

  for (let i = 1; i < 10; i++) {
    const skill = new Skill();
    skill.designation = randJobArea();
    await skillService.create(skill);
  }
  const userService = app.get(UserService);
  for (let i = 1; i < 10; i++) {
    const user = new User();
    user.email = randEmail();
    user.username = randFullName();
    user.password = 'password';
    await userService.create1(user);
  }
  const cvService = app.get(CvService);
  const users = await userService.findAll();
  const skills = await skillService.findAll();
  for (let i = 1; i < 10; i++) {
    const cv = new Cv();
    cv.name = randLastName();
    cv.firstname = randFirstName();
    cv.age = Math.floor(Math.random() * 51) + 20;
    cv.cin = '0000000';
    cv.job = randJobTitle();
    cv.path = 'cv.pdf';
    cv.user = users[Math.floor(Math.random() * 11)];
    cv.skills = [];
    cv.skills.push(skills[1]);
    cv.skills.push(skills[2]);

    await cvService.create(cv);
  }
  await app.close();
}
bootstrap();
