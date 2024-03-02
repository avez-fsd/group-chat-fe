
export const decodeJwtToken = (token:string) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}