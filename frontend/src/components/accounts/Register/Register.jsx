import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Register.scss';

import { useAuth } from '../../../context/auth/AuthContext';
import { getHomeUrl } from '../../common/urls';

const loginValidation = yup.object().shape({
    username: yup
        .string()
        .max(150, 'Too long, buddy')
        .matches(/[a-zA-Z0-9@.+\-_]/, 'Username can only contain Latin letters, digits and @/./+/-/_ ')
        .required(),
    email: yup
        .string()
        .email('Email is invalid')
        .required(),
    password: yup
        .string()
        .min(6, 'Password is too short - should be at least 6 characters')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and digits.')
        .required(),
});

const Register = ({}) => {
    const {register} = useAuth();
    const history = useHistory();

    const [waiting, setWaiting] = useState(false);

    const handleSubmit = useCallback(async ({username, email, password}, {setStatus}) => {
        try {
            setWaiting(true);
            await register(username, email, password);
            history.push(getHomeUrl());
        } catch (e) {
            setStatus({submit: 'Something wrong. Try again later'});
        } finally {
            setWaiting(false);
        }
    }, [register]);

    return (
        <div className={styles.register}>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
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
                                value={values.username}
                                required
                                error={Boolean(errors.username)}
                            />
                            <TextField
                                name={'email'}
                                variant={'outlined'}
                                helperText={errors.email}
                                label="Email"
                                fullWidth
                                onChange={handleChange}
                                value={values.email}
                                required
                                error={Boolean(errors.email)}
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
                                required
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
                                    register
                                </Button>
                            </div>
                            {status && <FormLabel error>{status.submit}</FormLabel>}
                            {waiting && (
                                <CircularProgress
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

export default Register;
