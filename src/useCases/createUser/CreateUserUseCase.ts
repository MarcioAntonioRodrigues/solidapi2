import { Environments } from "../../../Environments";
import { IConsumerProvider } from "../../providers/IConsumerProvider";
import { IMailProvider } from "../../providers/IMailProvider";
import { IMessageBrokerProvider } from "../../providers/IMessageBrokerProvider";
import { RabbitMQConsumerProvider } from "../../providers/implementations/RabbitMQConsumerProvider";
export class CreateUserUseCase
{
    private QUEUE_NAME = 'user creation';

    constructor(private mailProvider: IMailProvider,
                private consumerProvider: IConsumerProvider, 
                private messageBrokerProvider: IMessageBrokerProvider) { }

    async execute() {
        let env = new Environments();
        let conn = env.prd

        this.consumerProvider = new RabbitMQConsumerProvider(conn);
        const user = await this.consumerProvider.consumer(this.QUEUE_NAME);
        // let userStringFy = JSON.stringify(user);

        setTimeout(() => {
            // this.messageBrokerProvider.publish(this.QUEUE_NAME, userStringFy)
        }, 1000);


        await this.mailProvider.sendMail({
            to: {
                name: user.nome,
                email: user.email
            },
            from: {
                name: 'Equipe do app',
                email: 'equipe@meuapp.com'
            },
            subject: 'Seja bem vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma</p>'
        })
    }
}
