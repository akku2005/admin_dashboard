// reset-password.js
import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from 'src/contexts/auth-context';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const ResetPassword = () => {
  const router = useRouter();
  const auth = useAuthContext();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'code', 'password'

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      code: Yup.string().when('submit', {
        is: true,
        then: Yup.string().required('Verification code is required'),
      }),
      newPassword: Yup.string().when('submit', {
        is: true,
        then: Yup.string().required('New password is required'),
      }),
      confirmPassword: Yup.string().when('submit', {
        is: true,
        then: Yup.string()
          .required('Confirm password is required')
          .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
      }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (currentStep === 'email') {
          // Generate and store a random code in local storage
          const verificationCode = generateRandomCode();
          localStorage.setItem('resetPasswordCode', verificationCode);

          // Move to the next step
          setCurrentStep('code');
        } else if (currentStep === 'code') {
          // Verify the entered code
          const storedCode = localStorage.getItem('resetPasswordCode');
          if (values.code !== storedCode) {
            throw new Error('Incorrect verification code');
          }

          // Move to the next step
          setCurrentStep('password');
        } else {
          // Verify passwords and perform password reset
          if (values.newPassword !== values.confirmPassword) {
            throw new Error('Passwords do not match');
          }

          // Retrieve token from query parameter
          const { token } = router.query;

          // Perform password reset
          await auth.resetPassword({ token }, { password: values.newPassword });

          // Set reset success flag
          setResetSuccess(true);
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message || 'Failed to reset password. Please try again.' });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Reset Password | Finteck Kit</title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Typography variant="h4">
              {currentStep === 'email' ? 'Reset Password' : currentStep === 'code' ? 'Verify Code' : 'Set New Password'}
            </Typography>
            {resetSuccess ? (
              <Alert severity="success" sx={{ mt: 3 }}>
                Password reset successful!
              </Alert>
            ) : (
              <form noValidate onSubmit={formik.handleSubmit}>
                {currentStep === 'email' && (
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email Address"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                    />
                  </Box>
                )}
                {currentStep === 'code' && (
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      error={!!(formik.touched.code && formik.errors.code)}
                      fullWidth
                      helperText={formik.touched.code && formik.errors.code}
                      label="Verification Code"
                      name="code"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.code}
                    />
                  </Box>
                )}
                {currentStep === 'password' && (
                  <>
                    <Box sx={{ mt: 3 }}>
                      <TextField
                        error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                        fullWidth
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                        label="New Password"
                        name="newPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.newPassword}
                      />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <TextField
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        fullWidth
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        label="Confirm Password"
                        name="confirmPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.confirmPassword}
                      />
                    </Box>
                  </>
                )}
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  {currentStep === 'email' ? 'Send Code' : currentStep === 'code' ? 'Verify Code' : 'Reset Password'}
                </Button>
                {currentStep === 'code' && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Go back to{' '} 
                    <a onClick={() => setCurrentStep('email')} style={{ cursor: 'pointer' ,color:"green" ,font:"30px"}}>
                      email verification
                    </a>
                  </Typography>
                )}
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

ResetPassword.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default ResetPassword;
