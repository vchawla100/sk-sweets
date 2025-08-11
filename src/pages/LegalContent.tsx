import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-orange-700 mb-6 mt-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: July 8, 2025</p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">1. Introduction</h2>
      <p className="mb-5">
        SK Sweets Ltd. ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">2. Information We Collect</h2>
      <p className="mb-5">
        We collect personal and business information including your name, business name, email, address, phone number, and tax identification numbers.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">3. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-5 space-y-2">
        <li>To process orders and payments</li>
        <li>To communicate regarding your account or order</li>
        <li>To comply with legal and regulatory obligations</li>
        <li>To improve our services and offerings</li>
      </ul>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">4. Sharing of Information</h2>
      <p className="mb-5">
        We may share your data with shipping providers, payment processors, and government authorities when required by law.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">5. Data Retention</h2>
      <p className="mb-5">
        We retain your data only for as long as necessary to fulfill the purposes outlined in this policy or comply with legal obligations.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">6. Your Rights</h2>
      <p className="mb-5">
        You can request access to, correction of, or deletion of your personal data at any time by emailing us at <a href="mailto:privacy@sksweets.com" className="text-orange-600 underline">privacy@sksweets.com</a>.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">7. Cookies</h2>
      <p className="mb-5">
        We use cookies for analytics and to improve user experience. You can disable cookies in your browser settings.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">8. Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@sksweets.com" className="text-orange-600 underline">info@sksweets.com</a>.
      </p>
    </section>
  );
};

export default PrivacyPolicy;

