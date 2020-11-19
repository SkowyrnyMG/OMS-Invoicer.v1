import React, { useState } from 'react';

import Layout from 'utils/layout';

import { db } from 'utils/axios-helper';

function App() {
  const [message, setMessage] = useState('');
  const [testState, setTestState] = useState('Inintial state');
  const handleGet = async () => {
    const res = await db.get('/test/testvalue.json').then(({ data }) => data);
    setTestState(res);
  };

  const ID = 'PL8822119889';

  const handlePost = async () => {
    if (message === '') return;
    await db
      .patch('/test.json', { [ID]: message })
      .then(({ data }) => console.log(data));
  };
  return (
    <Layout location='app'>
      <div>
        <header>
          <h2>{testState}</h2>
          <button onClick={handleGet}>Click me</button>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handlePost}>Send</button>
        </header>
      </div>
    </Layout>
  );
}

export default App;
