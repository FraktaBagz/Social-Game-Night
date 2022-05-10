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
    <Grid container spacing={0} columns={3} columnSpacing={2} style={{ padding: 20 }} sx={{ bgcolor: '#e2e4f0', minHeight: '90vh' }}>
      <Grid item xs={2}>
        <Paper>
          body
        </Paper>
      </Grid>
      <Grid item xs={1}>
        <Paper sx={{ minHeight: '90vh' }}>
          chat
        </Paper>
      </Grid>
    </Grid>
  </Box>
  )
}

export default LobbyRestyle;