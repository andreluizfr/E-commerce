"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
class UpdateUserService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        const userWhoMadeRequest = await this.usersRepository.findByEmail(data.email);
        const userToUpdate = await this.usersRepository.findById(data.userId);
        if (userWhoMadeRequest && userToUpdate) {
            if (userWhoMadeRequest.email === userToUpdate.email) {
                const updatedUser = await this.usersRepository.updateUser(data.userId, data.changes);
                return { updatedUser: updatedUser };
            }
            else
                throw new Error("Você não pode modificar outro usuário.");
        }
        else
            throw new Error("Usuário não encontrado.");
    }
}
exports.UpdateUserService = UpdateUserService;
