import { useState } from "react";

const Page = () => {
    const [users, setUsers] = useState([]);

    const onButtonClick = async () => {
        const response = await fetch('https://api.github.com/search/users?q=tom&sort=repositories&order=asc');
        const dataUsers = await response.json();
        setUsers(dataUsers.items);
    }
    return (
        <div className="container">
            <h1 className="title">AAAA</h1>
            <button onClick={onButtonClick}>Найти</button>
            {users.map((user) => (
                <div className="user" key={user.id}>{user.login}</div>
            ))}
        </div>
    )
}

export default Page;
