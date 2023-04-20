"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdminService = void 0;
class IsAdminService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(email) {
        const user = await this.usersRepository.findByEmail(email);
        if (user) {
            if (user.admin)
                return true;
            else
                return false;
        }
        else
            throw new Error("Usuário não encontrado.");
    }
}
exports.IsAdminService = IsAdminService;
