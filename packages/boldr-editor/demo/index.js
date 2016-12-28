import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Demo from './demo';

const MOUNT_POINT = document.getElementById('app');

 render(
   <AppContainer>
     <Demo />
   </AppContainer>,
   MOUNT_POINT
 );
