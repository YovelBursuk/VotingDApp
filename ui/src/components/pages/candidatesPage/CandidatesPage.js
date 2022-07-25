import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import './CandidatesPage.css'
import { Button } from '@mui/material';
import CountdownTimer from './CountdownTimer.js';

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
                        <Box sx={{ width: 250, height: 200 }}>
                            <div className='candidate-card-container'>
                                <span className='candidate-card-name'>
                                    Candidate name: {candidate.name}
                                </span>
                                <span className='candidate-card-votes'>
                                    Total votes: {candidate.voteCount}
                                </span>
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