import Address from "./address";
import Payment from "./payment";
import Rating from "./rating";

type User = {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    cpf: string,
    phoneNumber: string,
    photoURL: string | null,
    emailVerified: boolean,
    admin: boolean,
    addresses: Address[],
    payments: Payment[],
    ratings: Rating[],
    created_at: Date
};

export default User;