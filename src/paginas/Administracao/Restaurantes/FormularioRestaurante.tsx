import { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
// import axios from "axios";
import { useParams } from "react-router-dom";
import IRestaurante from '../../../interfaces/IRestaurante';
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";

const FormularioRestaurante = () => {

    const parametros = useParams();

    useEffect(() => {
        if(parametros.id) {
            // axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, 
            http.get<IRestaurante>(`${parametros.id}/`, 
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8000"
                } 
            }
        )
        .then(response => {
            setNomeRestaurante(response.data.nome)
        })
        }
    },[parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if(parametros.id){
            // axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
            http.put(`${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante atualizado com sucesso!")
            })
        } else {
            // axios.post('http://localhost:8000/api/v2/restaurantes/', {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante cadastrado com sucesso!")
            })
        }
    
        console.log('preciso enviar dados para api');
        console.log(nomeRestaurante);
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
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt : 1 }}>
                    <Paper sx={{p: 2}}>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems:"center", flexGrow: 1}}>
                            <Box component="form"  sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                                <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                                <TextField 
                                    onChange={evento => setNomeRestaurante(evento.target.value)}
                                    id="standard-basic" 
                                    label="Nome do restaurante" 
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}


export default FormularioRestaurante;