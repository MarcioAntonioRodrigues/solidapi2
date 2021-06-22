import { expect } from 'chai';
import { GetUsersUseCase } from "../useCases/GetUsers/GetUsersUseCase";
import { ScratchUsersRepository } from "../repositories/implementations/ScratchUsersRepository";

describe('Save user test', ()=> {
    it('Testing the save from user on database', (done)=> {
        new Promise(() => {
            //Arrange
            const scratchUsersRepository = new ScratchUsersRepository()
            const user: any = { email: "joao2@hotmail.com", password: "123455", id: "12ddasd" };
            let expectedResult = scratchUsersRepository.getUsersList();
            expectedResult.push(user);
    
            //Act
            scratchUsersRepository.save(user);
            let result = scratchUsersRepository.getUsersList();
            
            //Assert
            expect(result).to.eql(expectedResult);
        }).then(done());
    });
});

describe('Get all user from app', () => {
    it('Get all', async (done) => {
        new Promise(() => {
            const getUsersUseCase = new GetUsersUseCase();
            const scratchUsersRepository = new ScratchUsersRepository()
            const expectedResult = scratchUsersRepository.getUsersList();
            const result = getUsersUseCase.execute();
            expect(expectedResult).to.eql(result);
        }).then(done())
    });
});
