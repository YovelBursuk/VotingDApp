import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import './CandidatesPage.css'
import { Button } from '@mui/material';
import CountdownTimer from './CountdownTimer.js';

const sliderMarks = [
    {
        value: 1,
        label: '1'
    },
    {
        value: 5,
        label: '5'
    },
    {
        value: 10,
        label: '10'
    }
]

export default function CandidatesPage({
    allCandidates, 
    onVote,
    isVoting,
    onChangeVotingState,
    votingTime,
    votingEnabled
}) {

    return (
        <div className='candidates-page-container'>
            <div className='candidate-page-button-wrapper'>
            { votingEnabled && !isVoting ?
                <Button
                    onClick={() => {onChangeVotingState()}}
                    variant='contained' 
                    className='candidate-page-change-voting-state'>
                    Start Voting!
                </Button>
                :
                <CountdownTimer votingTime={votingTime}/>
            }
                
            </div>
            <div className='candidate-page-cards-container'>
            {allCandidates.map((candidate, index) => (
                <Grow
                    key={`${candidate.name}_${index}`}
                    in
                    timeout={index * 1000}
                >
                    <Paper sx={{ m:1 }} elevation={4}>
                        <Box sx={{ width: 430, height: 450 }}>
                            <div className='candidate-card-container'>
                                <span className='candidate-card-name'>
                                    {candidate.name}, {candidate.age}
                                </span>
                                <span className='candidate-card-description'>
                                    "{candidate.description}"
                                </span>
                                <Divider sx={{ m:2 }} />
                                {
                                    Object.entries(candidate).map(([k, v]) => {
                                        if (['id', 'name', 'voteCount', 'age', 'description'].includes(k)) {
                                            return null;
                                        }

                                        return (
                                            <Stack key={k} spacing={3} direction="row" sx={{ mb: 1}}  alignItems="center">
                                                <span className='slider-key'>
                                                    { k.split('_').map(w => {
                                                        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                                                    }).join(' ') }:
                                                </span>
                                                <Slider
                                                    className={'slider-value'}
                                                    defaultValue={v}
                                                    step={1}
                                                    min={1}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                    marks={sliderMarks}
                                                    sx={{ width: 1/2 }}
                                                    disabled
                                                    color='secondary'
                                                />
                                            </Stack>
                                        )
                                        
                                    })
                                }

                                { isVoting &&
                                    <Button 
                                    onClick={() => {onVote(candidate.id)}}
                                    color='success' 
                                    variant='contained' 
                                    className='candidate-card-vote-button'>
                                    Vote
                                </Button>
                                }
                            </div>
                            
                        </Box>
                    </Paper>
                </Grow>
            ))}
            </div>
            
        </div>
    )
}