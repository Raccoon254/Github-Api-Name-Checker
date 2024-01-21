import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setUserData(null); // Reset userData

    const name = e.target.name.value;
    if (name) {
      const url = `https://api.github.com/users/${name}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          alert('Request aborted');
        }else{
          alert('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  if (loading) {
    return (
      <div className='flex w-full justify-center items-center'>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className='flex w-full ml-4 flex-col justify-center items-center'>
            {userData && (
        <div className='text-sm'>
          <img className='rounded-lg w-64' src={userData.avatar_url} alt={userData.login} />
          <p>{userData.name}</p>
          <p>{userData.bio}</p>
        </div>
      )}
      <form className='flex w-64 justify-center items-center flex-col gap-2' onSubmit={handleSubmit} method="post">
        <label htmlFor="name">Enter name</label>
        <input id='name' className='input w-full input-primary' type="text" name="name" />
        <button className='btn w-full btn-primary' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
