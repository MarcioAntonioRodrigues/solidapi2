import { Environments } from "../../../Environments";
import { IMailProvider } from "../../providers/IMailProvider";
import { RabbitMQConsumerProvider } from "../../providers/implementations/RabbitMQConsumerProvider";
import { ScratchUsersRepository } from "../../repositories/implementations/ScratchUsersRepository";
// require("../../providers/implementations/RabbitMQConsumerProvider")

export class CreateUserUseCase
{
    private QUEUE_NAME = 'user creation';

    constructor(private mailProvider: IMailProvider,
                private rabbitMQConsumerProvider: RabbitMQConsumerProvider) {}

    async execute() {
        let env = new Environments();
        let conn = env.prd

        let userRepository = new ScratchUsersRepository()

        this.rabbitMQConsumerProvider = new RabbitMQConsumerProvider(conn, userRepository);
        
        const user = await this.rabbitMQConsumerProvider.consumer(this.QUEUE_NAME);

        // const userAlreadyExistis = await this.usersRepository.findByEmail(user.email);
        
        // if(userAlreadyExistis)
        // {
        //     throw new Error('User already exists.');
        // }

        // await this.usersRepository.save(user);
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
