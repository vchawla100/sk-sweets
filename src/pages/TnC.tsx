import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-orange-700 mb-6 mt-6">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: July 8, 2025</p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">1. Company Overview</h2>
      <p className="mb-5">
        SK Sweets Ltd. is a Canadian wholesale business that supplies Indian sweets and snacks to licensed businesses across Canada.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">2. Eligibility</h2>
      <p className="mb-5">
        Our services are intended only for registered businesses and individuals aged 18 or older with a valid business license or tax number.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">3. Account Registration</h2>
      <p className="mb-5">
        Customers must register an account using accurate and complete business details. We may verify this information.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">4. Orders and Payments</h2>
      <ul className="list-disc list-inside mb-5 space-y-2">
        <li>Pricing information will be provided upon request</li>
        <li>Applicable taxes (GST/HST) will be applied</li>
        <li>Payments can be made via secure online methods</li>
        <li>We reserve the right to cancel orders due to unavailability</li>
      </ul>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">5. Shipping and Delivery</h2>
      <p className="mb-5">
        We deliver across Canada using third-party logistics. Delivery timelines vary. We are not liable for delays outside our control.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">6. Returns and Refunds</h2>
      <p className="mb-5">
        Due to the perishable nature of our products, we only accept returns for damaged or incorrect items reported within 48 hours of delivery.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">7. Intellectual Property</h2>
      <p className="mb-5">
        All content on SKSweets.com is owned by SK Sweets Ltd. and protected by intellectual property laws. Unauthorized use is prohibited.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">8. Governing Law</h2>
      <p className="mb-5">
        These terms are governed by the laws of Ontario, Canada. Disputes shall be handled within the provincial jurisdiction.
      </p>

      <h2 className="text-xl font-semibold text-orange-700 mb-3">9. Updates</h2>
      <p>
        We may update these Terms at any time. Please review this page regularly for changes.
      </p>
    </section>
  );
};

export default TermsOfService;
