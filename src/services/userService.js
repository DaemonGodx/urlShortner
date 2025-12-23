import UserRepo from "../repository/userRepo.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const sessionIdToUserMap = new Map();

class UserServices {
    constructor() {
        this.userRepo = new UserRepo();
    }

    async register(name, email, password) {
        try {
            return await this.userRepo.register(name, email, password);
        } catch (err) {
            console.error("Service layer register error", err);
            throw err;
        }
    }

    async login(email, password) {
        try {
            const user = await this.userRepo.login(email);

            if (!user) {
                throw new Error("User not found");
            }

            const passwordMatch = await this.checkPassword(
                password,
                user.password
            );

            if (!passwordMatch) {
                throw new Error("Incorrect password");
            }

            const sessionId = uuidv4();

            this.setUser(sessionId, user);

            return { sessionId, user };

        } catch (error) {
            console.error("Login service error:", error.message);
            throw error;
        }
    }

    async checkPassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            console.error("Password comparison error");
            throw error;
        }
    }

    setUser(sessionId, user) {
        sessionIdToUserMap.set(sessionId, user);
    }

    getUser(sessionId) {
        return sessionIdToUserMap.get(sessionId);
    }
}

export default UserServices;
