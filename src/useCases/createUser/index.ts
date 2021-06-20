import { Environments } from "../../../Environments";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { RabbitMQConsumerProvider } from "../../providers/implementations/RabbitMQConsumerProvider";
import { ScratchUsersRepository } from "../../repositories/implementations/ScratchUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const conn: Environments = new Environments()
const scratchUsersRepository = new ScratchUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()
const rabbitMQConsumerProvider = new RabbitMQConsumerProvider(conn.prd)

const createUserUseCase = new CreateUserUseCase(
    scratchUsersRepository,
    mailtrapMailProvider,
    rabbitMQConsumerProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }
