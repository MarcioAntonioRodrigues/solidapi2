import { Router } from "express";
import { createUserController } from "./useCases/createUser";
import { getUsersController } from "./useCases/GetUsers";

const router = Router()

router.post('/createUser', (request, response)=> {
    return createUserController.handle();
})

router.get('/getAllUsers', (request, response) => {
    return getUsersController.handle(response);
})

export { router }
