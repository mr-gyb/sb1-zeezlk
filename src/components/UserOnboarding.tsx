import React, { useState, KeyboardEvent } from 'react';
import { Apple, Mail, Phone, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserOnboarding: React.FC = () => {
  const { login, verifyUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [country, setCountry] = useState('US');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');
    if (step === 0) {
      if (!phoneNumber && !email) {
        setError('Please enter a valid phone number or email');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      if (!firstName || !lastName) {
        setError('Please enter your first and last name');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!birthday) {
        setError('Please enter your birthday');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!password) {
        setError('Please enter a password');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleFinish = () => {
    if (verifyUser(verificationCode)) {
      login({ 
        name: `${firstName} ${lastName}`, 
        email: email || undefined,
        phoneNumber: phoneNumber || undefined,
        birthday,
        notificationsEnabled
      });
      navigate('/new-chat');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleContinue();
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login logic
    console.log('Facebook login clicked');
  };

  const handleAppleLogin = () => {
    // Implement Apple login logic
    console.log('Apple login clicked');
  };

  const renderStep0 = () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Log in or sign up</h1>
      <div className="relative">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-t-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-navy-blue"
        >
          <option value="US">United States (+1)</option>
          {/* Add more country options here */}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Phone number"
        className="w-full bg-white border border-gray-300 rounded-b-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      <p className="text-xs text-gray-500 mt-2">
        We'll call or text to confirm your number. Standard message and data rates apply.
      </p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleContinue} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Continue
      </button>
      <div className="text-center text-gray-500 my-4">or</div>
      <button onClick={() => setStep(6)} className="w-full bg-white text-black border border-gray-300 rounded-full py-3 px-4 flex items-center justify-center font-semibold hover:bg-gray-50 transition duration-300">
        <Mail className="mr-2" size={20} />
        Continue with email
      </button>
      <button onClick={handleGoogleLogin} className="w-full bg-white text-black border border-gray-300 rounded-full py-3 px-4 flex items-center justify-center font-semibold hover:bg-gray-50 transition duration-300">
        <img src="/google-icon.svg" alt="Google" className="mr-2 w-5 h-5" />
        Continue with Google
      </button>
      <button onClick={handleFacebookLogin} className="w-full bg-white text-black border border-gray-300 rounded-full py-3 px-4 flex items-center justify-center font-semibold hover:bg-gray-50 transition duration-300">
        <img src="/facebook-icon.svg" alt="Facebook" className="mr-2 w-5 h-5" />
        Continue with Facebook
      </button>
      <button onClick={handleAppleLogin} className="w-full bg-white text-black border border-gray-300 rounded-full py-3 px-4 flex items-center justify-center font-semibold hover:bg-gray-50 transition duration-300">
        <Apple className="mr-2" size={20} />
        Continue with Apple
      </button>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">What's your name?</h2>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="First name"
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Last name"
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      <p className="text-xs text-gray-500">Make sure it matches the name on your government ID.</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleContinue} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Continue
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">What's your birthday?</h2>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      <p className="text-xs text-gray-500">To sign up, you need to be at least 18. Your birthday won't be shared with other people who use GYB AI.</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleContinue} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Continue
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create a password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Password"
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleContinue} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Continue
      </button>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Turn on notifications?</h2>
      <p>Don't miss important messages and updates like new business opportunities and ways to grow your business faster</p>
      <div className="flex items-center justify-between">
        <span>Get exclusive deals, personalized recommendations, and more</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleContinue} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Continue
      </button>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Verify your account</h2>
      <p>We've sent a verification code to your {phoneNumber ? 'phone number' : 'email'}. Please enter it below:</p>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Verification code"
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleFinish} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Finish
      </button>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Enter your email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Email"
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={() => setStep(1)} className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center">
        Continue
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
      </div>
    </div>
  );
};

export default UserOnboarding;