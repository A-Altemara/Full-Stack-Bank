import { useContext, useEffect, useState } from "react";
import { UserContext, Card } from "./context";

export function AllData() {
    const [data, setData] = useState('');


    function getStuff() {
        fetch('http://localhost:4500/account/all')
            .then(async (res) => {

                const data = await res.json();
                // console.log('data in useEffect', data)
                console.log('data', data)
                return setData(data);

                // (data => {
                //     console.log("data: " + data);
                //     // setData(JSON.stringify(data));
                // });
            })
    }

    useEffect(() => {
        //fetch all accounts from API
        if (data === '') { getStuff() }


    }, [data]);

    console.log('data outside useEffect', data)
    // const ctx = useContext(UserContext);
    // TODO: move the fetch to context, so context holds user data, and the action pull user data.

    if (data !== '')
        return (
            <Card
                bgcolor="primary"
                header='All Data'
                body={
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>


                    </>
                }
            />
        )
    else return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    <h5>No Data</h5>
                </>
            }
        />
    )
}
