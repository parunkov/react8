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
import { Button, Container, Icon, TextField } from "@mui/material";
import './Page.scss';
import UserInfo from "../UserInfo/UserInfo";

const Page = () => {
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sort, setSort] = useState('desc');
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [userData, setUserData] = useState({});
    const [userMode, setUserMode] = useState(false);

    const responseData = async (value, sortOrder, page) => {
        const url = `https://api.github.com/search/users?q=${value}&sort=repositories&order=${sortOrder}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const onInput = (event) => {
        setInputValue(event.target.value);
    }

    const handleChangeRadio = (event) => {
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

    const onItemClick = async (event) => {
        const user = users.find((item) => +item.id === +event.target.dataset.id);
        const login = user.login;
        const link = user.html_url;
        const avatar = user.avatar_url;
        const response = await fetch(`${user.repos_url}?sort=updated`);
        const repos = await response.json();
        console.log("🚀 ~ file: Page.jsx:62 ~ onItemClick ~ repos:", repos)
        setUserData({ login, avatar, link, repos });
        console.log(userData);
        setUserMode(true);
    }

    const onReturnClick = () => {
        setUserMode(false);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            {!userMode && <Container maxWidth="lg" className="container">
                <h1 className="title">Поиск аккаунтов GitHub</h1>
                <div className="search-wrapper">
                    <TextField 
                        variant="outlined" 
                        type="text" 
                        className="input" 
                        value={inputValue} 
                        onInput={onInput} 
                        placeholder="Логин"
                    />
                    <FormControl>
                        <FormLabel id="radio">Количество репозиториев пользователя</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="radio"
                            name="radio"
                            value={sort}
                            onChange={handleChangeRadio}
                            className="radio"
                        >
                            <FormControlLabel value="desc" control={<Radio />} label="сначала большее" />
                            <FormControlLabel value="asc" control={<Radio />} label="сначала меньшее" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" onClick={onButtonClick}>Найти</Button>
                </div>

                <Grid container spacing={2} columns={{ xs: 1, sm: 4, md: 12 }} className="grid">
                    {users.map((user) => (
                        <Grid
                            item xs={4}
                            className="user"
                            key={user.id}
                            onClick={onItemClick}
                        >
                            <Item data-id={user.id}>{user.login}</Item>
                        </Grid>
                    ))}
                </Grid>
                {pages > 1 && <Pagination
                    count={pages}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                    page={pageNumber}
                    className="pagination"
                />}
            </Container>}
            {userMode && <Container maxWidth="lg" className="user-page">
                <div className="return-button-wrapper">
                    <Button variant="contained" onClick={onReturnClick}>
                        <Icon className="arrow">arrow_back</Icon><span className="back">К списку</span>
                    </Button>
                </div>
                <div className="user-info-wrapper">
                    <UserInfo
                        avatar={userData.avatar}
                        login={userData.login}
                        repos={userData.repos}
                        link={userData.link}
                    />
                </div>
                <div className="return-button-wrapper">
                    <Button variant="contained" onClick={onReturnClick}>
                        <Icon className="arrow">arrow_back</Icon><span className="back">К списку</span>
                    </Button>
                </div>
            </Container>}
        </>
    )
}

export default Page;
