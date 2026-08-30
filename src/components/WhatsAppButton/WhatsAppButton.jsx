import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton({ customText }) {
  const phoneNumber = '917982265845'; // Amabze Corporate Desk
  const defaultMsg = customText || 'Hello Amabze Rentals, I would like to inquire about corporate car rental / fleet booking.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatBtn}
      title="Chat with Amabze 24/7 Corporate Desk on WhatsApp"
      aria-label="WhatsApp Dispatch Desk"
    >
      <div className={styles.iconWrapper}>
        <MessageCircle size={22} className={styles.waIcon} />
      </div>
      <span className={styles.waLabel}>Quick WhatsApp Dispatch</span>
    </a>
  );
}
