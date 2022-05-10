import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const LobbyRestyle = () => {
  // bgcolor="primary.main" sx={{ minHeight: '90vh' }}
  return (
  <Box bgcolor="primary.main">
    <Grid container spacing={0} style={{ padding: 20 }} sx={{ bgcolor: '#e2e4f0', minHeight: '90vh' }}>
      <Grid item xs={8}>
        <Box>
          body
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ minHeight: '90vh' }}>
          <Paper>
            chat
          </Paper>
        </Box>
      </Grid>
    </Grid>
  </Box>
  )
}

export default LobbyRestyle;