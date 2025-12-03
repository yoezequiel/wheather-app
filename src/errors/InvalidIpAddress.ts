export class InvalidIpAddress extends Error {

    constructor(ip: string) {
        super(`Invalid IP: ${ip}`);
    }

}