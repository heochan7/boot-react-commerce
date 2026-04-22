import styles from "./Header.module.css"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
function Header(){

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        logout();
    }
    
    return (
        <>
            <div className={styles.container}>
                {! user ?(
                    <>
                        <Link to="/login">login</Link>
                    </>
                ) : (
                    <>
                        <button onClick={handleLogout}>
                            logout
                        </button>
                        <p>{user.username}</p>
                    </>
                )}
            </div>
        </>
    )
}

export default Header;