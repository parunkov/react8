const UserInfo = ({ login, avatar, link, repos }) => {
    console.log(link);
    if (login) return (
        <>
            <img src={avatar} alt={login} />
            <a href={link}><h1>{login}</h1></a>
            {repos.map((item) => <div className="repo-wrapper"><a href={item.url} key={item.id}>{item.name}</a></div>)}
        </>
    )
}

export default UserInfo;
