import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js"; 
import  Cookies  from "js-cookie"

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context;
}

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated, setIsthenticated] = useState(false);
    const [errors, setErrors] = useState([]);  
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
          const res = await registerRequest(user);
          console.log(res.data);
          setUser(res.data);
          setIsthenticated(true);
        } catch (error) {
          setErrors(error.response.data);
          throw error; 
        }
      };
    
    const signin = async (user)=>{
        try{
            const res = await loginRequest(user);
            console.log(res);
            setIsthenticated(true); // Actualiza la autenticación
            setUser(res.data); // Guarda los datos del usuario
        }catch (error){
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]); 
        }
    }

    // En tu función logout:
    const logout = () => {
        Cookies.remove("token", {
            path: "/",
            domain: "tool-box-blond.vercel.app"
        });
        setIsAuthenticated(false);
        setUser(null);
        window.location.reload(); // Fuerza limpieza
    };

    //Borrar el error
    useEffect(()=>{
        if(errors.length>0){
            const timer = setTimeout(()=>{
                setErrors([])
            },3000)
            return ()=>clearTimeout(timer)
        }
    }, [errors]);   

    useEffect(() => {
        async function checkLogin() {
            try {
                // Obtiene la cookie correctamente
                const token = Cookies.get('token');
                
                if (!token) {
                    setIsthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }
    
                // Verifica el token con el backend
                const res = await verifyTokenRequest();
                
                if (res.data) {
                    setIsthenticated(true);
                    setUser(res.data);
                } else {
                    throw new Error("Token inválido");
                }
            } catch (error) {
                console.error("Error en checkLogin:", error);
                // Limpia la cookie si es inválida
                Cookies.remove('token', {
                    path: '/',
                    domain: window.location.hostname.includes('vercel.app') 
                        ? '.vercel.app' 
                        : undefined
                });
                setIsthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            signup,
            signin,
            loading,
            user, 
            setUser,
            logout,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
