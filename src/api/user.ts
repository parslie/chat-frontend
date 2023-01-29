import { friendChats, groupChats, user } from './data';
import request from './request';

export async function login(username: string, password: string) {
    return request.post(
        '/user/login/',
        {username: username, password: password},
    ).then((resp) => {
        user.set(resp.data);
    });
}

export async function register(username: string, email: string, password: string) {
    return request.post(
        '/user/register/',
        {username: username, email: email, password: password},
    ).then((resp) => {
        user.set(resp.data);
    });
}

export async function logout() {
    return request.post(
        '/user/logout/',
    ).then((resp) => {
        user.set(null);
    });
}

export async function fetchMyself() {
    return request.get(
        '/user/me/',
    );
}