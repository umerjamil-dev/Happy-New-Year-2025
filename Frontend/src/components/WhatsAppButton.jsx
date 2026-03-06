import { MessageCircle } from "lucide-react";
import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/819010521419?text=Hello%20I%20am%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 
                 flex items-center justify-center
                 w-14 h-14 
                 bg-green-500 hover:bg-green-600
                 text-white rounded-full
                 shadow-lg
                 transition-all duration-300 
                 hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;