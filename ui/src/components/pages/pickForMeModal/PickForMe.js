import { Button, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle,
    Stack, Slider, Divider
 } from "@mui/material";
import { useState } from "react";
import OurModel from "../../../deepLearning/model";
import './PickForMe.css';

const sliderMarks = [
    {
        value: -5,
        label: '-5'
    },
    {
        value: 0,
        label: '0'
    },
    {
        value: 5,
        label: '5'
    }
]

export default function PickForMe({
    isOpen,
    onClose,
    getCandidateInfo
}) {
    const [properties, setProperties] = useState({
        political_notion: 0,
        economical_notion: 0,
        social_notion: 0,
        religous_notion: 0,
        enviromnent_friendly: 0
    })
    const [pickedCandidate, setPickedCandidate] = useState();

    const handleCalculate = async () => {
        const model = new OurModel()
        const prediction = await model.predict(...Object.values(properties))
        const candidate = getCandidateInfo(prediction)
        setPickedCandidate(candidate)
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Pick For Me</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    For each of the following statements, rate your belief from -5 to 5.
                    Where -5 is the lowest option, and 5 states the most common with you.
                </DialogContentText>
                <Divider sx={{ m:2 }} />
                {
                Object.entries(properties).map(([property, val]) => {
                    return (
                        <Stack 
                            className='pick-for-me-slider-container'
                            key={property} 
                            spacing={3} 
                            direction="row" 
                            sx={{ mb: 1}}  
                            alignItems="center"
                        >
                            <span className='pick-for-me-slider-key'>
                                { property.split('_').map(w => {
                                    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                                }).join(' ') }:
                            </span>
                            <Slider
                                className={'slider-value'}
                                defaultValue={val}
                                onChange={(e, newVal) => {
                                    setProperties({...properties, [property]: newVal});
                                    return newVal;
                                }}
                                value={val ? val : 0}
                                step={1}
                                min={-5}
                                max={5}
                                valueLabelDisplay="auto"
                                marks={sliderMarks}
                                // sx={{ width: 1/2 }}
                            />
                        </Stack>
                    )
                })}
                {
                    !!pickedCandidate && 
                    <DialogContentText>
                        The best candidate for you is: {pickedCandidate.name}
                    </DialogContentText>
                }
            
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCalculate}>Calculate</Button>
            </DialogActions>
        </Dialog>
    )
}