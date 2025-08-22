import React, { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
    Button, 
    Typography, 
    Chip, 
    Box, 
    TextField, 
    Paper, 
    List, 
    ListItem, 
    ListItemText, 
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { 
    PlayArrow, 
    Pause, 
    Refresh, 
    Add, 
    Delete, 
    ExpandMore,
    Notes as NotesIcon
} from '@mui/icons-material';

import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';

const blue = '#2196F3';
const red = '#EE2737';
const green = '#279F00';

function Timer(){
    const settingsInfo = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [totalCycles, setTotalCycles] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    
    // Notes state
    const [currentNote, setCurrentNote] = useState('');
    const [notes, setNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const cycleCountRef = useRef(cycleCount);

    // Initialize notes from cache simulation (using state)
    useEffect(() => {
        // In a real app, this would be: const savedNotes = JSON.parse(localStorage.getItem('pomodoroNotes') || '[]');
        // For this environment, we'll start with empty notes
        const savedNotes = [];
        setNotes(savedNotes);
    }, []);

    // Save notes to cache simulation whenever notes change
    useEffect(() => {
        // In a real app, this would be: localStorage.setItem('pomodoroNotes', JSON.stringify(notes));
        // For this environment, notes persist only during the session
    }, [notes]);

    // Get duration based on mode
    function getModeDuration(currentMode) {
        switch (currentMode) {
            case 'work':
                return settingsInfo.workMinutes * 60;
            case 'shortBreak':
                return settingsInfo.breakMinutes * 60;
            case 'longBreak':
                return 30 * 60;
            default:
                return settingsInfo.workMinutes * 60;
        }
    }

    // Get image based on mode
    function getModeImage(currentMode) {
        switch (currentMode) {
            case 'work':
                return '/components/focus.png';
            case 'shortBreak':
                return '/components/rest.png';
            case 'longBreak':
                return '/components/default.png';
            default:
                return '/components/focus.png';
        }
    }

    // Get color based on mode
    function getModeColor(currentMode) {
        switch (currentMode) {
            case 'work':
                return blue;
            case 'shortBreak':
                return red;
            case 'longBreak':
                return green;
            default:
                return blue;
        }
    }

    // Add note function
    const addNote = () => {
        if (currentNote.trim() !== '') {
            const newNote = {
                id: Date.now(),
                text: currentNote.trim(),
                timestamp: new Date().toLocaleString(),
                mode: mode,
                cycle: totalCycles + 1
            };
            setNotes(prev => [newNote, ...prev]);
            setCurrentNote('');
        }
    };

    // Delete note function
    const deleteNote = (noteId) => {
        setNotes(prev => prev.filter(note => note.id !== noteId));
    };

    // Handle Enter key for adding notes
    const handleNoteKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addNote();
        }
    };

    function switchMode() {
        let nextMode;
        let nextCycleCount = cycleCountRef.current;

        if (modeRef.current === 'work') {
            nextCycleCount++;
            setCycleCount(nextCycleCount);
            cycleCountRef.current = nextCycleCount;
            
            if (nextCycleCount % 2 === 0) {
                nextMode = 'longBreak';
            } else {
                nextMode = 'shortBreak';
            }
        } else if (modeRef.current === 'longBreak') {
            if (cycleCountRef.current >= 2) {
                setIsCompleted(true);
                setTotalCycles(prev => prev + 1);
                return;
            }
            nextMode = 'work';
        } else {
            nextMode = 'work';
        }

        const nextSeconds = getModeDuration(nextMode);
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function tick(){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        const initialSeconds = getModeDuration('work');
        setSecondsLeft(initialSeconds);
        secondsLeftRef.current = initialSeconds;
    }

    function restartCycle() {
        setCycleCount(0);
        cycleCountRef.current = 0;
        setMode('work');
        modeRef.current = 'work';
        setIsCompleted(false);
        setIsPaused(true);
        const initialSeconds = getModeDuration('work');
        setSecondsLeft(initialSeconds);
        secondsLeftRef.current = initialSeconds;
    }

    const handlePlayPause = () => {
        setIsPaused(!isPaused);
    };

    useEffect(() => {
        secondsLeftRef.current = secondsLeft;
    }, [secondsLeft]);

    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

    useEffect(() => {
        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current || isCompleted) {
                return;
            }
            if (secondsLeftRef.current === 0){
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo, isCompleted]);

    const totalSeconds = getModeDuration(mode);
    const percentage = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0' + seconds;

    // Get mode label for display
    function getModeLabel(currentMode) {
        switch (currentMode) {
            case 'work':
                return 'Focus Time';
            case 'shortBreak':
                return 'Short Break';
            case 'longBreak':
                return 'Long Break';
            default:
                return 'Focus Time';
        }
    }

    return(
        <div className='TimerCard' style={{ width: 500 }}>
            {/* Cycle Progress Chips */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1, 
                marginBottom: 2,
                flexWrap: 'wrap'
            }}>
                <Chip 
                    label={`Cycle ${totalCycles + 1}`}
                    color="primary"
                    variant="outlined"
                />
                <Chip 
                    label="Focus 1"
                    color={cycleCount >= 1 ? "success" : "default"}
                    variant={cycleCount >= 1 ? "filled" : "outlined"}
                />
                <Chip 
                    label="Break 1"
                    color={cycleCount >= 1 && mode !== 'work' ? "warning" : "default"}
                    variant={cycleCount >= 1 && mode !== 'work' ? "filled" : "outlined"}
                />
                <Chip 
                    label="Focus 2"
                    color={cycleCount >= 2 ? "success" : "default"}
                    variant={cycleCount >= 2 ? "filled" : "outlined"}
                />
                <Chip 
                    label="Long Break"
                    color={mode === 'longBreak' ? "secondary" : "default"}
                    variant={mode === 'longBreak' ? "filled" : "outlined"}
                />
            </Box>

            {/* Current Mode Indicator */}
            <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Chip 
                    label={getModeLabel(mode)}
                    color={mode === 'work' ? 'primary' : mode === 'shortBreak' ? 'warning' : 'secondary'}
                    size="large"
                    sx={{ fontSize: '1.1rem', padding: '8px 16px' }}
                />
            </Box>

            {/* Timer Circle */}
            <CircularProgressbarWithChildren 
                value={percentage} 
                styles={buildStyles({
                    textColor: getModeColor(mode),
                    pathColor: getModeColor(mode),
                })}
            >
                <img 
                    src={getModeImage(mode)} 
                    alt={`${mode} Icon`}
                    style={{width:'164px', height:'164px'}} 
                />
            </CircularProgressbarWithChildren>
            
            {/* Timer Display */}
            <div style={{ 
                fontSize: 96, 
                fontWeight: 'bold', 
                color: 'rgba(0, 0, 0, 0.87)', 
                fontFamily: "Roboto",
                marginTop: 10
            }}>
                {minutes}:{seconds}
            </div>

            {/* Notes Section */}
            <Box sx={{ width: "100%", marginTop: 2 }}>
                <TextField 
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    onKeyPress={handleNoteKeyPress}
                    id="note-input" 
                    label="Add a note or task..." 
                    variant="filled" 
                    sx={{ width: "100%" }}
                    multiline
                    maxRows={3}
                    InputProps={{
                        endAdornment: (
                            <IconButton 
                                onClick={addNote}
                                disabled={!currentNote.trim()}
                                color="primary"
                            >
                                <Add />
                            </IconButton>
                        )
                    }}
                />
            </Box>

            {/* Notes Display */}
            {notes.length > 0 && (
                <Box sx={{ width: "100%", marginTop: 2 }}>
                    <Accordion expanded={showNotes} onChange={() => setShowNotes(!showNotes)}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <NotesIcon />
                                <Typography>Notes ({notes.length})</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper sx={{ maxHeight: 200, overflow: 'auto' }}>
                                <List dense>
                                    {notes.map((note) => (
                                        <ListItem 
                                            key={note.id}
                                            secondaryAction={
                                                <IconButton 
                                                    edge="end" 
                                                    aria-label="delete"
                                                    onClick={() => deleteNote(note.id)}
                                                    size="small"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary={note.text}
                                                secondary={`${note.timestamp} • Cycle ${note.cycle} • ${note.mode === 'work' ? 'Focus' : note.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}

            {/* Buttons */}
            <div className='button-container' style={{ marginTop: 20 }}>
                {isCompleted ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, color: green }}>
                            🎉 Cycle Complete! Great job! 🎉
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="success"
                            startIcon={<Refresh />}
                            onClick={restartCycle}
                            size="large"
                        >
                            Start New Cycle
                        </Button>
                    </Box>
                ) : (
                    <div className='activeButtons'>
                        <Button 
                            variant="contained" 
                            color={isPaused ? "primary" : "primary"}
                            startIcon={isPaused ? <PlayArrow /> : <Pause />}
                            onClick={handlePlayPause}
                            sx={{marginBottom: 1.5}}
                            size='large'
                        >
                            {isPaused ? 'Start' : 'Pause'}
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            startIcon={<Refresh />}
                            onClick={restartCycle}
                            size='large'
                        >
                            Reset Cycle
                        </Button>
                    </div>
                )}
                <Box sx={{ marginTop: 2 }}>
                    <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
                </Box>
            </div>
        </div>
    );
}

export default Timer;