import { User } from "../../entities/User";
import { ScratchUsersRepository } from "../../repositories/implementations/ScratchUsersRepository";
import { IConsumerProvider } from "../IConsumerProvider";
export class RabbitMQConsumerProvider implements IConsumerProvider
{
    private amqp = require('amqplib/callback_api');

    constructor(private connUrl: string){}

    async consumer(queueName: string): Promise<User> {

        let user: any;
        let usersRepository = new ScratchUsersRepository();

        this.amqp.connect(this.connUrl, function(err, conn) {
            conn.createChannel(function(err, ch) {
                ch.consume(queueName, function(msg: any) {
                    const { email, password, id } = JSON.parse(
                        msg.content.toString()
                        );
                        
                        user = { email, password, id};
                        usersRepository.save(user);

                        ch.ack(msg)
                },
                { noAck: false }
                );
            })
        });
        return user;
    }
}
