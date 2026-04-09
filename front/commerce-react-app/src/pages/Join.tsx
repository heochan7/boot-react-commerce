import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Join.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(""); // 오타 수정: Passowrd -> Password

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 간단한 유효성 검사 예시
    if (password !== checkPassword) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }

    if (password.length < 8) {
      return toast.error("비밀번호는 8자 이상이어야 합니다.");
    }

    try {
      await register({ email, password, username });
      toast.success("환영합니다!");
    } catch (err: any) {
      if (err.response?.status === 409) { // 409: Conflict (이미 존재하는 데이터)
        toast.error("이미 사용 중인 이메일입니다.");
      } else {
        toast.error("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Toaster />
      <form className={styles.form} onSubmit={handleJoin}>
        <div className={styles.container}>
          <h1 className={styles.title}>회원가입</h1>

          {/* 이름 & 휴대전화 (한 줄 배치) */}
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">이름</label>
              <input
                type="text"
                id="username"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">
                휴대전화 <span className={styles.optional}>(선택)</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="8자 이상 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.inputGroup}>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="비밀번호 재입력"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
            />
          </div>

          {/* 가입 버튼 */}
          <button type="submit" className={styles.joinBtn}>
            가입하기
          </button>

          <Link className={styles.loginLink} to="/login">
            회원이신가요?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Join;