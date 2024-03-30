export const KEY_ACCESS_TOKEN ="access-token";
// I want to store the access token to local storage of frontend
export function getItem(key){
    return localStorage.getItem(key);

}
export function setItem(key ,value){
    localStorage.setItem(key, value);
}

export function removeItem(key){
    localStorage.removeItem(key);
}