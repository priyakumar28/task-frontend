import { Close } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState, useEffect } from "react";



const ContactStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ContactDetails({ modal, setModal }) {
   
    const [response, setResponse] = useState([]);
    const handleClose = () => setModal({ ...modal, show: false });
    useEffect(() => {
        (async () => {
            try {

              let  contactList = await axios.get(`http://localhost:3000/users/${modal.id}`);
                
                setResponse(contactList.data)


            } catch (error) {
                console.log(error, 'error');
            }
        })()
    }, [modal])
    return (
        <Modal
            open={modal.show} onClose={handleClose}
        >
            <Box sx={ContactStyle}>

                <Grid container display={'flex'} flexDirection={'column'} >
                    <Grid item display={'flex'} justifyContent={'space-between'}>
                        <Typography>Contact Details</Typography>

                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'}>
                        
                                <Card  sx={{ pl: 6, pr: 6 }}>
                                    <Grid item display={'flex'}>
                                        <Typography>Name  :</Typography>
                                        <Typography>{response?.name}</Typography>
                                    </Grid>
                                    <Grid item display={'flex'}>
                                        <Typography>Email  :</Typography>
                                        <Typography>{response?.email}</Typography>
                                    </Grid>
                                    <Grid item display={'flex'}>
                                        <Typography>Phone  :</Typography>
                                        <Typography>{response?.phone}</Typography>
                                    </Grid>
                                    <Grid item display={'flex'}>
                                        <Typography>Address  :</Typography>
                                        <Typography>{response?.address}</Typography>
                                    </Grid>
                                </Card>
                           

                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}