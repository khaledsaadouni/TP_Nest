import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { debug } from 'console';

@Controller('premier')
export class PremierController {
  @Get()
  premierGetMethode(): string {
    debug('Get methode');
    return 'Get methode';
  }
  @Post()
  premierPostMethode(): string {
    debug('Post methode');
    return 'Post methode';
  }
  @Delete()
  premierDeleteMethode(): string {
    debug('Delete methode');
    return 'Delete methode';
  }
  @Put()
  premierPutMethode(): string {
    debug('Put methode');
    return 'Put methode';
  }
  @Patch()
  premierPatchMethode(): string {
    debug('Patch methode');
    return 'Patch methode';
  }
}
