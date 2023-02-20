import React, { useEffect, useState } from "react";

const App = () => {
    const [backend, setBackend] = useState(null);
    const fetchbackend = async () => {
        const test = await fetch(`${process.env.REACT_APP_API_URL}/test`);
        const json = await test.json();
        setBackend(json);
    };

    useEffect(() => {
        fetchbackend();
    }, []);

    setInterval(() => {
        fetchbackend();
    }, 1000);

    return (
        <div>
            <h1>This is Home page Component</h1>
            <h3>{backend}</h3>
        </div>
    );
};

export default App;
