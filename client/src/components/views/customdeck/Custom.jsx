import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function Custom({ setPageView }) {

  // {
  //   answers: [],
  //   questions: [],
  // }

  return (
    <>
      <div onClick={() => (setPageView('CustomDeck'))}>back to customdeck page</div>
      <div>custom cards</div>
    </>
  )
}