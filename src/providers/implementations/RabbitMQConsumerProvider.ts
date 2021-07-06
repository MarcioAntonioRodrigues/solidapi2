import { User } from "../../entities/User";
import { ScratchUsersRepository } from "../../repositories/implementations/ScratchUsersRepository";
import { IConsumerProvider } from "../IConsumerProvider";
import { IMessageBrokerProvider } from "../IMessageBrokerProvider";
import { RabbitMQProvider } from "./RabbitMQProvider";
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
                    const { nome, email, password, idade, id } = JSON.parse(
                        msg.content.toString()
                        );
                        let messageBrokerProvider: IMessageBrokerProvider = new RabbitMQProvider();
                        
                        user = { nome, email, password, idade, id };
                        usersRepository.save(user);

                        let queuNameToPublish = "turma creation";
                        let userStringFy = JSON.stringify(user);
                        messageBrokerProvider.publish(queuNameToPublish, userStringFy)
                        ch.ack(msg)
                    },
                    { noAck: false }
                    );
                })
            });
        return user;
    }
}
