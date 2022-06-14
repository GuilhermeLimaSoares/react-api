// import axios from 'axios';

import { AppBar, Box, Button, Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    // useEffect(() => {
    //     axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
    //         .then(response => setRestaurantes(response.data))
    // })

    useMemo(async () => {
        // axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setRestaurantes(response.data))
    }, [])


    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        // axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
        http.delete(`${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography>
                            Administração
                        </Typography>
                        <Box sx={{display:'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Novo Prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt : 1 }}>
                    <Paper sx={{p: 2}}>
                        {/* <TableContainer component={Paper}> */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nome
                                        </TableCell>
                                        <TableCell>
                                            Editar
                                        </TableCell>
                                        <TableCell>
                                            Excluir
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { restaurantes.map(restaurante => 
                                        <TableRow key={restaurante.id}>
                                            <TableCell>
                                                {restaurante.nome}
                                            </TableCell>
                                            <TableCell>
                                                <Link component={RouterLink} to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                                    Excluir
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default AdministracaoRestaurantes;