import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./StoreJoin.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function StoreJoin() {
  // 상태 관리
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    storeName: "",
    businessNum: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  // 공통 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.checkPassword) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }
    
    // 로직 처리 (API 호출 등)
    console.log("전송 데이터:", formData);
    toast.success("사업자 회원가입 신청이 완료되었습니다!");
  };

  return (
    <div className={styles.wrapper}>
      <Toaster position="top-center" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <h1 className={styles.title}>사업자 회원가입</h1>

          {/* 이름 & 휴대전화 */}
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">이름</label>
              <input
                type="text"
                id="username"
                placeholder="홍길동"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 상호명 & 사업자번호 (가로 배치로 길이 단축) */}
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="storeName">상호명</label>
              <input
                type="text"
                id="storeName"
                placeholder="매장 이름"
                value={formData.storeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="businessNum">사업자 번호</label>
              <input
                type="text"
                id="businessNum"
                placeholder="000-00-00000"
                value={formData.businessNum}
                onChange={handleChange}
                required
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* 비밀번호 & 비밀번호 확인 (가로 배치로 길이 단축) */}
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="8자 이상"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="checkPassword">비밀번호 확인</label>
              <input
                type="password"
                id="checkPassword"
                placeholder="재입력"
                value={formData.checkPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.joinBtn}>
            가입하기
          </button>
          <Link to={"/login"} className={styles.loginLink}>로그인 하기</Link>
        </div>
      </form>
    </div>
  );
}