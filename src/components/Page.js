import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';

const MailPage = () => {
  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      subject: '',
      message: '',
      attachments: [],
    },
    onSubmit: async (values) => {
      const { from, to, subject, message, attachments } = values;

      if (!from.trim() || !to.trim() || !subject.trim() || !message.trim()) {
        toast.error('From, To, Subject, and Message are required.', {
          position: 'top-center',
        });
        return;
      }

      formik.setSubmitting(true);

      try {
        const formData = new FormData();
        formData.append('from', from);
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('message', message);
        attachments.forEach((attachment) => {
          formData.append('attachments', attachment);
        });

        const response = await axios.post(
          'http://localhost:8080/v1/mail',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Set success message and show a toast in the center of the screen
        toast.success('Mail sent successfully!', {
          position: 'top-center',
        });

        // Reset the form
        formik.resetForm();
      } catch (error) {
        console.error('Error sending mail:', error);

        // Set error message and show a toast in the center of the screen
        toast.error('Error sending mail. Please try again.', {
          position: 'top-center',
        });
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const handleAttachmentChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue('attachments', [
      ...formik.values.attachments,
      ...files,
    ]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...formik.values.attachments];
    newAttachments.splice(index, 1);
    formik.setFieldValue('attachments', newAttachments);
  };

  return (
    <Box
      style={{
        margin: '10%',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Compose Mail
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="From"
          fullWidth
          name="from"
          value={formik.values.from}
          onChange={formik.handleChange}
          margin="normal"
          aria-label="From"
          required
        />

        <TextField
          label="To"
          fullWidth
          name="to"
          value={formik.values.to}
          onChange={formik.handleChange}
          margin="normal"
          aria-label="To"
          required
        />

        <TextField
          label="Subject"
          fullWidth
          name="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          margin="normal"
          aria-label="Subject"
          required
        />

        <TextField
          label="Message"
          fullWidth
          multiline
          rows={6}
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          margin="normal"
          aria-label="Message"
          required
        />

        <Box sx={{ mt: 2 }}>
          <input
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
            id="attachment"
            multiple
            type="file"
            onChange={handleAttachmentChange}
          />
          <label htmlFor="attachment">
            <Button
              variant="contained"
              component="span"
              startIcon={<AttachFileIcon />}
            >
              Attach File
            </Button>
          </label>
          {formik.values.attachments.map((file, index) => (
            <Paper key={index} elevation={0} sx={{ mt: 1, p: 1, display: "flex", alignItems: "center" }}>
              <Typography variant="body2">{file.name}</Typography>
              <IconButton
                aria-label="remove"
                onClick={() => handleRemoveAttachment(index)}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={formik.isSubmitting}
          style={{ marginTop: '20px' }}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : 'Send Mail'}
        </Button>
      </form>

      {/* React-Toastify Container */}
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default MailPage;
