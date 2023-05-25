import React, { useState } from "react";
// 파이어베이스 초기화하면서 들고온 auth
import { auth } from "../database/firebase";
//
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../store";

const LoginForm = () => {
    // input 태그에 있는 값을 가져오는 state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // react가 실행되는 동안에 저장될 user데이터
    // accessToken은 세션이나 브라우저에 저장해서 로그인확인
    // { email, uid, displayName }
    const [user, setUser] = useState(null);

    // 이메일 회원가입 메소드
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
            alert('회원가입이 완료되었습니다. 로그인 하십시요');

        })
        .catch((error) => {
            // 회원가입 실패 했을 시
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    // 이메일 로그인 메소드
    const handleLogin = () => {
       // async와 await를 이용하여 파이어베이스메소드 사용
       // 비동기 함수로 만들기
       getLogin();
       async function getLogin() {
        // 오류가 날 가능성이 있는 모든 코드를 try에 작성
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('getLogin =>', user);
            sessionStorage.setItem("TOKEN", user.accessToken);
            sessionStorage.setItem("UID", user.uid);
            dispatch(setLogin());
            navigate('/');
            alert('로그인 되었습니다.');
        }
        // 오류가 났을 때 실행할 코드
        // 오류가 나면 화면이 멈추는 것이 아니라
        // catch를 실행하고 다른 아래쪽의 코드를 실행
        catch(error) {
            console.log( error.code, error.message);
        }
       }
    };

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
                <button type="button" onClick={ handleLogin }>로그인</button>
            </form>
            <h3>{user ? user.email : "로그인되지 않았습니다."}</h3>
        </div>
    )
};

export default LoginForm;