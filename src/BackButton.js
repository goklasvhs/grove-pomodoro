import { ArrowBack } from "@mui/icons-material";
import { Button, Fab, IconButton } from "@mui/material";

function BackButton({ onClick }) {
    return(
        <Fab size="large" variant="primary" onClick={onClick}> <ArrowBack /> </Fab>
    );
}

export default BackButton;