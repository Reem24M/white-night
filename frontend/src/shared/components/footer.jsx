import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-white pt-16 pb-8 px-6 font-sans border-t border-gray-100">

            {/* GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Column 1 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-wider">
                        ÉLITE<span className="text-[#D4AF37]">EVENTS</span>
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                        Crafting unforgettable celebrations with elegance and sophistication since 2010.
                    </p>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
                    <ul className="space-y-3 text-gray-500">
                        <li><Link to="/about" className="hover:text-[#D4AF37]">About Us</Link></li>
                        <li><Link to="/venues" className="hover:text-[#D4AF37]">Our Venues</Link></li>
                        <li><Link to="/services" className="hover:text-[#D4AF37]">Services</Link></li>
                        <li><Link to="/gallery" className="hover:text-[#D4AF37]">Gallery</Link></li>
                        <li><Link to="/testimonials" className="hover:text-[#D4AF37]">Testimonials</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-gray-500">
                            <Phone size={18} className="text-[#D4AF37]" />
                            <span>(555) 123-4567</span>
                        </li>

                        <li className="flex items-center gap-3 text-gray-500">
                            <Mail size={18} className="text-[#D4AF37]" />
                            <span>info@eliteevents.com</span>
                        </li>

                        <li className="flex items-start gap-3 text-gray-500">
                            <MapPin size={18} className="text-[#D4AF37] mt-1" />
                            <span>123 Celebration Lane<br />New York, NY 10001</span>
                        </li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>

                    <div className="flex gap-4">
                        {[FaInstagram, FaFacebook, FaTwitter].map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#FDF7F2] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-100 text-center text-gray-400 text-sm">
                <p>© 2026 Élite Events. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;