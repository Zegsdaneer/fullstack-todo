export function parseToken(token: string) {
    if(!token){
        console.log('Token does not exist');
        return
    }
    const base64url = token.split('.')[1];
    const base64 = base64url.replace('-','+'.replace('_','/'));

    return JSON.parse(window.atob(base64));
}


export function isTokenExpired(token: string) {
    const payload = parseToken(token);
    if(!payload){
        localStorage.removeItem('token')
        return
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp < currentTime;
    if(isExpired){
        return true
    } else {
        return false;
    }
}