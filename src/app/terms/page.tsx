'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout 
      title="Terms of Service"
      description="Our rules and guidelines"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
          <p className="text-white/80">
            This is where the Terms of Service will live. By accessing or using our services, you agree to be bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
          <p className="text-white/80">
            As a user of our platform, you agree to:
          </p>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Provide accurate account information</li>
            <li>Maintain the security of your account</li>
            <li>Not violate any applicable laws or regulations</li>
            <li>Respect other users' rights and privacy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Content Guidelines</h2>
          <p className="text-white/80">
            When creating and sharing content, you must:
          </p>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Own or have rights to the content you share</li>
            <li>Not post harmful or offensive material</li>
            <li>Not infringe on intellectual property rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
          <p className="text-white/80">
            For questions about these terms, please contact us at terms@dormlit.com
          </p>
        </section>
      </div>
    </PageLayout>
  );
} 