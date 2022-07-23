import { Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import './AddCandidatePage.css'

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