import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sort, setSort] = useState('desc');
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const responseData = async (value, sortOrder, page) => {
        const url = `https://api.github.com/search/users?q=${value}&sort=repositories&order=${sortOrder}&page=${page}`;
        const response = await fetch(url);
        console.log("🚀 ~ file: Page.jsx:14 ~ responseData ~ url:", url)
        const data = await response.json();
        return data;
    }

    // useEffect(() => {
    //     responseData();
    // }, [responseData, in])

    const onInput = (event) => {
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    const onRadioChange = (event) => {
        console.log(event.target.value);
        setSort(event.target.value);
    }

    const onButtonClick = async () => {
        if (inputValue.length === 0) return;
        // const response = await fetch(`https://api.github.com/search/users?q=${inputValue}&sort=repositories&order=${sort}&page=1`);
        // const dataUsers = await response.json();
        const dataUsers = await responseData(inputValue, sort, pageNumber);
        console.log(dataUsers.total_count);
        const totalCount = +dataUsers.total_count > 1000 ? 1000 : +dataUsers.total_count;
        const totalPages = Math.ceil(totalCount / 30);
        console.log("🚀 ~ file: Page.jsx:40 ~ onButtonClick ~ totalPages:", totalPages)
        setPages(totalPages);
        setPageNumber(1);
        setUsers(dataUsers.items);
    }

    const handleChange = async (event, value) => {
        // setPage(value);
        console.log(value);
        setPageNumber(value);
        const dataUsers = await responseData(inputValue, sort, value);
        // console.log(dataUsers.total_count);
        // setPages(+dataUsers.total_count / 30);
        setUsers(dataUsers.items);
    };

    return (
        <div className="container">
            <h1 className="title">AAAA</h1>
            <input type="text" className="input" value={inputValue} onInput={onInput} />
            <span>
                Сортировать
                <input type="radio" id="desc" name="sort" value="desc" onChange={onRadioChange} checked={sort === 'desc'} />
                <label for="desc">по возрастанию</label>
                <input type="radio" id="asc" name="sort" value="asc" onChange={onRadioChange} />
                <label for="asc">по убыванию</label>
            </span>
            <button onClick={onButtonClick}>Найти</button>
            {users.map((user) => (
                <div className="user" key={user.id}>{user.login}</div>
            ))}
            <Pagination count={pages} variant="outlined" shape="rounded" onChange={handleChange} page={pageNumber} />
        </div>
    )
}

export default Page;
