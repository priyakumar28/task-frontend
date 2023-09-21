import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from 'axios'


const AddContactStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AddContact({ modal, setModal }) {

    console.log(modal.type, 'fhkjdafkjalkfjal', modal.id);
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().min(10).max(13).required(),
        address: yup.string()
    })
    const {
        register,
        handleSubmit,
        getValues,
        reset,

        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        (async () => {
            try {
                if (modal.type === 'edit') {
                    let contactList = await axios.get(`http://localhost:3000/users/${modal.id}`);
                    // let data=contactList.data
                    console.log(contactList, 'dafaljflas');
                    if (contactList.status === 200) {
                        reset(contactList.data)
                    }

                    console.log(contactList, "c");
                }
            } catch (error) {
                console.log(error, 'error');
            }
        })()
    }, [modal])


    // const [Addopen, setAddOpen] = React.useState(false);
    // const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setModal({ ...modal, show: !modal.show });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            let body = {
                userid: modal.type == 'edit' ?? data.userid,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address

            }
            if (modal.type == 'add') {
                const addContactData = await axios.post('http://localhost:3000/users/create', body)
                console.log(addContactData, "addContactData");
                if (addContactData.status === 200) {
                    setModal({...modal,show:!modal.show});
                    alert('Contact Added Successfully')
                }
                else {
                    alert('hello')
                }
            }
            else if (modal.type == 'edit') {
                const editContactData = await axios.put(`http://localhost:3000/users/update`, body)
                console.log(editContactData, "editContactData");
                if (editContactData.status === 200) {
                    setModal({ ...modal, show: !modal.show });
                    alert('Contactc updated Successfully')
                }
                else {
                    alert('error')
                }
            }
        }
        catch (error) {
            alert(error)
        }
        // console.log('submitted', data);
    }
    return (
        <Modal
            open={modal.show} onClose={handleAddClose}
        >
            <Box sx={AddContactStyle}>

                <Grid container display={'flex'} flexDirection={'column'} alignItems={'center'} >
                    <Typography>Add Contact</Typography>
                    <Grid item>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid item>
                                <Typography>Name</Typography>
                                <TextField placeholder='Enter Your Name' variant='outlined' type='text' size='small' {...register('name', { require: true })} error={!!errors.name} helperText={errors.name?.message} />
                            </Grid>
                            <Grid item>
                                <Typography>Email</Typography>
                                <TextField placeholder='Enter Your mail' variant='outlined' type='email' size='small'  {...register('email', { require: true })} error={!!errors.email} helperText={errors.email?.message} />
                            </Grid>
                            <Grid item>
                                <Typography>Phone</Typography>
                                <TextField placeholder='Enter Your Phone Number' type='text' variant='outlined' size='small'  {...register('phone', { require: true })} error={!!errors.phone} helperText={errors.phone?.message} />
                            </Grid>
                            <Grid item>
                                <Typography>Address</Typography>
                                <TextField placeholder='Enter Your Address' type='text' variant='outlined' size='small'  {...register('address', { require: true })} error={!!errors.address} helperText={errors.address?.message} />
                            </Grid>

                            <Grid item mt={2} display={'flex'} justifyContent={'space-between'}>
                                <Button type='submit' variant='contained'>Submit</Button>
                                <Button type='reset' variant='contained' sx={{ background: 'black' }}>Reset</Button>
                            </Grid>
                        </form>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    )
}

