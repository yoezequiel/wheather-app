import { isIP } from "node:net";
import { InvalidIpAddress } from "../errors/InvalidIpAddress";
import { z } from "zod";

const IP_API_URL = "https://ipinfo.io";
const { IP_API_KEY } = import.meta.env;

const apiResponseSchema = z.object({
    ip: z.string().ip(),
    city: z.string().nonempty(),
    region: z.string().nonempty(),
    loc: z.string().min(4).includes(",").transform((loc) => {
        const location = loc.trim().split(",");

        return {
            latitude: location[0],
            longitude: location[1]
        }
    }),
    timezone: z.string().nonempty()
});

export type ApiResponseSchema = z.infer<typeof apiResponseSchema>;

export async function getCoordinatesByIpAdrress(ip: string): Promise<ApiResponseSchema> {
    if (isIP(ip) == 0) throw new InvalidIpAddress(ip);

    const response = await fetch(`${IP_API_URL}/${ip}?token=${IP_API_KEY}`);

    const data = await response.json();

    console.log(data);
    console.log("---------------------");

    return apiResponseSchema.parse(data);
}