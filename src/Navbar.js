import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Nature from "@mui/icons-material/Nature";
import Img from 'C:/Users/andre/testing/myapp/src/components/grove-logo.png';

export const NavBar = () => {
    const navigate = useNavigate();

    const handleMyGardenClick = () => {
        navigate('/mygarden');
    };

    return(
        <nav className="nav">
            <img 
                src={Img} 
                style={{width:'174px', height:'80px'}} 
                alt="Grove Logo"
            />
            <div className="menuItems">
                <Button
                    variant="contained"
                    color="white"
                    startIcon={<Nature />}
                    onClick={handleMyGardenClick}
                >
                    Your tomato
                </Button>
            </div>
        </nav>
    );
}

export default NavBar;