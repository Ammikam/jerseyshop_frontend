import Head from "next/head";
import Header from "@/components/header";


export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Jersey Shop</title>
      </Head>
      <Header/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-700 mb-4">
            Welcome to <span className="font-semibold">Jersey Shop</span>, your
            ultimate destination for high-quality football jerseys! We are
            passionate about the game and believe every fan deserves to wear
            their team’s colors with pride.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            Our Mission
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>⚽ Authentic & High-Quality Jerseys sourced from top manufacturers.</li>
            <li>💰 Affordable Prices to make jerseys accessible to all fans.</li>
            <li>🚀 Fast & Reliable Delivery for a hassle-free shopping experience.</li>
            <li>📞 Excellent Customer Support because your satisfaction matters.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>🏆 Wide Collection of club, national, and retro jerseys.</li>
            <li>⚡ Secure Payments including M-Pesa, PayPal, and credit cards.</li>
            <li>📦 Hassle-Free Returns for peace of mind with every order.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Join thousands of happy fans who trust{" "}
            <span className="font-semibold">Jersey Shop</span> for their football
            merchandise. Support your team in style! ⚽🔥
          </p>
        </div>
      </div>
    <footer className="footer">
        <p>&copy; 2025 MyShop. All rights reserved.</p>
    </footer>
    </>
  );
}
