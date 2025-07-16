    import React from 'react'

    function Footer() {
    return (
        <>
        <footer className="bg-blue-950 text-white">
    <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
            <h3 className="text-xl font-bold mb-4">🔆 Clarify</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
            Your ultimate study companion. Focus, collaborate, and achieve more with AI-powered tools in your virtual learning space.
            </p>
        </div>

        {/* Quick Links */}
        <div>
            <h3 className="text-xl font-bold mb-4">🔗 Quick Links</h3>
            <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="#features" className="hover:text-yellow-300 transition">Features</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Contact Us</a></li>
            </ul>
        </div>

        {/* Social Media */}
        <div>
            <h3 className="text-xl font-bold mb-4">📣 Follow Us</h3>
            <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="#" className="hover:text-yellow-300 transition" aria-label="Twitter">
                <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="hover:text-yellow-300 transition" aria-label="Instagram">
                <i className="fab fa-instagram"></i> Instagram
            </a>
            </div>
        </div>
        </div>
    </div>

    {/* Divider */}
    <div className="border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Clarify. All rights reserved.</p>
        <p>
            <a href="#" className="hover:text-yellow-300">Privacy Policy</a> |{" "}
            <a href="#" className="hover:text-yellow-300">Terms of Service</a>
        </p>
        </div>
    </div>
    </footer>
        </>
    )
    }

    export default Footer
