// import axios from 'axios';

import { AppBar, Box, Button, Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useMemo(async () => {
        http.get<IPrato[]>('pratos/')
            .then(response => setPratos(response.data))
    }, [])


    const excluir = (pratoAhSerExcluido: IPrato) => {
        // axios.delete(`http://localhost:8000/api/v2/pratos/${pratoAhSerExcluido.id}/`)
        http.delete(`${pratoAhSerExcluido.id}/`)
            .then(() => {
                const listaPrato = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
                setPratos([...listaPrato])
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
                                            Descrição
                                        </TableCell>
                                        <TableCell>
                                            Tag
                                        </TableCell>
                                        <TableCell>
                                            Imagem
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
                                    { pratos.map(prato => 
                                        <TableRow key={prato.id}>
                                            <TableCell>
                                                {prato.nome}
                                            </TableCell>
                                            <TableCell>
                                                {prato.tag}
                                            </TableCell>
                                            <TableCell>
                                                <a href={prato.imagem} target="_blank" rel="noreferer">ver imagem</a>
                                            </TableCell>
                                            <TableCell>
                                                [<Link component={RouterLink} to={`/admin/pratos/${prato.id}`}>editar</Link>]
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos;