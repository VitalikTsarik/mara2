import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Login.scss';

import { useAuth } from '../../../context/auth/AuthContext';
import { getHomeUrl } from '../../common/urls';

const loginValidation = yup.object().shape({
    username: yup
        .string()
        .required(),
    password: yup
        .string()
        .required(),
});

const Login = ({}) => {
    const {login} = useAuth();
    const history = useHistory();

    const [waiting, setWaiting] = useState(false);

    const handleSubmit = useCallback(async ({username, password}, {setStatus}) => {
        try {
            setWaiting(true);
            await login(username, password);
            history.push(getHomeUrl());
        } catch (e) {
            setStatus({submit: 'Invalid username or password'});
        } finally {
            setWaiting(false);
        }
    }, [login]);

    return (
        <div className={styles.login}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                {({handleSubmit, handleChange, values, errors, status}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={styles.form}>
                            <TextField
                                name={'username'}
                                variant={'outlined'}
                                helperText={errors.username}
                                label="Username"
                                fullWidth
                                onChange={handleChange}
                                value={values.email}
                                error={Boolean(errors.username)}
                            />
                            <TextField
                                name={'password'}
                                variant={'outlined'}
                                type="password"
                                helperText={errors.password}
                                label="Password"
                                fullWidth
                                onChange={handleChange}
                                value={values.password}
                                error={Boolean(errors.password)}
                            />
                            <div className={styles.submitBtn}>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    fullWidth
                                    size={'large'}
                                    onClick={handleSubmit}
                                >
                                    login
                                </Button>
                            </div>
                            {status && <FormLabel error>{status.submit}</FormLabel>}
                            {waiting && (
                                <CircularProgress
                                    className={styles.waiting}
                                    variant={'indeterminate'}
                                    color={'primary'}
                                />
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
