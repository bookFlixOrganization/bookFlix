import React from 'react';

const AuthPage = () => {
    return (
        <div className="wrapper">
            <span className="bg-animate"></span>
            <span className="bg-animate2"></span>

            <div className="form-box login">
                <h2 className="animation" style="--i:0; --j:21;">
                    Login
                </h2>
                <form action="#">
                    <div className="input-box animation" style="--i:1; --j:22;">
                        <input id="in-username" type="text" required />
                        <label htmlFor="in-username">Username</label>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box animation" style="--i:2; --j:23;">
                        <input id="in-password" type="password" required />
                        <label htmlFor="in-password">Password</label>
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="mailing-forgot animation" style="--i:3; --j:24;">
                        <a href="/">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn animation" style="--i:3; --j:24;">
                        Login
                    </button>
                    <div className="logreg-link animation" style="--i:4; --j:25;">
                        <p>
                            Don`&#39;`t have an account?{' '}
                            <a href="/" className="register-link">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            <div className="info-text login">
                <h2 className="animation" style="--i:0; --j:20;">
                    Welcome to the BookFlix!
                </h2>
                <p className="animation" style="--i:1; --j:21;"></p>
            </div>

            <div className="form-box register">
                <h2 className="animation" style="--i:17; --j:0;">
                    Sign Up
                </h2>
                <form action="#">
                    <div className="input-box animation" style="--i:18; --j:1;">
                        <input id="up-username" type="text" required />
                        <label htmlFor="up-username">Username</label>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box animation" style="--i:19; --j:2;">
                        <input id="up-email" type="text" required />
                        <label htmlFor="up-email">E-mail</label>
                        <i className="bx bxs-envelope"></i>
                    </div>
                    <div className="input-box animation" style="--i:20; --j:3;">
                        <input id="up-password" type="password" required />
                        <label htmlFor="up-password">Password</label>
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="mailing-forgot animation" style="--i:21; --j:4;">
                        <label htmlFor="notifications">
                            <input id="notifications" type="checkbox" />
                            Receive e-mail notifications
                        </label>
                    </div>
                    <button type="submit" className="btn animation" style="--i:21; --j:4;">
                        Sign Up
                    </button>
                    <div className="logreg-link animation" style="--i:22; --j:5;">
                        <p>
                            Already have an account?{' '}
                            <a href="/" className="login-link">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            <div className="info-text register">
                <h2 className="animation" style="--i:17; --j:0;">
                    Welcome to the BookFlix!
                </h2>
                <p className="animation" style="--i:18; --j:1;"></p>
            </div>
        </div>
    );
};

export default AuthPage;
