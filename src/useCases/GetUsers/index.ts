import { GetUsersController } from "./GetUsersController";
import { GetUsersUseCase } from "./GetUsersUseCase";

const createUserUseCase = new GetUsersUseCase()

const getUsersController = new GetUsersController(
    createUserUseCase
)

export { createUserUseCase, getUsersController }
