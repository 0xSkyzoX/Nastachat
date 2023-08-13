import { Constants } from "../contants";

export default async function verifyConv(id: string): Promise<Response> {
    const response = await fetch(`${Constants.API_BASE}/verify/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': "application/json"
        }
    })
    return response
}