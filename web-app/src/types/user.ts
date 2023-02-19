type User = {
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    cpf: string,
    phoneNumber: string,
    photoURL: string | null,
    emailVerified: boolean,
    admin: boolean
};

export default User;