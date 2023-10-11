import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import User1 from 'assets/images/users/user-round.svg';

 

  export const AccountProfile = ({values}) => (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={values.photo || User1}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {values.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
           {values.location}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {values.role}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );