type User = {
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    cpf: string,
    phoneNumber: string,
    photoURL: string | null,
    emailVerified: boolean,
    admin: boolean,
    created_at: Date
};

export default User;