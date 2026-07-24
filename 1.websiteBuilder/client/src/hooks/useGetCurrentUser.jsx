import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'

function useGetCurrentUser() {
    const dispatch=useDispatch()
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/me`,
                {withCredentials: true})
            dispatch(setUserData(result.data))
            setUser(result.data)
        } catch (error) {
            console.log("Error fetching user:", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    getCurrentUser()
 }, [])

 return { user, loading }
}

export default useGetCurrentUser
