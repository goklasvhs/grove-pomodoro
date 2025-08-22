import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Herosection from "./Herosection";

const MyGarden = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Hero Section */}
            <Herosection />
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Button 
                    variant="contained" 
                    onClick={handleBackToHome}
                    size="large"
                     sx={{ width:'560px', maxWidth:'560px'}}
                >
                    Back to Timer
                </Button>
            </div>
        </div>
    );
};

export default MyGarden;