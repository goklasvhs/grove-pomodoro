import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

// ❌ HAPUS BARIS-BARIS INI:
// import defaultImage from './components/default.png';
// import sadImage from './components/sad.png';
// import focusImage from './components/focus.png';

// Component untuk LinearProgress dengan label
function LinearProgressWithLabel({ value }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress 
                    variant="determinate" 
                    value={value} 
                    sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            backgroundColor: value < 30 ? '#f44336' : value < 50 ? '#ff7043' : value < 70 ? '#ffa726' : '#4caf50'
                        }
                    }}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function Herosection() {
    const [alertOpen, setAlertOpen] = useState(true);
    const [progress, setProgress] = useState(35); // Default progress value
    
    // ✅ Ubah function ini untuk menggunakan path public
    const getTomatoImage = () => {
        return progress >= 50 ? "/components/default.png" : "/components/sad.png";
    };
    
    // Function to get tomato status message
    const getTomatoStatus = () => {
        if (progress >= 80) return "Your tomato is thriving! 🌟";
        if (progress >= 50) return "Your tomato is healthy and happy! 😊";
        if (progress >= 20) return "Your tomato needs more attention... 😔";
        return "Your tomato is in critical condition! ⚠️";
    };
    
    // Function to get health bar color
    const getHealthColor = () => {
        if (progress >= 70) return '#008C15'; // Green
        if (progress >= 50) return '#FF8F1C'; // Orange
        if (progress >= 30) return '#EE2737'; // Light Red
        return '#EE2737'; // Red
    };

    return (
        <div className='heroSectionContainer' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '12px',
            margin: '20px 0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            {/* Header */}
            <Typography variant="h4" component="h3" sx={{ 
                marginBottom: '10px',
                color: '#303135',
                fontWeight: 'bold'
            }}>
                Your Tomato
            </Typography>
            
            {/* Tomato Status Message */}
            <Typography variant="body1" sx={{ 
                marginBottom: '20px',
                color: progress >= 50 ? '#008C15' : '#EE2737',
                fontWeight: 'medium',
                textAlign: 'center'
            }}>
                {getTomatoStatus()}
            </Typography>

            {/* Plant Image */}
            <div className='content' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <img 
                    src={getTomatoImage()} 
                    alt={progress >= 50 ? "Happy Tomato" : "Sad Tomato"}
                    style={{
                        width: '240px', 
                        height: '240px',
                        borderRadius: '50%',
                        border: `4px solid ${getHealthColor()}`,
                        objectFit: 'cover',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease'
                    }} 
                />
            </div>

            {/* Health Progress */}
            <div className='tomatoHealth' style={{
                width: '100%',
                maxWidth: '400px',
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="h6" sx={{ 
                    marginBottom: '15px',
                    color: '#424242',
                    textAlign: 'center'
                }}>
                    Tomato Health
                </Typography>
                <LinearProgressWithLabel value={progress} />
                
                {/* Progress Actions - For testing purposes */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '15px'
                }}>
                    <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                        Skip Session (-10%)
                    </Button>
                    <Button 
                        size="small" 
                        variant="outlined" 
                        color="success"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                        Complete Session (+10%)
                    </Button>
                </Box>
                <Typography variant="body1" style={{marginTop:"8px", color:'#666'}}>
                    For testing purposes
                </Typography>
            </div>

            {/* Alert Message */}
            <Collapse in={alertOpen} sx={{ width: '100%', maxWidth: '500px' }}>
                <Alert 
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setAlertOpen(false)}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ 
                        borderRadius: '8px',
                        '& .MuiAlert-message': {
                            fontSize: '0.95rem'
                        }
                    }}
                >
                    {progress < 50 
                        ? "Your tomato is getting weak! Complete more focus sessions to keep it healthy and happy. Don't let your virtual pet down! 🍅💔"
                        : "Great job! Your tomato is thriving! Keep completing focus sessions to maintain its health and unlock new features! 🍅✨"
                    }
                </Alert>
            </Collapse>
        </div>
    );
}

export default Herosection;