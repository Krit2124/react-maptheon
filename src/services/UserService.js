import api from "../http/index";

export default class UserService {
    static async login(emailOrUsername, password) {
        return api.post('/login', { emailOrUsername, password });
    }

    static async registration(username, email, password) {
        return api.post('/registration', { username, email, password });
    }

    static async logout() {
        return api.post('/logout');
    }

    static async getProfileInfo(id_user) {
        return api.get('/profileInfo/' + id_user);
    }
}