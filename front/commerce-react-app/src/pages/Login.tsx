import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); // 오타 수정

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 타입을 React.FormEvent로 변경
  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 에러 초기화 및 입력값 검증 (보안 및 사용자 경험)
    setError("");
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await login({ email, password });
      toast.success("로그인 성공!");
      navigate("/"); // 오타 수정
    } catch (err) {
      toast.error("이메일 혹은 비밀번호를 입력해주세요.");   
     }
  };

  return (
    <div className={styles.wrapper}>
      <Toaster /> {/* 팝업이 그려질 컨테이너 */}
      <form className={styles.form} onSubmit={submitLogin}>
        <div className={styles.container}>
          <h1 className={styles.title}>로그인</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input 
              className={styles.loginInput} 
              type="email" // text -> email로 변경하여 브라우저 기본 검증 활용
              id="email" 
              value={email} // 제어 컴포넌트로 관리
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input 
              className={styles.loginInput} 
              type="password"
              id="password" 
              value={password} // 제어 컴포넌트로 관리
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          {/* 에러 메시지 출력 영역 추가 */}
          {error && <p className={styles.errorText}>{error}</p>}

          <button className={styles.loginBtn} type="submit">login</button>
          <Link to="/join" className={styles.joinLink}>
            회원가입을 하셨나요?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;