import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      <Link to="/">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
          alt="Amazon Logo" 
          className="w-28 mb-6 cursor-pointer"
        />
      </Link>
      
      <div className="border border-gray-300 rounded p-6 w-[350px] shadow-sm">
        <h1 className="text-3xl font-medium mb-4 text-[#111]">Sign in</h1>
        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-[#111]">Email or mobile phone number</label>
          <input 
            type="text" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 mb-4 focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)]"
          />
          
          <label className="font-bold text-sm mb-1 text-[#111]">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 mb-5 focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)]"
          />
          
          <button 
            type="submit"
            className="bg-[#f0c14b] border border-[#a88734] hover:bg-[#f4d078] active:bg-[#f0c14b] w-full rounded py-1 text-sm shadow-sm transition-colors cursor-pointer text-[#111]"
          >
            Continue
          </button>
        </form>
        
        <p className="text-xs text-[#111] mt-4 leading-relaxed">
          By continuing, you agree to Amazon's <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">
            Need help?
          </p>
        </div>
      </div>
      
      <div className="flex items-center w-[350px] mt-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-2 text-xs text-gray-500">New to Amazon?</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      <button 
        className="mt-4 w-[350px] bg-[#e7e9ec] border border-[#adb1b8] hover:bg-[#d3d6db] active:bg-[#e7e9ec] rounded py-1.5 text-sm shadow-sm transition-colors cursor-pointer text-[#111]"
      >
        Create your Amazon account
      </button>
    </div>
  );
}

export default LoginPage;
