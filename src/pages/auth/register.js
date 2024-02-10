// import Head from 'next/head';
// import NextLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';
// import { Layout as AuthLayout } from 'src/layouts/auth/layout';

// const Page = () => {
//   const router = useRouter();
//   const auth = useAuth();
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       name: '',
//       password: '',
//       submit: null
//     },
//     validationSchema: Yup.object({
//       email: Yup
//         .string()
//         .email('Must be a valid email')
//         .max(255)
//         .required('Email is required'),
//       name: Yup
//         .string()
//         .max(255)
//         .required('Name is required'),
//       password: Yup
//         .string()
//         .max(255)
//         .required('Password is required')
//     }),
//     onSubmit: async (values, helpers) => {
//       try {
//         await auth.signUp(values.email, values.name, values.password);
//         router.push('/');
//       } catch (err) {
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }
//     }
//   });

//   return (
//     <>
//       <Head>
//         <title>
//           Register | Finteck Kit
//         </title>
//       </Head>
//       <Box
//         sx={{
//           flex: '1 1 auto',
//           alignItems: 'center',
//           display: 'flex',
//           justifyContent: 'center'
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 550,
//             px: 3,
//             py: '100px',
//             width: '100%'
//           }}
//         >
//           <div>
//             <Stack
//               spacing={1}
//               sx={{ mb: 3 }}
//             >
//               <Typography variant="h4">
//                 Register
//               </Typography>
//               <Typography
//                 color="text.secondary"
//                 variant="body2"
//               >
//                 Already have an account?
//                 &nbsp;
//                 <Link
//                   component={NextLink}
//                   href="/auth/login"
//                   underline="hover"
//                   variant="subtitle2"
//                 >
//                   Log in
//                 </Link>
//               </Typography>
//             </Stack>
//             <form
//               noValidate
//               onSubmit={formik.handleSubmit}
//             >
//               <Stack spacing={3}>
//                 <TextField
//                   error={!!(formik.touched.name && formik.errors.name)}
//                   fullWidth
//                   helperText={formik.touched.name && formik.errors.name}
//                   label="Name"
//                   name="name"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.name}
//                 />
//                 <TextField
//                   error={!!(formik.touched.email && formik.errors.email)}
//                   fullWidth
//                   helperText={formik.touched.email && formik.errors.email}
//                   label="Email Address"
//                   name="email"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   type="email"
//                   value={formik.values.email}
//                 />
//                 <TextField
//                   error={!!(formik.touched.password && formik.errors.password)}
//                   fullWidth
//                   helperText={formik.touched.password && formik.errors.password}
//                   label="Password"
//                   name="password"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   type="password"
//                   value={formik.values.password}
//                 />
//               </Stack>
//               {formik.errors.submit && (
//                 <Typography
//                   color="error"
//                   sx={{ mt: 3 }}
//                   variant="body2"
//                 >
//                   {formik.errors.submit}
//                 </Typography>
//               )}
//               <Button
//                 fullWidth
//                 size="large"
//                 sx={{ mt: 3 }}
//                 type="submit"
//                 variant="contained"
//               >
//                 Continue
//               </Button>
//             </form>
//           </div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <AuthLayout>
//     {page}
//   </AuthLayout>
// );

// export default Page;





import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import zxcvbn from "zxcvbn"; // Password strength estimation library
import { Box, Button, Link, Stack, Typography, LinearProgress } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  // State for password strength and suggestion
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    suggestions: [],
  });

  // Function to update password strength
  const updatePasswordStrength = (password) => {
    const result = zxcvbn(password);
    setPasswordStrength({
      score: result.score,
      suggestions: result.feedback.suggestions,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.name, values.password);
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Finteck Kit</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account?&nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

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
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    updatePasswordStrength(e.target.value);
                  }}
                  onChange={(e) => {
                    formik.handleChange(e);
                    updatePasswordStrength(e.target.value);
                  }}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {/* Password Strength Meter */}
              <div>
                <Typography
                  variant="body2"
                  color={getPasswordStrengthColor(passwordStrength.score)}
                >
                  Password Strength: {getPasswordStrengthLabel(passwordStrength.score)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(passwordStrength.score + 1) * 25}
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: "#e0f7fa", // Light green color
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#00e676", // Light green color
                    },
                  }}
                />
              </div>
              {/* Password Suggestions */}
              {passwordStrength.suggestions.length > 0 && (
                <div>
                  <Typography color="text.secondary" variant="body2">
                    Suggestions:
                  </Typography>
                  <ul>
                    {passwordStrength.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

// Helper functions for password strength label and color
const getPasswordStrengthLabel = (score) => {
  switch (score) {
    case 0:
      return "Very Weak";
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Strong";
    case 4:
      return "Very Strong";
    default:
      return "";
  }
};

const getPasswordStrengthColor = (score) => {
  switch (score) {
    case 0:
      return "error";
    case 1:
      return "error";
    case 2:
      return "warning";
    case 3:
      return "info";
    case 4:
      return "success";
    default:
      return "";
  }
};

export default Page;

