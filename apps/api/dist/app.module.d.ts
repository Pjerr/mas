import { OnModuleInit } from '@nestjs/common';
import { GroupSubscriber } from './providers/eventSubscribers/group.subscriber';
export declare class AppModule implements OnModuleInit {
    private readonly groupSubscriber;
    constructor(groupSubscriber: GroupSubscriber);
    onModuleInit(): Promise<void>;
}
//# sourceMappingURL=app.module.d.ts.map