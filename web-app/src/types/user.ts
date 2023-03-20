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
    addresses: {
        default: boolean,
        receiverName: string,
        streetName: string,
        houseNumber: number
        district: string,
        city: string,
        state: string,
        cep: string,
        phoneNumber: string
    }[],
    created_at: Date
};

export default User;