// import { findCurrentUser } from "./findCurrentUser.js"

function Balance() {
    const ctx = React.useContext(UserContext);
    const [status, setStatus] = React.useState('');

    function findCurrentUser() {
        return ctx.users.find((user) => user.email === ctx.currentUser);
    }

    return (
        <Card
            bgcolor="primary"
            header='Balance'
            status={status}
            body={ctx.currentUser !== null ? (
                <>
                    {/* TODO: still need format correct */}
                    Balance <br />
                    Your Balance is<br />
                    {findCurrentUser().balance}

                </>
            ) : (
                <>
                    <h5>Please Login</h5>
                    <button type="submit" className="btn btn-light"><a href='#/login/' >Click to Go to Login Page</a></button>
                </>
            )}
        />
    )
}


