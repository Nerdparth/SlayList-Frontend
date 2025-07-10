import { useState } from "react"
import { refreshAccessToken } from "../auth/refreshToken"
const hostUrl = import.meta.env.VITE_API_BASE_URL;

const useGetProfileDetails = () => {
    const [getProfileDetailsResponse, setGetProfileDetailsResponse] = useState(null)
    const getProfileDetails = async () => {
        let res = await fetch(`${hostUrl}/profile-info`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("access")}`
            }
        })
        if (res.status === 400 || res.status === 403){
            const accessToken = await refreshAccessToken()
            if (!accessToken){
                getProfileDetails({"error" : "login again, all tokens expired"})
                return;
            }
            res = await fetch(`${hostUrl}/profile-info`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("access")}`
            }
        })
        }
        const data = await res.json()
        setGetProfileDetailsResponse(data)
    }
    return {getProfileDetails, getProfileDetailsResponse}
}
export default useGetProfileDetails