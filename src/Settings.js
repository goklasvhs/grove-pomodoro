import { Typography } from "@mui/material";
import { Slider } from "@mui/material";
import SettingsContext from "./SettingsContext";
import { useContext } from "react";
import BackButton from "./BackButton";

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    return(
        <div style={{textAlign:'left'}}>
            <Typography><h1>Settings</h1></Typography>
            <label><Typography><h4>Work minutes: {settingsInfo.workMinutes}:00</h4></Typography></label>
            <Slider 
            value={settingsInfo.workMinutes} 
            onchange= {newValue => settingsInfo.setWorkMinutes(newValue)}
            min={1}
            max={120} >
            </Slider>

            <label><Typography><h4>Break minutes: {settingsInfo.breakMinutes}:00</h4></Typography></label>
            <Slider 
            value={settingsInfo.breakMinutes} 
            onchange= {newValue => settingsInfo.setBreakMinutes(newValue)}
            min={1}
            max={120}>
            </Slider>
            <div>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
            </div>
            </div>
    );
}

export default Settings;