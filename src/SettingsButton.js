import { Settings } from "@mui/icons-material";
import { Button } from "@mui/material";
import './App.css'

function SettingsButton({ onClick }){
    return(
        <Button variant="contained" color="inherit" startIcon={<Settings />} className="settingsButton" onClick={onClick}>Settings</Button>
    );
}

export default SettingsButton;