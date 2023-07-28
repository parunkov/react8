import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Button, TextField } from "@mui/material";
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

    // const onRadioChange = (event) => {
    //     console.log(event.target.value);
    //     setSort(event.target.value);
    // } 
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

    return (
        <div className="container">
            <h1 className="title">AAAA</h1>
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
                {/* <span>
                    Сортировать
                    <input type="radio" id="desc" name="sort" value="desc" onChange={onRadioChange} checked={sort === 'desc'} />
                    <label for="desc">по возрастанию</label>
                    <input type="radio" id="asc" name="sort" value="asc" onChange={onRadioChange} />
                    <label for="asc">по убыванию</label>
                </span> */}
                <Button variant="contained" onClick={onButtonClick}>Найти</Button>
            </div>
            {users.map((user) => (
                <div className="user" key={user.id}>{user.login}</div>
            ))}
            <Pagination count={pages} variant="outlined" shape="rounded" onChange={handleChange} page={pageNumber} />
        </div>
    )
}

export default Page;
