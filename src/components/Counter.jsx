import { useState, useEffect } from 'react';

function Counter() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        document.title = `Counter ${counter}`;
    }, [counter]);

    return (
        <div>
            <p>Hello: {counter}</p>
            <button onClick={() => setCounter(counter + 1)}>+</button>
            <button onClick={() => setCounter(counter - 1)}>-</button>
        </div>
    );
}

export default Counter;