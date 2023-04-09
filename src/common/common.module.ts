import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { uuid } from 'uuidv4';

export const TOKENS = {
  uuid: 'randomID'
}
const ProviderToken = {
  provide:TOKENS.uuid ,
  useValue: uuid,
};
@Global()
@Module({
  controllers: [CommonController],
  providers: [ProviderToken],
  exports: [ProviderToken],
})
export class CommonModule {}
