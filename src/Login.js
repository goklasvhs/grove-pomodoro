import React from "react";
import { TextField, Typography, Button } from "@mui/material";
import googleLogo from 'C:/Users/andre/testing/myapp/src/components/google-logo.webp';

const Login = ({ setCurrentPage }) => {
    
    const goToHome = () => {
        setCurrentPage('home');
    };

    return (
        <div className="login-card" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '20px', textAlign: 'center' }}>
                Log in with
            </Typography>
            
            <div className="googleButton">
                <Button 
                variant="contained" 
                color="inherit"
                style={{ width:'100%'}} >
                    <img src={googleLogo} 
                    style={{width:'32px', height:'32px'}}  /> Google</Button>
            </div>

            <p style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
                or
            </p>

            <TextField 
                label="Email" 
                variant="outlined" 
                type="email" 
                placeholder="Email address" 
                required
                fullWidth
                style={{ marginBottom: '20px' }}
            />

            <TextField 
                label="Password" 
                variant="outlined" 
                type="password" 
                placeholder="Password" 
                required
                fullWidth
                style={{ marginBottom: '20px' }}
            />

            <Button 
                variant="contained" 
                fullWidth 
                style={{ marginBottom: '10px', padding: '12px' }}
            >
                Log In
            </Button>

            <Button 
                variant="text" 
                fullWidth 
                onClick={goToHome}
                style={{ color: '#1976D2' }}
            >
                Saya belum punya akun
            </Button>
        </div>
    );
}

export default Login;