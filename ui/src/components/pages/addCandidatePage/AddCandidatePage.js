import { Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import './AddCandidatePage.css'

// const sliderMarks = [
//     {
//         value: 1,
//         label: '1'
//     },
//     {
//         value: 5,
//         label: '5'
//     },
//     {
//         value: 10,
//         label: '10'
//     }
// ]

// const sliderProperties = [
//     'political_notion',
//     'economical_notion',
//     'social_notion',
//     'religous_notion',
//     'enviromnent_friendly',
//     'years_of_experience'
// ]

export default function AddCandidate({onSave, onCancel}) {
    const { handleSubmit, control } = useForm();

    return (
        <form className='add-candidate-form-container' onSubmit={handleSubmit(onSave)}>
            <h2 className='add-candidate-form-header'>
                Add a new candidate
            </h2>
            <Controller
                name="candidateName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    className="add-candidate-name-property"
                    label="Candidate Name"
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                />
                )}
                rules={{ required: 'Candidate name required' }}
            />
            <Controller
                name="candidateDescription"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    label="Candidate Description"
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                />
                )}
                rules={{ required: 'Candidate description required' }}
            />
            {/* {
                sliderProperties.map(property => {
                    return (
                        <Controller
                            key={property}
                            name={property}
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Stack 
                                className='slider-container'
                                key={property} 
                                spacing={3} 
                                direction="row" 
                                sx={{ mb: 1}}  
                                alignItems="center"
                            >
                                <span className='add-candidate-slider-key'>
                                    { property.split('_').map(w => {
                                        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                                    }).join(' ') }:
                                </span>
                                <Slider
                                    className={'slider-value'}
                                    defaultValue={5}
                                    onChange={onChange}
                                    value={value ? value : 5}
                                    step={1}
                                    min={1}
                                    max={10}
                                    valueLabelDisplay="auto"
                                    marks={sliderMarks}
                                    sx={{ width: 1/2 }}
                                />
                            </Stack>
                            )}
                            rules={{ required: 'Candidate description required' }}
                        />
                        
                    )
                    
                })
            } */}
            <div className='add-candidate-form-fotter'>
                <Button variant='contained' onClick={onCancel}>
                    Cancel
                </Button>
                <Button type='submit' variant='contained' color='primary'>
                    Create
                </Button>
            </div>
        </form>
    )
}