import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validate from '../utils/validations';
import CyBeerBarAPI from '../services/CyBeerBarAPI.service';
import constants from '../utils/constants.util';
import './style/register.css';

const { status_code: { CREATED } } = constants;

export default function Register() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const [status, setStatus] = useState([]);
  const [registerButtonState, setRegisterButton] = useState(false);

  const valueInput = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (user?.name !== '' || user?.email !== '' || user?.password) {
      const hasError = validate(user, 'register');
      setStatus(hasError);

      console.log(hasError, 'hasError');

      console.log(!hasError.every((field) => field));

      setRegisterButton(!hasError.every((field) => !field));
    }
  }, [user]);

  const addUser = async (event) => {
    event.preventDefault();
    const hasError = validate(user, 'register');
    const noError = hasError.every((err) => !err);

    if (noError) {
      await new CyBeerBarAPI().register({ ...user, role: 'customer' })
        .then((response) => {
          if (response.status === CREATED) {
            navigate('/customer/products');
          } else {
            setStatus([{
              type: 'error',
              message: `Erro: ${response.data?.message}`,
            }]);
          }
        });
    } else setStatus(hasError);
  };

  return (
    <div>
      <h1>Cadastro</h1>

      {console.log(status, 'status')}
      {(user?.name !== '' || user?.email !== '' || user?.password !== '')
        && status?.map((error, index) => (
          error?.type === 'success'
            ? <p key={ index } style={ { color: 'green' } }>{error?.message}</p>
            : (
              <p
                className="errorRegister"
                data-testid="common_register__element-invalid_register"
                key={ index }
              >
                {error?.message}
              </p>
            )
        ))}

      <section>
        <form onSubmit={ addUser }>
          <input
            type="text"
            data-testid="common_register__input-name"
            id="name"
            name="name"
            placeholder="Name"
            onChange={ valueInput }
            value={ user?.name }
          />
          <input
            type="email"
            data-testid="common_register__input-email"
            id="email"
            name="email"
            placeholder="your-email@site.com.br"
            onChange={ valueInput }
            value={ user?.email }
          />
          <input
            type="password"
            data-testid="common_register__input-password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={ valueInput }
            value={ user?.password }
          />
          <div>
            <button
              className="btnRegister"
              data-testid="common_register__button-register"
              type="submit"
              disabled={ registerButtonState }
            >
              Cadastrar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
