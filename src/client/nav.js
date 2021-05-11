import React from 'react';
import AuthButton from './auth/authButton';
import AppBar from "@material-ui/core/AppBar"
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default () => (
    <AppBar position='static' color="primary">
        <ToolBar>
            <Typography variant='h6'>
                Where was I?
            </Typography>
            <AuthButton />
        </ToolBar>
    </AppBar>
)