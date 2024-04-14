import './DataRecord.css'
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Tooltip from '@mui/material/Tooltip';

function DataRecord(props) {

    // const deleteRecord = (props) => {
    //     return props.sentence;
    // };

    return (
        <div className="DataRecord">
            <div className='sentence'>
                {props.sentence}
            </div>
            <div className='label'><Chip label={props.label} size='large'color='primary' /></div>
            <div className='change'>
                <Tooltip title="Change Class">
                    <IconButton aria-label="delete" size="large"  onClick={() => props.changeClass(props.sentence,props.label)}>
                        <ChangeCircleIcon fontSize="inherit" color='primary'/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className='delete'>
                <Tooltip title="Delete Record">
                    <IconButton aria-label="delete" size="large" onClick={() => props.deleteRecord(props.sentence)}>
                        <DeleteIcon fontSize="inherit" color='error'/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

export default DataRecord;