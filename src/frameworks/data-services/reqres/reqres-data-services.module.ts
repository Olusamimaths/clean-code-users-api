import { Module } from '@nestjs/common';
import { IReqresService } from '@/core/abstracts';
import { HttpModule } from '@/lib/http-service/http.module';
import { ReqresService } from './reqres-data-services.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IReqresService,
      useClass: ReqresService,
    },
  ],
  exports: [IReqresService],
})
export class ReqresDataServicesModule {}
