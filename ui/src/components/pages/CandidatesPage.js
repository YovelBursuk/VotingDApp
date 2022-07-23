import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import './CandidatesPage.css'
import { Button } from '@mui/material';

export default function CandidatesPage({allCandidates, onVote}) {

    return (
        <div className='candidates-page-container'>
            {allCandidates.map((candidate, index) => (
                <Grow
                    key={`${candidate.name}_${index}`}
                    in
                    timeout={index * 1000}
                >
                    <Paper sx={{ m:1 }} elevation={4}>
                        <Box sx={{ width: 250, height: 200 }}>
                            <div className='candidate-card-container'>
                                <span className='candidate-card-name'>
                                    Candidate name: {candidate.name}
                                </span>
                                <span className='candidate-card-votes'>
                                    Total votes: {candidate.voteCount}
                                </span>
                                <Button 
                                onClick={() => {onVote(candidate.id)}}
                                color='success' 
                                variant='contained' 
                                className='candidate-card-vote-button'>
                                    Vote
                                </Button>
                            </div>
                            
                        </Box>
                    </Paper>
                </Grow>
            ))}
        </div>
    )
}