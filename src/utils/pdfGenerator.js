import { jsPDF } from 'jspdf';

export function generateQuotePDF(booking) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [15, 23, 42]; // #0F172A (Navy)
  const accentColor = [184, 143, 77]; // Gold
  const grayText = [100, 116, 139]; // Slate 500

  // ── Header Box ──
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 36, 'F');

  // Brand Name & Tagline
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('AMABZE RENTALS PVT. LTD.', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(184, 143, 77);
  doc.text('PREMIUM CORPORATE CHAUFFEUR & FLEET SOLUTIONS (EST. 2013)', 14, 22);

  doc.setFontSize(8);
  doc.setTextColor(200, 210, 225);
  doc.text('Regd. Off: No-S 4, Leisure Valley Park, Sector-29, Gurugram, HR - 122001', 14, 28);
  doc.text('Tel: 0124 4974856 | 24x7 Desk: +91 7982265845 | Email: reservation@amabzerentals.com', 14, 32);

  // ── Title Bar ──
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 42, 182, 14, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, 42, 182, 14, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('OFFICIAL BOOKING ESTIMATE & FLEET SPECIFICATION', 18, 51);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...accentColor);
  const refText = `REF: ${booking.reference_id || booking.referenceId || 'AMB-2026-EST'}`;
  doc.text(refText, 145, 51);

  // ── Client & Trip Details Grid ──
  let y = 64;

  const drawRow = (label1, val1, label2, val2) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...grayText);
    doc.text(label1, 14, y);
    if (label2) doc.text(label2, 110, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text(String(val1 || '—'), 14, y + 5);
    if (label2) doc.text(String(val2 || '—'), 110, y + 5);

    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 8, 196, y + 8);
    y += 14;
  };

  drawRow('CLIENT / PASSENGER NAME:', booking.name, 'ORGANIZATION / COMPANY:', booking.company || 'Corporate Client');
  drawRow('CONTACT EMAIL:', booking.email, 'PRIMARY CONTACT PHONE:', booking.phone);
  drawRow('SERVICE CATEGORY:', (booking.service_type || booking.serviceType || 'Chauffeur Drive').toUpperCase(), 'SCHEDULED DATE & REPORTING:', booking.date || 'Immediate / On Call');
  drawRow('PICKUP LOCATION:', booking.pickup, 'DESTINATION / ROUTE:', booking.destination || 'As Directed');
  drawRow('PASSENGER GROUP SIZE:', booking.passengers || '1-4', 'ESTIMATED VEHICLE CATEGORY:', booking.vehicle_category || 'Executive Fleet Standard');

  if (booking.notes) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...grayText);
    doc.text('SPECIAL INSTRUCTIONS & LOGISTICS NOTES:', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    const splitNotes = doc.splitTextToSize(booking.notes, 182);
    doc.text(splitNotes, 14, y + 5);
    y += (splitNotes.length * 4) + 8;
  }

  // ── Standard Executive In-Cabin Inclusions ──
  y += 4;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text('STANDARD ENTERPRISE FLEET INCLUSIONS & AMENITIES', 18, y + 5.5);
  y += 12;

  const inclusions = [
    '• Real-time GPS Telematics with In-Cabin SOS Panic Button',
    '• Certified Commercial Fire Extinguisher & First Aid Kit',
    '• Verified, Uniformed Chauffeur with Defensive Driving Certification',
    '• Fast Mobile Chargers (Multi-port) & In-Cabin Air Freshener',
    '• Daily Business Newspapers & Executive Umbrella',
    '• 24x7 Pan-India Control Desk Monitoring & SLA Tracking',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  inclusions.forEach((inc, i) => {
    const col = i % 2 === 0 ? 16 : 110;
    const rowY = y + Math.floor(i / 2) * 5;
    doc.text(inc, col, rowY);
  });
  y += 20;

  // ── SLA & Contact Note ──
  doc.setDrawColor(184, 143, 77);
  doc.setFillColor(254, 252, 246);
  doc.roundedRect(14, y, 182, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14);
  doc.text('OPERATIONAL RESPONSE & SLA COMMITMENT', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(75, 85, 99);
  doc.text('1. Our central operations team is processing this booking request and will contact you within 2-3 hours.', 18, y + 11);
  doc.text('2. If you do not hear from our team within 24 hours, or require urgent positioning, call 0124 4974856 / +91 7982265845.', 18, y + 15);
  doc.text('3. Rates are billed based on actual garage-to-garage distance & statutory toll/parking receipts with GST invoicing.', 18, y + 19);

  // ── Footer ──
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(...grayText);
  doc.text('Generated electronically by Amabze Unified Fleet Command Portal • www.amabzerentals.com', 14, 288);
  doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 150, 288);

  // Trigger download
  const filename = `Amabze-Quote-${booking.reference_id || booking.referenceId || 'Booking'}.pdf`;
  doc.save(filename);
}
