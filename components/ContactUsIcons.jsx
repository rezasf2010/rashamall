import { SocialIcon } from 'react-social-icons';

const ContactUsIcons = () => {
  const iconStyle = { width: '30px', height: '30px' }; // Adjust the size as needed

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <SocialIcon url="https://wa.me/+989121263796" network="whatsapp" style={iconStyle} />
      <SocialIcon url="mailto:reza_sf@yahoo.com" network="email" style={iconStyle} />
      <SocialIcon url="https://t.me/reza_sf88" style={iconStyle} />
      <SocialIcon url="https://instagram.com/reza_sf" style={iconStyle} />
    </div>
  );
};

export default ContactUsIcons;
