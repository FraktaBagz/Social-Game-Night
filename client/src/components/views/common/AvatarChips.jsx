  import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AvatarChipWaiting = ({ user }) => {
  return (
    <Box>
      <Card sx={{ p: 2.5, borderRadius: 9, width: 325, display: 'inline-flex', }}>
        <CheckCircleOutlineIcon sx={{ fontSize: '60px', pr: 1 }} color='info' />
        <Avatar
          src={user ? user.avatar : 'https://www.kindpng.com/picc/m/289-2891537_nintendo-fanon-wiki-wii-mii-hd-png-download.png'}
          sx={{ width: 56, height: 56 }}
        />
        <Box sx={{ width: '100%' }}>
          <Box component={Stack} direction="column" justifyContent="center" sx={{ pl: 2 }}>
            <Typography variant='h6'>
              {user ? user.name : 'Guest'}
            </Typography>
            <Typography variant='subtitle1'>
              <i>{user ? user.title : 'The Neophyte'}</i>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>

  )
}

const AvatarChipPicking = ({ user, picking, score }) => {
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  let visibleScore = zeroPad(score, 2) || '00'; // change to props when avatar available
  const [isPicking, setIsPicking] = useState(picking);
  return (
    <Box>
      <Card sx={{ p: 2.5, borderRadius: 9, width: 325, display: 'inline-flex', }}>
        { isPicking ? <AccessTimeIcon sx={{ fontSize: '60px', pr: 1 }} color='secondary'/> : <CheckCircleOutlineIcon sx={{ fontSize: '60px', pr: 1 }} color='info' /> }
        <Avatar
          src={user ? user.avatar : 'https://www.kindpng.com/picc/m/289-2891537_nintendo-fanon-wiki-wii-mii-hd-png-download.png'}
          sx={{ width: 56, height: 56 }}
        />
        <Box sx={{ width: '100%' }}>
          <Box component={Stack} direction="column" justifyContent="center" sx={{ pl: 2 }}>
            <Typography variant='h6'>
              {user ? user.name : 'Guest'}
            </Typography>
            <Typography variant='subtitle1'>
              <i>{user ? user.title : 'The Neophyte'}</i>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant='h3'>{visibleScore}</Typography>
        </Box>
      </Card>
    </Box>

  )
}

export { AvatarChipPicking, AvatarChipWaiting, };