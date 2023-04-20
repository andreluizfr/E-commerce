"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailService = void 0;
class VerifyEmailService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        await this.usersRepository.verifyEmail(data.verificationEmailCode);
    }
}
exports.VerifyEmailService = VerifyEmailService;
