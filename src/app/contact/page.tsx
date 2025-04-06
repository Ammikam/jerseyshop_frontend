import Head from "next/head";
import Header from "@/components/header";

export default function Contact() {
  return (
    
    <>
      <Head>
        <title>Contact Us | Jersey Shop</title>
      </Head>
      <Header/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-700 mb-4">
            We’d love to hear from you! Whether you have questions about our
            products, orders, or anything else, feel free to reach out.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            📞 Customer Support
          </h2>
          <ul className="text-gray-700 space-y-2 mt-2">
            <li>📱 <strong>Phone:</strong> +254 712 345 678</li>
            <li>💬 <strong>WhatsApp:</strong> +254 712 345 678</li>
            <li>📧 <strong>Email:</strong> support@jerseyshop.com</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            📍 Visit Our Store
          </h2>
          <p className="text-gray-700 mt-2">
            <strong>Location:</strong> Nairobi, Kenya <br />
            <strong>Opening Hours:</strong>
          </p>
          <ul className="text-gray-700 space-y-2 mt-2">
            <li>🕘 Monday – Friday: 9:00 AM – 6:00 PM</li>
            <li>🕙 Saturday: 10:00 AM – 4:00 PM</li>
            <li>🚪 Sunday: Closed</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            📬 Follow Us on Social Media
          </h2>
          <ul className="text-gray-700 space-y-2 mt-2">
            <li>📘 <a href="#" className="text-blue-500 hover:underline">Facebook</a></li>
            <li>📷 <a href="#" className="text-pink-500 hover:underline">Instagram</a></li>
            <li>🐦 <a href="#" className="text-blue-400 hover:underline">Twitter</a></li>
          </ul>

          <p className="text-gray-700 mt-6">
            Need help? Drop us a message anytime! ⚽🔥
          </p>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2025 MyShop. All rights reserved.</p>
      </footer>
    </>
  );
}
