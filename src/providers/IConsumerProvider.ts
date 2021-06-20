import { User } from "../entities/User";

export interface IConsumerProvider
{
    consumer(queueName: string): Promise<User>;
}