import { useState } from "react";
import { useAuthContext } from "./useAuthContect";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(true)

    const res = await fetch ("http://localhost:4000/auth/register", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    })
    const data = await res.json()

    if (!res.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({type: 'LOGIN_SUCCESS', payload: data})
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error}
}