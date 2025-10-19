import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail } from '../utils/authUtils';
import { UserPlus, LogIn } from 'lucide-react';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    let hasError = false;
    if (!isValidEmail(email)) {
      setEmailError('البريد الإلكتروني غير صالح.');
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
      hasError = true;
    }

    if (hasError) return;

    try {
      await signUp(email, password);
      navigate('/products'); // Redirect to products page on successful sign-up
    } catch (err) {
      // Error handled by FirebaseContext and toast
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 pt-24"
    >
      <Card className="w-full max-w-md p-8 sm:p-10 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">إنشاء حساب جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            error={emailError}
            required
          />
          <InputField
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******** (6 أحرف على الأقل)"
            error={passwordError}
            required
          />

          {loading ? (
            <LoadingSpinner className="mt-6" />
          ) : (
            <Button type="submit" icon={UserPlus} className="w-full mt-6">
              إنشاء حساب
            </Button>
          )}

          {error && <p className="text-rose-500 text-sm mt-4">{error}</p>}
        </form>
        <p className="mt-8 text-gray-600 dark:text-gray-300">
          لديك حساب بالفعل؟
          <Link to="/signin" className="text-indigo-600 dark:text-indigo-400 hover:underline mr-2">
            <LogIn className="inline-block w-4 h-4 ml-1" /> سجل الدخول
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;
