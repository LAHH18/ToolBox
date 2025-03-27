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

    const logout=()=>{
        Cookies.remove("token");
        setIsthenticated(false);
        setUser(null);
    }

    //Borrar el error
    useEffect(()=>{
        if(errors.length>0){
            const timer = setTimeout(()=>{
                setErrors([])
            },3000)
            return ()=>clearTimeout(timer)
        }
    }, [errors]);   

    //Verufucacion login
    useEffect(()=>{
        async function checklogin(){
            const cookies = Cookies.get(); 
            if(!cookies.token){
                setIsthenticated(false);
                setLoading(false)
                return setUser(null);
            }
            //ejecuta la funciotn 
            try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data){
                    setIsthenticated(false);
                    setLoading(false);
                    return
                }
                
                setIsthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checklogin();
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
