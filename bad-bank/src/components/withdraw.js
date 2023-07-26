// import { FindCurrentUser } from "./FindCurrentUser.js"
import { useContext, useState } from "react";
import { UserContext, Card } from "./context";

export function Withdraw() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [withdrawal, setWithdrawal] = useState('');
    const [balance, setBalance] = useState(null);

    //TODO: Extract into separate component as stretch goal
    function findCurrentUser() {
        return ctx.users.find((user) => user.email === ctx.currentUser);
    }

    function initializeBalance() {
        setBalance(findCurrentUser().balance)
        return balance
    }

    function validate(field) {
        if (!field) {
            setStatus('Error: No amount entered');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true;
    }


    function handleWithdrawal() {
        if (!validate(withdrawal, 'withdrawal')) return;

        if (isNaN(withdrawal)) {
            setStatus('Error: Withdrawal must be a number');
            return;
        }

        const withdrawalNum = Number(withdrawal);
        if (withdrawalNum <= 0) {
            setStatus('Error: Withdrawal ammount must be positive');
            return;
        }

        if (withdrawalNum > balance) {
            setStatus('Insufficient funds.');
            return;
        }

        setBalance(balance - withdrawalNum);
        findCurrentUser().balance -= withdrawalNum;
        setStatus('Withdrawal sucessful')
    }

    return (
        <Card
            bgcolor="primary"
            header='Withdrawal'
            status={status}
            body={ctx.currentUser ? (
                <>
                    Current Account Balance {balance ? balance : initializeBalance()} <br />
                    Amount<br />
                    <input type="input" className="form-control" id="" placeholder="Enter Amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleWithdrawal} disabled={withdrawal === ''}>Withdraw</button>
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