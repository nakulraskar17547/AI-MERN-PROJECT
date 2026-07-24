import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Verify payment and add credits
    const verifyAndRefetch = async () => {
      if (sessionId) {
        try {
          // Call verify endpoint to add credits
          await axios.post(
            `${serverUrl}/api/billing/verify`,
            { sessionId },
            { withCredentials: true }
          );
        } catch (error) {
          console.log('Error verifying payment:', error);
        }
      }

      // Refetch user data to get updated credits
      try {
        const response = await axios.get(`${serverUrl}/api/user/me`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data));
      } catch (error) {
        console.log('Error refetching user:', error);
      }
    };

    verifyAndRefetch();

    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, dispatch, sessionId]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <CheckCircle size={80} className="text-green-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-zinc-400 mb-6">
          Your credits have been added to your account.
        </p>
        <p className="text-sm text-zinc-500 mb-8">
          Redirecting to dashboard in 3 seconds...
        </p>
        
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
        >
          Go to Dashboard Now
        </button>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
