export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.auth_token) {
        return { 'Authorization': 'JWT ' + user.auth_token };
    } else {
        return {};
    }
}