import './UserInfo.scss';

const UserInfo = ({ login, avatar, link, repos }) => {
    console.log(link);
    if (login) return (
        <>
            <img src={avatar} alt={login} className='image' />
            <a href={link} target="_blank" rel="noreferrer"><h1>{login}</h1></a>
            {repos.length > 0 && <div>
                <h2>Новые репозитории:</h2>
                {repos.map((item) => <div className="repo-wrapper">
                    <a href={item.svn_url} key={item.id} target="_blank" rel="noreferrer">{item.name}</a>
                </div>)}
            </div>}
        </>
    )
}

export default UserInfo;
