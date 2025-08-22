import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Nature from "@mui/icons-material/Nature";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleMyGardenClick = () => {
        navigate('/mygarden');
    };

    return(
        <nav className="nav">
            <img 
                src="components/grove-logo.png"
                style={{width:'174px', height:'80px'}} 
                alt="Grove Logo"
            />
            <div className="menuItems">
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Nature />}
                    onClick={handleMyGardenClick}
                >
                    Your tomato
                </Button>
            </div>
        </nav>
    );
}

export default Navbar;