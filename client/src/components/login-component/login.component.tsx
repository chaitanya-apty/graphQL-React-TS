import React, {useEffect, useState} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { getUserDetails } from '../../graphclient/queries/queries';

interface LoginState {
    username: string;
    password: string;
}

interface QLoginResponse {
    login : {
        token: string;
    }
}


const Login: React.FC = (props: any): JSX.Element => {
  const [error, setError] = useState('');
  const [getUser, { loading, data }] = useLazyQuery<QLoginResponse, LoginState>(getUserDetails, {
      fetchPolicy: 'no-cache',
      onError: ((er) => {
          setError('UserName or Password Error');
      })
  });

  function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = e.target as HTMLFormElement;
    getUser({
       variables : {
           username: formData['username'].value,
           password: formData['password'].value
       }
    });
  }

  useEffect(() => {
    const authDetails = data && data['login'];
    if(!authDetails || !Object.keys(authDetails).length){ return; }
      localStorage.setItem("TOKEN", authDetails.token);
      props.history.push('/emp');
   }, [data, loading, props.history])

  return (
    <div className=''>
            <form className='create-card w3-card w3-container w3-light-grey'
                onSubmit={loginUser}>
                <div className="field">
                    <label>Name:</label>
                    <input
                        required
                        name='username'
                        type="text"
                        className='w3-input w3-border w3-round'/>
                </div>

                <div className="field">
                    <label>Password:</label>
                    <input
                        required
                        type="password"
                        name='password'
                        className='w3-input w3-border w3-round'/>
                </div>
                <button
                    type='submit'
                    className='create-button w3-button w3-hover-orange w3-green'
                >Login User</button>
            </form>
               {error && <span 
                 style={{
                    color: 'red',
                    position: 'absolute',
                    left: '40em'
                }}>{error}</span>}
        </div>
  );
}

export default Login;
