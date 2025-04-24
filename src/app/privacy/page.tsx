'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function PrivacyPolicyPage() {
  return (
    <PageLayout 
      title="Privacy Policy"
      description="How we protect and handle your data"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-white/80">
            This is where the Privacy Policy will live. We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <p className="text-white/80">
            We collect information that you provide directly to us, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Account information (email, username)</li>
            <li>Profile information</li>
            <li>Content you create and share</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p className="text-white/80">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Provide and maintain our services</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-white/80">
            If you have any questions about this Privacy Policy, please contact us at privacy@dormlit.com
          </p>
        </section>
      </div>
    </PageLayout>
  );
} 