export const BASE:string = 'http://localhost:8080/'

export const GET_ALL_USERS:string = BASE + "users"
export const CREATE_USER:string = GET_ALL_USERS
export const CREATE_POST:string = `${BASE}/posts`
export const CREATE_COMMENT:string = `${BASE}comments`
export const BASIC_AUTH:string = `${BASE}basicauth`