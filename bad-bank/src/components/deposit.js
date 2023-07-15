import { FindCurrentUser } from "./findCurrentUser.js"
import { useContext, useState } from "react";
import { UserContext, Card } from "./context";

export function Deposit() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [deposit, setDeposit] = useState('');
    const [balance, setBalance] = useState(null);

    FindCurrentUser()

    function initialieBalance() {
        setBalance(FindCurrentUser().balance)
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

    function handleDeposit() {
        if (!validate(deposit, 'deposit')) return;

        if (isNaN(deposit)) {
            setStatus('Error: Deposit must be a number');
            return;
        }

        const depositNum = Number(deposit);
        if (depositNum <= 0) {
            setStatus('Error: Despoit ammount must be positive');
            return;
        }

        setBalance(balance + depositNum);
        FindCurrentUser().balance += depositNum;
        setStatus('Deposite sucessful');
    }

    return (
        <Card
            bgcolor="primary"
            header='Deposit'
            status={status}
            body={ctx.currentUser !== null ? (
                <>
                    {/*TODO: still need the format correct*/}
                    Balance <br /> {balance === null ? initialieBalance() : balance} <br />
                    Deposit Amount<br />
                    <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={deposit === ''}>Deposit</button>
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