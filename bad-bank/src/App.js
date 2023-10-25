import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/navbar';
import { UserContext } from './components/context';
import { Home } from './components/home';
import { CreateAccount } from './components/createaccount';
import { Login } from './components/login';
import { Deposit } from './components/deposit';
import { Withdraw } from './components/withdraw';
import { Balance } from './components/balance';
import { AllData } from './components/alldata';
import { useState } from 'react';

function App() {
  const baseUrl = 'http://localhost:4500';
  const testUser = 'a@a.com'

  const [status, setStatus] = useState('');
  const [amount, setDeposit] = useState('');
  const [balance, setBalance] = useState(null);

  // remove context for simplicity bc few components and no/minimal nesting. 
  // Extra, extra, extra Stretch goal: add context.
  // data that needs to be used by multiple components:
  // useState
  // user
  // balance
  // allData does not live here. It stays in allData component


  // function initializeUser, call on load (useEffect only on this page)
  // call backend to get user
  // use baseUrl 
  // make fetch
  // initialeBalance


  // will be passed to withdraw/deposit components
  // export function withdrawMoney
  //  fetch
  //  validate
  //  setBalance
  // export function depositMoney
  //  fetch
  //  validate
  //  setBalance

  let adjustMoney = (amount) => {

    fetch(`${baseUrl}/account/deposit/${testUser}/${Number(amount)}`)
      .then(async (res) => {
        const newBalance = await res.json();
        console.log('deposit', newBalance)
        setBalance(newBalance)

        if (amount === null) {
          setStatus('Balance error, Please contact support')
        }
      })
      .catch((err) => {
        console.log(err);

      })
    if (balance != typeof Number) {
      setStatus('Balance error, Please contact support')
      return status
    }
    return (balance, status)
  };


  return (
    <HashRouter basename="/">
      <NavBar />
      {/* insteaad of context, we pass balance, user & setBalance as needed to components */}
      <UserContext.Provider value={{ currentUser: null, users: [{ name: 'able', email: 'able@mit.edu', password: 'secret', balance: 100, role: "user" }, { name: 'admin', email: 'admin@mit.edu', password: 'secret', balance: 100, role: "admin" }] }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login />} />

          <Route
            path="/deposit/"
            element={<Deposit balance={balance} adjustMoney={adjustMoney} />}
          />

          {/* depost, withdraw & balance are only accessible if logged in. if user, render these. */}
          {/* <Route path="/deposit/" element={<Deposit />} /> */}
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/balance/" element={<Balance />} />
          {/* only accessible if admin. if admin, render here */}
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
