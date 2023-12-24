
// material-ui
import { useTheme } from '@mui/material/styles';
import {  Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthRegister from '../auth-forms/AuthRegister';
import Logo from 'ui-component/Logo';


// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                      <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item  gap={1} sx={{ mb: 3,display:"flex",flexDirection:'raw', alignItems:'center'}}>
                    <Logo />
                  
                    <Grid item xs={12} sx={{ textTransform: "uppercase" }}>
        {/* "dowlladahahoose" in bold */}
        <Typography variant="body1" fontWeight="bold" sx={{ color: 'white',  paddingBottom: 0, margin: '0px' } }
             style={{
              paddingTop: 0,
              marginTop:0,
              margin: 0,
              paddingBottom: 0,
              marginBottom:0
            }}
        >
          dowlladahahoose
        </Typography>
        {/* "KGS" in bold and larger size */}
        <Typography
          variant={matchDownSM ? 'h2' : 'h1'}
          style={{
            paddingTop: 0,
            marginTop:0,
            margin: 0,
            padding:0
          }}
          fontWeight="bold"
          sx={{
            margin: '0px',
            fontSize: {
              xs: "4rem",
              sm: "4rem",
              md: '4.5rem',
              lg: '4.5rem'
            },
            color: 'white',
            paddingTop: 0,
          // Adjust margin to 0
          }}
        >
          KGS
        </Typography>
      </Grid>
      </Grid>
      </Grid>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography sx={{color:"white"}} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            create Master Acount
                          </Typography>
                          {/* <Typography variant="caption" sx={{color:"white"}} fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter your credentials to continue
                          </Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                  
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
