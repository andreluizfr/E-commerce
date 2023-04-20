"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
class GetUserService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(email) {
        const user = await this.usersRepository.findByEmail(email);
        if (user)
            return { user: user };
        else
            throw new Error("Usuário não encontrado.");
    }
}
exports.GetUserService = GetUserService;
