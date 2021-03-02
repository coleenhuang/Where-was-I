import { TokenExpiredError } from 'jsonwebtoken';
import React from 'react';
import LogButton from './auth/logButton';

export default () => (
    <nav>
        <h1>Where was I?</h1>
        <LogButton />
    </nav>
)