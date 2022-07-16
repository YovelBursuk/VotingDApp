import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import './CandidatesPage.css'

export default function CandidatesPage({allCandidates}) {

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
                            <span>Candidate name: {candidate.name}</span>
                            <br />
                            <span>Total votes: {candidate.voteCount}</span>
                        </Box>
                    </Paper>
                </Grow>
            ))}
        </div>
    )
}