import { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@mui/material";
// import axios from "axios";
import { useParams } from "react-router-dom";
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');

    const [restaurante, setRestaurante] = useState('');
    const [tag, setTag] = useState('');

    const [imagem, setImagem] = useState<File | null>(null);

    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<{tags: ITag[]}>('tags/')
            .then(response => setTags(response?.data?.tags));
        http.get<IRestaurante[]>('restaurantes/')
        .then(response => setRestaurantes(response?.data));
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target?.files?.length){
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        if(imagem){
            formData.append('imagem', imagem);
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() => {
            setNomePrato('');
            setDescricao('');
            setTag('');
            setRestaurante('');
            alert('Prato cadastrado com sucesso!');
        })
        .catch(erro => console.log(erro))
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
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Novo prato
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
                            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                            <Box component="form"  sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                                <TextField 
                                    value={nomePrato}
                                    onChange={evento => setNomePrato(evento.target.value)}
                                    id="standard-basic" 
                                    label="Nome do prato" 
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                    <TextField 
                                    value={descricao}
                                    onChange={evento => setDescricao(evento.target.value)}
                                    id="standard-basic" 
                                    label="Descrição" 
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-tag">Tag</InputLabel>
                                    <Select label="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                            {tag.value}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                    <Select label="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                            {restaurante.nome}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>

                                <input type="file" onChange={selecionarArquivo}/>
                                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}


export default FormularioPrato;