import { useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';


const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const router = useRouter()
    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/") 
        }
    }, [isAuthenticated])
    let authenticated = isAuthenticated;
    return <>{authenticated ? children : navigate('/')}</>;
}

export default AuthGuard
