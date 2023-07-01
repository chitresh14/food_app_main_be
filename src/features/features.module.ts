import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule
  ],
  controllers: [],
  exports: [
    AuthModule,
    UserModule
  ],
})
export class FeaturesModule {}
