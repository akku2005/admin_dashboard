// import React, { useState } from 'react';
// import { Box, Typography, TextField, Button, CircularProgress, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useFormik } from 'formik';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// const FileUploadPage = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       file: null,
//     },
//     onSubmit: async (values) => {
//       const { title, description, file } = values;

//       if (!title.trim() || !description.trim()) {
//         toast.error('Title and Description are required.', {
//           position: 'top-center',
//         });
//         return;
//       }

//       if (file) {
//         formik.setSubmitting(true);

//         try {
//           const formData = new FormData();
//           formData.append('files', file);

//           const response = await axios.post('http://localhost:8080/v1/upload/s3', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           // Log file details to the console
//           // console.log('File details:', response.data);

//           // Store only the file name in local storage
//           localStorage.setItem('uploadedFileName', file.name);

//           // Set success message and show a toast in the center of the screen
//           toast.success('File uploaded successfully!', {
//             position: 'top-center',
//           });

//           // Reset the form
//           formik.resetForm();
//         } catch (error) {
//           console.error('Error uploading file:', error);

//           // Set error message and show a toast in the center of the screen
//           toast.error('Error uploading file. Please try again.', {
//             position: 'top-center',
//           });
//         } finally {
//           formik.setSubmitting(false);
//         }
//       }
//     },
//   });

//   const handleFileDelete = (index) => {
//     const updatedFiles = [...selectedFiles];
//     updatedFiles.splice(index, 1);
//     setSelectedFiles(updatedFiles);
//     formik.setFieldValue('file', null);
//   };

//   const handleFileSelect = (event) => {
//     const file = event.currentTarget.files[0];
//     formik.setFieldValue('file', file);
//     setSelectedFiles([...selectedFiles, file]);
//   };

//   const handleAddMoreFiles = () => {
//     // Add logic to handle adding more files if needed
//   };

//   return (
//     <Box
//       style={{
//         marginLeft: '10%',
//         marginRight: '10%',
//         marginTop: '10%',
//         marginBottom: '10%',
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         File Upload
//       </Typography>

//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Title :"
//           fullWidth
//           name="title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           margin="normal"
//         />

//         <TextField
//           label="Description :"
//           fullWidth
//           multiline
//           rows={4}
//           name="description"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           margin="normal"
//         />

// <div style={{ marginBottom: '20px' }}>
//   <label>
//     <input
//       type="file"
//       name="file"
//       onChange={handleFileSelect}
//       accept=".pdf, .doc, .docx, .jpeg"
//       style={{ display: 'none' }}
//     />
//     <Button
//       variant="outlined"
//       component="span"
//       style={{ marginBottom: '20px' }}
//     >
//       + Select File
//     </Button>
//   </label>
// </div>

//         {selectedFiles.map((file, index) => (
//           <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//             <Typography>{file.name}</Typography>
//             <IconButton
//               color="secondary"
//               onClick={() => handleFileDelete(index)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         ))}

//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           type="submit"
//           disabled={!formik.values.file || formik.isSubmitting}
//           style={{ marginBottom: '20px' }}
//         >
//           {formik.isSubmitting ? <CircularProgress size={24} /> : 'Upload'}
//         </Button>
//       </form>

//       {/* React-Toastify Container */}
//       <ToastContainer position="top-center" />
//     </Box>
//   );
// };

// export default FileUploadPage;





import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const ThreeStepProcess = ({
  setStep,
  step,
  files,
  setFiles,
  clientName,
  setClientName,
  userEmail,
  setUserEmail,
}) => {
  const [filesSelected, setFilesSelected] = useState(false);

  useEffect(() => {
    setFilesSelected(files.length > 0);
  }, [files]);

  const handleFileChange = (e) => {
    let selectedFiles;

    if (e.target.files) {
      selectedFiles = Array.from(e.target.files);
    } else if (e.dataTransfer.items) {
      selectedFiles = Array.from(e.dataTransfer.items).map((item) =>
        item.getAsFile()
      );
    } else {
      selectedFiles = Array.from(e.dataTransfer.files);
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const formik = useFormik({
    initialValues: {
      clientName: "",
      userEmail: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().when("filesSelected", {
        is: true,
        then: Yup.string().required("Client Name is required"),
      }),
      userEmail: Yup.string().when("filesSelected", {
        is: true,
        then: Yup.string().email("Invalid email address").required("User Email is required"),
      }),
    }),
    onSubmit: (values) => {
      setClientName(values.clientName);
      setUserEmail(values.userEmail);
      setStep(step + 1);
    },
  });

  const handleProceed = async () => {
    await formik.validateForm();

    if (step === 1 && filesSelected) {
      if (!formik.errors.clientName) {
        setStep(step + 1);
      } else {
        toast.error("Please fill in all required fields to proceed");
      }
    } else if (step === 2) {
      if (!formik.errors.clientName && !formik.errors.userEmail) {
        setStep(step + 1);
      } else {
        toast.error("Please fill in all required fields to proceed");
      }
    } else if (!filesSelected) {
      toast.error("Please select a file to proceed");
    }
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    setStep(1);
    setFiles([]);
    setClientName("");
    setUserEmail("");
  };

  const handleSend = async () => {
    try {
      console.log('Formik Values:', formik.values);
  
      const formData = new FormData();
      formData.append('userEmail', formik.values.userEmail);
  
      console.log('FormData Before Fetch:', formData);
  
      const response = await fetch('http://localhost:8080/v1/send-email', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response:', response);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error sending files:', errorData);
        toast.error(`Error sending files: ${errorData.message}`);
      } else {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
  
        if (responseData && responseData.userEmail) {
          toast.success(`Files sent successfully to the recipient's email: ${responseData.userEmail}`);
        } else {
          toast.success('Files sent successfully');
        }
      }
    } catch (error) {
      console.error('Error sending files:', error);
      toast.error('Error sending files. Please try again later.');
    }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label htmlFor="file-input">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileChange(e);
                }}
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  border: "2px dashed #ccc",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Typography variant="body1">Drag & Drop or Click to Choose Files</Typography>
              </div>
            </label>
            {files.length > 0 && (
              <Box mt={2}>
                {files.map((file, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <Typography variant="body1">{file.name}</Typography>
                    <IconButton onClick={() => handleRemoveFile(index)} color="primary">
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              multiple
              accept=".pdf, .doc, .docx, .jpeg"
              style={{ display: "none" }}
            />
            <Button variant="contained" onClick={handleProceed}>
              Proceed
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Client Name"
                fullWidth
                value={formik.values.clientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="clientName"
                error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                helperText={formik.touched.clientName && formik.errors.clientName}
                margin="normal"
              />
              <TextField
                label="User Email"
                fullWidth
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="userEmail"
                error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                helperText={formik.touched.userEmail && formik.errors.userEmail}
                margin="normal"
              />
              <Box display="flex" justifyContent="flex-end" gap="20px" mt={4}>
                <Button variant="contained" onClick={handleGoBack}>
                  Go back
                </Button>
                <Button type="submit" variant="contained" disabled={!formik.isValid}>
                  Next
                </Button>
              </Box>
            </form>
          </div>
        );
      case 3:
        return (
          <div>
            {files.map((file, index) => (
              <Typography key={index} paragraph>
                File {index + 1}: {file.name}
              </Typography>
            ))}
            <Typography paragraph>Client Name: {clientName}</Typography>
            <Typography paragraph>User Email: {userEmail}</Typography>
            <Button variant="contained" onClick={handleCancel} style={{ marginRight: "10px" }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSend} style={{ color: "white" }}>
              Send
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

const FileUploadPage = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [clientName, setClientName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Assuming you have a way to get the logged-in user's email

  return (
    <Box
      style={{
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "10%",
        marginBottom: "10%",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ marginBottom: "25px" }}>
        File Upload
      </Typography>

      <Stepper activeStep={step} alternativeLabel style={{ marginBottom: "20px" }}>
        <Step key="Upload">
          <StepLabel>Upload Files</StepLabel>
        </Step>
        <Step key="EnterInfo">
          <StepLabel>Enter Client Information</StepLabel>
        </Step>
        <Step key="Review">
          <StepLabel>Review Information</StepLabel>
        </Step>
      </Stepper>

      <ThreeStepProcess
        setStep={setStep}
        step={step}
        files={files}
        setFiles={setFiles}
        clientName={clientName}
        setClientName={setClientName}
        userEmail={userEmail} // Pass the logged-in user's email
        setUserEmail={setUserEmail}
      />
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default FileUploadPage;
