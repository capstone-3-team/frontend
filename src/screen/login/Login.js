import React from 'react';
import { useRecoilState } from 'recoil';
import User from '../../state/User';

const Login = () => {

    const [user, setUser] = useRecoilState(User);
    // 로그인 상태 수정을 위한 Recoil state.

    const firstLogin = false;
    // 로그인 절차를 거친 뒤, 백엔드에서 유저가 첫번째로 로그인 한 것인지 여부를 파악하고 프로필 설정으로 갈지, 메인화면으로 갈지를 결정한다.

    return (
        <div>
            <p>Login screen here</p>
        </div>
    )
}

export default Login;