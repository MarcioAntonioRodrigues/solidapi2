import { Environments } from "../../../Environments";
import { IMailProvider } from "../../providers/IMailProvider";
import { RabbitMQConsumerProvider } from "../../providers/implementations/RabbitMQConsumerProvider";
export class CreateUserUseCase
{
    private QUEUE_NAME = 'user creation';

    constructor(private mailProvider: IMailProvider,
                private rabbitMQConsumerProvider: RabbitMQConsumerProvider) { }

    async execute() {
        let env = new Environments();
        let conn = env.prd

        this.rabbitMQConsumerProvider = new RabbitMQConsumerProvider(conn);
        const user = await this.rabbitMQConsumerProvider.consumer(this.QUEUE_NAME);

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
