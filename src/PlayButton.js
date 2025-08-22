import { PlayArrow } from "@mui/icons-material"
import { Button } from "@mui/material"

function PlayButton() {
    return(
        <Button variant="contained" startIcon={<PlayArrow />}>Play</Button>
    );
}

export default PlayButton;