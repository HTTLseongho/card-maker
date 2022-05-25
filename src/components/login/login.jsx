import React, {useEffect} from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./login.module.css";
import {useHistory} from "react-router-dom";

const Login = ({authService}) => {
    const history = useHistory(); // 다른 라우터로 갈 때는 history를 이용하면 된다.

    const goToMaker = userId => {
        history.push({
            pathname: '/maker',
            state: {id: userId},
        });
    };

    const onLogin = event => {
        authService //
            .login(event.currentTarget.textContent) //
            .then(data => goToMaker(data.user.uid)); // 로그인 된 데이터가 받아지면 goToMaker에 uid를 넘겨준다.
    };

    useEffect(() => {
        authService
            .onAuthChange(user => {
               user && goToMaker(user.uid);
            });
    });

    return (
        <section className={styles.login}>
            <Header/>
            <section>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>
                            Google
                        </button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>
                            Github
                        </button>
                    </li>
                </ul>
            </section>
            <Footer/>
        </section>
    );
};

export default Login;