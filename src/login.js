import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [messageStatus, setMessageStatus] = useState(null); // Nowy stan lokalny


    const [form, setForm] = useState({
        login: '',
        pass: ''
      });

    const handleChange = e => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
    };



  const handleSubmit = async (event) => {
    event.preventDefault();


    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setMessageStatus(data.message);
        // alert(`${data.message}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });



    // Miejsce na funkcję logowania, która powinna zwrócić promise
    // Na przykład:
    // try {
    //   await loginUser(username, password);
    //   navigate('/dashboard');
    // } catch (error) {
    //   // Obsłuż błąd logowania
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='AB'>{messageStatus && <div className='msg-color'>{messageStatus}</div>}</div>
      <label>
        Username:
        <input type="text" name="username" onChange={handleChange}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
