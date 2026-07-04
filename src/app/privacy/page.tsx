export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-midnight py-20">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <h1 className="font-serif text-3xl md:text-4xl text-soft-white mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-mist-gray">
          <p className="mb-4">
            Personal Metadata is committed to protecting your privacy. This policy explains
            how we handle your data.
          </p>
          <h2 className="text-soft-white text-xl mt-8 mb-4">What we collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>First name (for personalization)</li>
            <li>Last name (optional, for numerology calculations)</li>
            <li>Birth date (for symbolic calculations)</li>
            <li>Birth time and location (optional, for future features)</li>
            <li>Email address (to deliver your report)</li>
          </ul>
          <h2 className="text-soft-white text-xl mt-8 mb-4">How we use it</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To generate your personalized symbolic report</li>
            <li>To email you the report link</li>
            <li>To send occasional updates (only if you opt in)</li>
          </ul>
          <h2 className="text-soft-white text-xl mt-8 mb-4">What we do not do</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We never sell your data</li>
            <li>We never share your data with third parties for marketing</li>
            <li>We do not use your data for advertising profiling</li>
          </ul>
          <h2 className="text-soft-white text-xl mt-8 mb-4">Your rights</h2>
          <p className="mb-4">
            You can request deletion of your data at any time by emailing us at
            privacy@personalmetadata.com. We will delete all associated records within
            30 days.
          </p>
          <h2 className="text-soft-white text-xl mt-8 mb-4">Data retention</h2>
          <p className="mb-4">
            We retain your report data for 12 months so you can access it again. After
            that, it is automatically deleted unless you request earlier removal.
          </p>
        </div>
      </div>
    </main>
  );
}
