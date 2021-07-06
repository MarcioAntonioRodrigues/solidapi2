export interface IMessageBrokerProvider
{
    publish(queueName: string, data: any): Promise<void>;
}