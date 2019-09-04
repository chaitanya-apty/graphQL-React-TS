import React, {useState, useEffect} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { getUserDetails } from '../../graphclient/queries/queries';
import { memHistory } from '../../common/router-helpers/router';


interface LoginState {
    username: string;
    password: string;
}

const defaultUserState: LoginState = {
    username: '',
    password: ''
};

const Login: React.FC = (props: any): JSX.Element => {
  const [user, setLoginDetails] = useState(defaultUserState);
  const [getUser, { loading, data }] = useLazyQuery(getUserDetails);

  function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = e.target as HTMLFormElement;
    getUser({
       variables : {
           username: formData['username'].value,
           password: formData['password'].value
       },
    });
  }

  useEffect(() => {
    const authDetails = data && data['login'];
    if(!authDetails || !Object.keys(authDetails).length){ return; }
      localStorage.setItem("TOKEN", authDetails.token);
      memHistory.push('/emp');
   }, [data, loading])

  useEffect(() => {

  }, [loading,data])
  return (
    <div className='create__employee'>
            <form className='create-card w3-card w3-container w3-light-grey'
                onSubmit={loginUser}>
                <div className="field">
                    <label>Name:</label>
                    <input
                        required
                        name='username'
                        type="text"
                        className='w3-input w3-border w3-round'
                        onChange={(e) => setLoginDetails({...user, username: e.target.value})} />
                </div>

                <div className="field">
                    <label>Password:</label>
                    <input
                        required
                        type="password"
                        name='password'
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
