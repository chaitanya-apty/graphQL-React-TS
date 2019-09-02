import React, {useState} from 'react';


interface LoginState {
    username: string;
    password: string;
}

const defaultUserState: LoginState = {
    username: '',
    password: ''
};

function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
}

const Login: React.FC = (props: any): JSX.Element => {
  const [user, setLoginDetails] = useState(defaultUserState);

  console.log('Login Props', props)
  return (
    <div className='create__employee'>
            <form className='create-card w3-card w3-container w3-light-grey'
                onSubmit={loginUser}>
                <div className="field">
                    <label>Name:</label>
                    <input
                        required
                        type="text"
                        className='w3-input w3-border w3-round'
                        onChange={(e) => setLoginDetails({...user, username: e.target.value})} />
                </div>

                <div className="field">
                    <label>Age:</label>
                    <input
                        required
                        type="password"
                        className='w3-input w3-border w3-round'
                        onChange={(e) => setLoginDetails({...user, password: e.target.value})} />
                </div>
                <button
                    type='submit'
                    className='create-button w3-button w3-hover-orange w3-green'
                >Login User</button>
            </form>
        </div>
  );
}

export default Login;
