import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseApp from './firebaseConfig';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(firstname !== '' && lastname !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
      const auth = getAuth(firebaseApp);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: `${firstname} ${lastname}`
          })
          // ...
          console.log('successfully created an account!');
          console.log(user);

          navigate('/sign-in');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setError(errorMessage);
          setLoading(false);
          // ..
        });
    } else{
      setError('Incorrect or missing credentials!');
      setLoading(false);
    }
  }

  return (
    <section className='flex justify-center pt-24 pb-10 px-5 min-h-[90vh]'>
      <div className='w-[550px] max-sm:w-full'>
        <h1 className='text-center font-bold tracking-wider text-2xl pt-5 pb-2'>Sign Up</h1>
        <form className='flex flex-col' onSubmit={handleRegister}>
          <div className="flex max-md:flex-col md:gap-2 md:mx-5 md:my-2">
            {/* md:gap-2 md:mx-5 md:my-3 */}
            <input 
              className='bg-gray-200 md:flex-1 p-3 max-md:mx-5 max-md:my-2 rounded-md' 
              type="text" 
              placeholder='First Name' 
              value={firstname} 
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input 
              className='bg-gray-200 md:flex-1 p-3 max-md:mx-5 max-md:my-2 rounded-md' 
              type="text" 
              placeholder='Last Name'  
              value={lastname} 
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          {/* <input 
            className='bg-gray-200 p-3 mx-5 my-3 rounded-md' 
            type="text" 
            placeholder='First Name' 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input 
            className='bg-gray-200 p-3 mx-5 my-3 rounded-md' 
            type="text" 
            placeholder='Last Name'  
            value={lastname} 
            onChange={(e) => setLastname(e.target.value)}
          /> */}

          <input 
            className='bg-gray-200 p-3 mx-5 my-2 rounded-md' 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className='bg-gray-200 p-3 mx-5 my-2 rounded-md' 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            className='bg-gray-200 p-3 mx-5 my-2 rounded-md' 
            type="password" 
            placeholder='Confirm Password' 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          {
            error && <p className="text-red-600 text-sm mx-5 my-2">{error}</p>
          }

          <button 
            type="submit"
            className='mx-5 mt-2 p-3 rounded-md bg-[#020F10] hover:scale-105 duration-300 text-white'
          >
            { loading ? 'Loading...' : 'Sign Up' }
          </button>
        </form>
        <p className='p-5 font-[500]'>
          Already have an Account? 
          <Link to='/sign-in' className='text-blue-700 hover:underline'> Sign In</Link>
        </p>
      </div>
    </section> 
  )
}

export default SignUp