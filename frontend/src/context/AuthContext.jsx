import { useEffect, useState, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    // Estado para manejar la carga inicial
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    // Funciona una vez al iniciar el componente
    useEffect( () => {
      const token = localStorage.getItem("access")
      const username = localStorage.getItem("username")
      const isStaff = localStorage.getItem("is_staff") === "true"

      if (token){
        setUser({username, isStaff})
      }
      setLoading(false)
    },[])

    // Funcion para inicar sesion
    const login = ({access, username, is_staff, refresh}) => {
      localStorage.setItem("access", access)
      localStorage.setItem("username", username)
      localStorage.setItem("is_staff", is_staff)
      localStorage.setItem("refresh", refresh)

      setUser({username: username, isStaff: is_staff === true})
    }

    // Funcion para cerrar sesion
    const logout = () => {
      localStorage.clear()
      setUser(null)
      navigate("/")
    }

  return (
    <AuthContext.Provider value={{user, login, logout, loading}}>
      { !loading && children }
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};