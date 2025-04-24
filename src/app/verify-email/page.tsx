'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import DreamyLayout from '@/components/DreamyLayout';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, sendVerificationEmail, verifyEmail } = useAuth();
  const searchParams = useSearchParams();
  const code = searchParams.get('oobCode');

  React.useEffect(() => {
    const handleVerification = async () => {
      if (code) {
        setIsLoading(true);
        try {
          await verifyEmail(code);
          setSuccess(true);
        } catch (err: any) {
          setError(err.message || 'Failed to verify email');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleVerification();
  }, [code, verifyEmail]);

  const handleResendVerification = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await sendVerificationEmail();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DreamyLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </DreamyLayout>
    );
  }

  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Verify Your Email</h2>
            
            {success ? (
              <div className="text-center space-y-4">
                <p className="text-white/80">
                  {code 
                    ? 'Email verified successfully!'
                    : 'Verification email sent! Check your inbox.'}
                </p>
                <a 
                  href="/profile"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Go to Profile
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/80 text-center">
                  Please verify your email address to access all features.
                </p>

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleResendVerification}
                  className="btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Sending verification email...
                    </div>
                  ) : (
                    'Resend Verification Email'
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DreamyLayout>
  );
} 