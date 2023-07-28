import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Container, TextField } from "@mui/material";
import './Page.scss';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sort, setSort] = useState('desc');
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const responseData = async (value, sortOrder, page) => {
        const url = `https://api.github.com/search/users?q=${value}&sort=repositories&order=${sortOrder}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const onInput = (event) => {
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    const handleChangeRadio = (event) => {
        console.log(event.target.value);
        setSort(event.target.value);   
    }

    const onButtonClick = async () => {
        if (inputValue.length === 0) return;
        const dataUsers = await responseData(inputValue, sort, pageNumber);
        const totalCount = +dataUsers.total_count > 1000 ? 1000 : +dataUsers.total_count;
        const totalPages = Math.ceil(totalCount / 30);
        setPages(totalPages);
        setPageNumber(1);
        setUsers(dataUsers.items);
    }

    const handleChange = async (event, value) => {
        setPageNumber(value);
        const dataUsers = await responseData(inputValue, sort, value);
        setUsers(dataUsers.items);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Container maxWidth="lg"  className="container">
            <h1 className="title">Поиск аккаунтов GitHub</h1>
            <div className="search-wrapper">
                <TextField variant="outlined" type="text" className="input" value={inputValue} onInput={onInput} />
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Сортировать</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={sort}
                        onChange={handleChangeRadio}
                    >
                        <FormControlLabel value="asc" control={<Radio />} label="по возрастанию" />
                        <FormControlLabel value="desc" control={<Radio />} label="по убыванию" />
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" onClick={onButtonClick}>Найти</Button>
            </div>
            
            <Grid container spacing={2} columns={{ xs: 1, sm: 4, md: 12 }}>
                {users.map((user) => (
                    <Grid item xs={4} className="user" key={user.id}><Item>{user.login}</Item></Grid>
                ))}
            </Grid>
            <Pagination count={pages} variant="outlined" shape="rounded" onChange={handleChange} page={pageNumber} />
        </Container>
    )
}

export default Page;
