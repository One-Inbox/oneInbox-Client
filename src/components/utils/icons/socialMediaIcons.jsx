import React from "react";
// este archivo de deberia oder usar para asignar iconos de redes sociales a los mensajes
const SocialMediaIcons = ({ socialMedia }) => {
  const socialMediaName = Array.isArray(socialMedia)
    ? socialMedia[0]
    : socialMedia;
  //console.log("socialMediaName recibido:", socialMediaName);

  return (
    <div>
      {socialMediaName === "INSTAGRAM" ? (
        <img src="/socialMediaImage/instagram.svg" alt="Instagram" />
      ) : socialMediaName === "TELEGRAM" ? (
        <img src="/socialMediaImage/telegram.svg" alt="Telegram" />
      ) : socialMediaName === "MERCADO LIBRE" ? (
        <img src="/socialMediaImage/mercadoLibre.svg" alt="Mercado Libre" />
      ) : socialMediaName === "WHATSAPP" ? (
        <img src="/socialMediaImage/whatsapp.svg" alt="WhatsApp" />
      ) : socialMediaName === "MESSENGER" || socialMediaName === "FACEBOOK" ? (
        <img src="/socialMediaImage/facebook.svg" alt="Facebook" />
      ) : (
        <img src="/logos/iconoLogoAzul.svg" alt="Red Social" />
      )}
    </div>
  );
};

export default SocialMediaIcons;
