import { User } from "../../entities/User";
import { ScratchUsersRepository } from "../../repositories/implementations/ScratchUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IConsumerProvider } from "../IConsumerProvider";

export class RabbitMQConsumerProvider implements IConsumerProvider
{
    private amqp = require('amqplib/callback_api');

    constructor(private connUrl: string, private usersRepository: IUsersRepository){}

    async consumer(queueName: string): Promise<User> {

        let usersRepository = new ScratchUsersRepository();
        console.log('consumindo...')
        let user: any;
        this.amqp.connect(this.connUrl, function(err, conn){
            conn.createChannel(function(err, ch){
                ch.consume(queueName, function(msg: any){
                    const { email, password, id } = JSON.parse(
                        msg.content.toString()
                        );
                        
                        user = { email, password, id};

                        console.log('usuario no consumer: ', user)
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
