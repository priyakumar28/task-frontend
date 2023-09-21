import React, { useState, useEffect,} from "react";
import { Box, Button, Card, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ControlPoint, AccountCircleOutlined, Delete, Edit, RemoveRedEye, Close } from '@mui/icons-material'
import ContactModal from './AddContact';
import ContactDetail from './ContactDetails'
import axios from "axios";



export default function Contact() {


    const [modal, setModal] = useState({
        show: false,
        id: 0,
        type: ''
    });
    const [detailModel, setDetailModal] = useState({
        show: false,
        id: 0
    });
    const [response, setResponse] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };
    const filteredUsers = response?.filter((user) => {
        const searchValue = searchInput.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.phone.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue)
        );
    });


    useEffect(() => {
        (async () => {
            let contactList = await axios.get('http://localhost:3000/users');
            if (contactList.status === 200) {
                setResponse(contactList.data)
            }
        })();
    }, [])

   
    return (
        <Box sx={{ bgcolor: '#000', borderRadius: 3 }} maxWidth={'80vh'} >
            <Grid container display={'flex'} flexDirection={'column'} lg={12} sx={{ boxShadow: 2, p: 1 }} borderRadius={5}>
                <Grid item borderRadius={2} display={'flex'} justifyContent={'center'} sx={{ background: '#4dabf5' }} lg={12}>
                    <Typography fontSize={'30px'} color={'white'} >All Contacts</Typography>
                    <IconButton onClick={() => setModal({ show: !modal.show, type: 'add' })}>
                        <ControlPoint sx={{ color: 'white', }} />
                    </IconButton>

                </Grid>
                <Grid item mt={2} display={'flex'} justifyContent={'center'}>
                    <TextField
                        placeholder="Search Contact"
                        variant="outlined"
                        size="small"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        sx={{ background: '#ffffff', borderRadius: 2 }}
                    />
                </Grid>
                <Grid item >
                    {filteredUsers.length > 0 ? filteredUsers.map((e) => (
                        <Card sx={{ mt: 2 }}>

                            <Grid container display={'flex'} justifyContent={'space-around'} alignItems={'center'} rowGap={2} lg={12}>
                                <Typography>{e.userid}</Typography>
                                <Grid item display={'flex'} alignItems={'center'} columnGap={2} lg={6}>
                                    <IconButton ><AccountCircleOutlined sx={{ fontSize: '35px' }} /></IconButton>
                                    <Grid item display={'flex'} flexDirection='column' justifyContent={'flex-start'} alignSelf={'center'} textAlign={'left'} lg={5}>
                                        <Typography>{e.name}</Typography>
                                        <Typography fontSize={'15px'}>{e.phone}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item >
                                    <IconButton>
                                        <RemoveRedEye onClick={() => setDetailModal({ show: !modal.show, id: e.userid })} />
                                    </IconButton>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                    <IconButton  onClick={() => setModal({ show: true, id: e.userid, type: 'edit' })}>
                                        <Edit />
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </Card>
                    )) : <Typography>No user Found</Typography>}

                </Grid>
            </Grid>

            <ContactModal modal={modal} setModal={setModal} />
            <ContactDetail modal={detailModel} setModal={setDetailModal} />


        </Box>
    )
}
