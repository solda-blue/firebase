import React, { useState } from "react";
// 파이어베이스 초기화하면서 들고온 auth
import { auth } from "../database/firebase";
//
import { createUserWithEmailAndPassword } from 'firebase/auth'

const LoginForm = () => {
    // input 태그에 있는 값을 가져오는 state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // react가 실행되는 동안에 저장될 user데이터
    // accessToken은 세션이나 브라우저에 저장해서 로그인확인
    // { email, uid, displayName }
    const [user, setUser] = useState(null);

    // 이메일 로그인 메소드
    const onEmailLogin = (e) => {
        e.preventDefault();
        // 구글에서 제공하는 이메일메소드 사용
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 회원가입 성공시
            const user = userCredential.user;
            console.log(user);
            setUser ({
                uid : user.uid,
                email : user.email,
                displayName : user.displayName,
            });
        })
        .catch((error) => {
            // 회원가입 실패 했을 시
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    }

    return (
        <div>
            <h3>Login Form</h3>
            <form onSubmit={onEmailLogin}>
                <label htmlFor="">이메일</label>
                <input onChange={(e) => {setEmail(e.target.value)}} type="email" value={email} />
                <br />
                <label htmlFor="">비밀번호</label>
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" value={password} />
                <br />
                <input type="submit" value="회원가입" />
            </form>
            <h3>{user ? user.email : "로그인되지 않았습니다."}</h3>
        </div>
    )
};

export default LoginForm;