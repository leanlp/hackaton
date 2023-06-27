import React from 'react'
import {Stack, Avatar, Typography} from '@mui/material';


function UserProfile() {
  return (
    <Stack direction="row" display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
      <Typography>Nombre de Usuario</Typography>
       <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  )
}

export default UserProfile