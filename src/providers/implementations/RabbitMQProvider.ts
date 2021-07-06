import { IMessageBrokerProvider } from "../IMessageBrokerProvider";

export class RabbitMQProvider implements IMessageBrokerProvider
{
    private CONN_URL = 'amqps://acjlpsyp:uVLQgx9SRnlyof6SbHyBf5AHZODATfnH@fish.rmq.cloudamqp.com/acjlpsyp';
    private amqp = require('amqplib/callback_api')

    async publish(queueName: string, data: any): Promise<void> {
        let channel = null
        this.amqp.connect(this.CONN_URL, function (err: any, conn: any) {
            conn.createChannel(function (err, ch: any) {
                    console.log('data:', data)
                    console.log('queueName:', queueName)
                    channel = ch;
                    channel.sendToQueue(queueName, Buffer.from(data), {persistent: true});
                    
                    process.on('exit', () => {
                        channel.close();
                        console.log('Closing RabbitMQ channel...')
                    });
                });
        });
    }
}
