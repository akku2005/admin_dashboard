// pages/mail.js
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";


const Mail = () => (
  <>
    <Head>
      <title>Mail | Finteck Kit</title>
    </Head>
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Display Mail List */}
            {/* <MailList /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Compose Mail Section */}
            {/* <MailList/> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Mail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Mail;
