

const Footer = () => {
    return (
      <footer className="bg-black text-gray-400 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
          {/* Column 1 */}
          <div className="mb-8 sm:mb-0">
            <h2 className="text-lg font-bold mb-4">Drop-N-GO</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:text-gray-300">About Us</a></li>
              <li><a href="/" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="/" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </div>
  
          {/* Column 2 */}
          <div className="mb-8 sm:mb-0">
            <h2 className="text-lg font-bold mb-4">Services</h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Delivery</a></li>
              <li><a href="/" className="hover:text-gray-300">Pickup</a></li>
              <li><a href="/" className="hover:text-gray-300">Track Order</a></li>
            </ul>
          </div>
  
          {/* Column 3 */}
          <div className="mb-8 sm:mb-0">
            <h2 className="text-lg font-bold mb-4">Legal</h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-gray-300">Terms of Service</a></li>
            </ul>
          </div>
  
          {/* Column 4 */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <address className="text-sm">
              123 Main Street<br />
              City, State, ZIP<br />
              <a href="tel:+1234567890" className="hover:text-gray-300">+1 (234) 567-890</a><br />
              <a href="mailto:info@example.com" className="hover:text-gray-300">info@example.com</a>
            </address>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-600 pt-4 flex items-center justify-between">
          <p>&copy; 2024 DROP-N-GO. All rights reserved. Created BY Themiancious</p>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-400 hover:text-gray-300"><span className="sr-only">Facebook</span><i className="fab fa-facebook"></i></a>
            <a href="/" className="text-gray-400 hover:text-gray-300"><span className="sr-only">Twitter</span><i className="fab fa-twitter"></i></a>
            <a href="/" className="text-gray-400 hover:text-gray-300"><span className="sr-only">Instagram</span><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  