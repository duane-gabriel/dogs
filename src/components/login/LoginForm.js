import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../forms/Button';
import Input from '../forms/Input';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';
import TokenPost from '../../services/endpoints/TokenPost';
import { UserContext } from '../../UserContext';
import Error from '../helper/Error';
import styles from './LoginForm.module.css';
import styleBtn from '../forms/Button.module.css';
import Head from '../helper/Head';

export default function LoginForm() {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username.validate() && !password.validate()) {
      return;
    }

    userLogin(username.value, password.value);
  }

  return (
    <section className='animeLeft'>
      <Head title='Login' description='Crie sua conta' />
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label='Usuário' type='text' name='username' {...username} />
        <Input label='Senha' type='password' name='password' {...password} />

        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && <Error error={error && 'Dados incorretos.'} />}
      </form>
      <Link className={styles.lost__password} to='/login/perdeu'>
        Perdeu a Senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={styleBtn.button} to='/login/criar'>
          Cadastro
        </Link>
      </div>
    </section>
  );
}
