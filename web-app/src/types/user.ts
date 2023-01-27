type User = {
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    cpf: string,
    photoURL: string | null,
    emailVerified: boolean,
};

export default User;