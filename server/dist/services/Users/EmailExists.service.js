"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExistsService = void 0;
class EmailExistsService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        const user = await this.usersRepository.findByEmail(data.email);
        if (user)
            return true;
        else
            return false;
    }
}
exports.EmailExistsService = EmailExistsService;
