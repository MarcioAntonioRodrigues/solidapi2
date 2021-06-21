import { ScratchUsersRepository } from "../repositories/implementations/ScratchUsersRepository";
import { expect } from 'chai';

describe('Save user test', ()=> {
    it('Adding one user to database', (done)=> {
        //Arrange
        const scratchUsersRepository = new ScratchUsersRepository()
        const user = { nome: "Joao Lima", email: "joao@hotmail.com", password: "123455", id: "12ddasd"};
        let expectedResult = scratchUsersRepository.getUsersList();
        expectedResult.push(user);

        //Act
        scratchUsersRepository.save(user);
        let result = scratchUsersRepository.getUsersList();

        //Assert
        expect(result).to.eql(expectedResult);
        done();
    });
});