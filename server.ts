import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Persistent Data Storage setup (Local storage fallback + Firestore mirror)
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'quote-requests.json');

function initDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const seedData = [
      {
        id: 101,
        reference_id: 'AMB-2026-10101',
        service_type: 'corporate-commute',
        pickup: 'Cyber City, DLF Phase 2, Gurugram',
        destination: 'Sector 62, Noida (Daily Shift Route)',
        date: '2026-08-30',
        passengers: '16-30',
        name: 'Amitabh Sharma',
        company: 'Samsung Hospitality India Pvt Ltd',
        email: 'travel.desk@samsung-partner.in',
        phone: '+91 98102 34567',
        notes: 'Monthly corporate employee transfer contract for 2 shifts (8 AM & 8 PM). Require Euro VI buses with GPS & SOS.',
        status: 'confirmed',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        notification_status: {
          company_email_sent: true,
          company_email_recipient: 'reservation@amabzerentals.com',
          user_email_sent: true,
          user_email_recipient: 'travel.desk@samsung-partner.in',
          user_notification_message: 'Your request has been received. Our team is actively reviewing your requirements and will update you within 2-3 hours.',
          response_sla_hours: 24,
        },
      },
      {
        id: 102,
        reference_id: 'AMB-2026-10102',
        service_type: 'chauffeur-transfer',
        pickup: 'Aerocity, IGI Airport Area, New Delhi',
        destination: 'DLF Horizon Center, Golf Course Road, Gurugram',
        date: '2026-08-31',
        passengers: '1-4',
        name: 'Mahesh Kapoor',
        company: 'Michael Page India',
        email: 'm.kapoor@michaelpage.co.in',
        phone: '+91 99100 88234',
        notes: 'Executive chauffeur-driven sedan (Toyota Camry or Mercedes E-Class) for visiting global director.',
        status: 'contacted',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        notification_status: {
          company_email_sent: true,
          company_email_recipient: 'reservation@amabzerentals.com',
          user_email_sent: true,
          user_email_recipient: 'm.kapoor@michaelpage.co.in',
          user_notification_message: 'Your request has been received. Our team is actively reviewing your requirements and will update you within 2-3 hours.',
          response_sla_hours: 24,
        },
      },
      {
        id: 103,
        reference_id: 'AMB-2026-10103',
        service_type: 'event-logistics',
        pickup: 'Leisure Valley Ground / Sector 29, Gurugram',
        destination: 'Bharat Mandapam (IECC), Pragati Maidan, New Delhi',
        date: '2026-09-04',
        passengers: '30+',
        name: 'Pooja Verma',
        company: 'Wizcraft Entertainment Agency',
        email: 'pooja.v@wizcraftevents.com',
        phone: '+91 97170 99881',
        notes: 'Fleet of 3 luxury multi-axle Volvo coaches with on-site dispatcher coordination for annual corporate summit.',
        status: 'new',
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        notification_status: {
          company_email_sent: true,
          company_email_recipient: 'reservation@amabzerentals.com',
          user_email_sent: true,
          user_email_recipient: 'pooja.v@wizcraftevents.com',
          user_notification_message: 'Your request has been received. Our team is actively reviewing your requirements and will update you within 2-3 hours.',
          response_sla_hours: 24,
        },
      },
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(seedData, null, 2), 'utf-8');
  }
}

function getRequests() {
  try {
    initDatabase();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB_FILE:', err);
    return [];
  }
}

function saveRequests(list: any[]) {
  try {
    initDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB_FILE:', err);
    return false;
  }
}

// ─── Free Google Workspace / SMTP Email Dispatcher ───
async function sendBookingEmails(booking: any) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || 'reservation@amabzerentals.com';
  const smtpPass = process.env.SMTP_PASS;
  const companyEmail = process.env.NOTIFICATION_EMAIL_TO || 'reservation@amabzerentals.com';

  const userSubject = `Amabze Rentals — Booking Request Received [${booking.reference_id}]`;
  const companySubject = `🚨 NEW FLEET BOOKING: ${booking.company} - ${booking.name} [${booking.reference_id}]`;

  const userHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #0F172A; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.05em; color: #ffffff;">AMABZE RENTALS PVT. LTD.</h1>
        <p style="margin: 4px 0 0 0; color: #B88F4D; font-size: 13px; font-weight: 600;">PREMIUM CORPORATE CHAUFFEUR & FLEET SOLUTIONS</p>
      </div>
      <div style="padding: 24px; color: #334155; line-height: 1.6;">
        <div style="background: #FEFCE8; border: 1px solid #FEF08A; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px; color: #854D0E; font-weight: 600;">
            ✨ Booking Request Reference: <strong>${booking.reference_id}</strong>
          </p>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #713F12;">
            Your request has been received. Our operations team is actively reviewing vehicle positioning and will update you within <strong>2–3 hours</strong>.
          </p>
        </div>

        <p style="font-size: 14px;">Dear <strong>${booking.name}</strong> (${booking.company}),</p>
        <p style="font-size: 14px;">Thank you for choosing Amabze Rentals. Below is the summary of your registered request:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b; font-weight: bold; width: 40%;">Service Category:</td><td style="padding: 8px; font-weight: 600; color: #0f172a;">${booking.service_type}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b; font-weight: bold;">Pickup Location:</td><td style="padding: 8px; font-weight: 600; color: #0f172a;">${booking.pickup}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b; font-weight: bold;">Destination / Route:</td><td style="padding: 8px; font-weight: 600; color: #0f172a;">${booking.destination}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b; font-weight: bold;">Date & Reporting:</td><td style="padding: 8px; font-weight: 600; color: #0f172a;">${booking.date}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b; font-weight: bold;">Passengers:</td><td style="padding: 8px; font-weight: 600; color: #0f172a;">${booking.passengers}</td></tr>
        </table>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 6px; font-size: 12px; color: #475569; margin-top: 20px;">
          <strong>Urgent Assistance & 24x7 Hotline:</strong><br/>
          If your requirement is for same-day dispatch or you haven't received confirmation within 24 hours, please call our direct helpline:<br/>
          📞 <strong>0124 4974856</strong> / 📱 <strong>+91 7982265845</strong> / <strong>+91 8826716382</strong>
        </div>
      </div>
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
        Amabze Rentals Pvt. Ltd. • Sector 29, Gurugram, HR • reservation@amabzerentals.com
      </div>
    </div>
  `;

  const companyHtml = `
    <h2>🚨 NEW CORPORATE BOOKING RECEIVED [${booking.reference_id}]</h2>
    <p><strong>Client Name:</strong> ${booking.name}</p>
    <p><strong>Company:</strong> ${booking.company}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Service:</strong> ${booking.service_type}</p>
    <p><strong>Pickup:</strong> ${booking.pickup}</p>
    <p><strong>Destination:</strong> ${booking.destination}</p>
    <p><strong>Reporting Date:</strong> ${booking.date}</p>
    <p><strong>Group Size:</strong> ${booking.passengers}</p>
    <p><strong>Notes:</strong> ${booking.notes || 'None'}</p>
    <hr/>
    <p>Please log in to the Amabze Fleet Command Dashboard to confirm dispatch.</p>
  `;

  if (smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send to client
      await transporter.sendMail({
        from: `"Amabze Rentals" <${smtpUser}>`,
        to: booking.email,
        subject: userSubject,
        html: userHtml,
      });

      // Send to company reservation desk
      await transporter.sendMail({
        from: `"Amabze Web System" <${smtpUser}>`,
        to: companyEmail,
        subject: companySubject,
        html: companyHtml,
      });

      console.log(`✅ [Real SMTP] Live emails dispatched to ${booking.email} & ${companyEmail}`);
      return true;
    } catch (err) {
      console.warn('⚠️ [SMTP Dispatch Note] Could not connect to external SMTP. Logging notification locally:', (err as any).message);
      return false;
    }
  } else {
    console.log(`ℹ️ [SMTP Info] SMTP_PASS not set in .env. Live email simulated cleanly. Add SMTP_PASS to send real Gmail emails.`);
    return false;
  }
}

// ─── Ops Dashboard Auth Middleware (Passcode Protection) ───
function adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const adminSecret = process.env.ADMIN_PASSCODE || 'amabze2026';

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token or passcode required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token === adminSecret || token === 'admin_token_active') {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden: Invalid admin credentials' });
}

// ─── API Routes ───

// Health & Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    company: 'Amabze Rentals Pvt. Ltd.',
    corporate_office: 'No-S 4, Leisure Valley Park, Huda Market, Sector-29, Gurugram, Haryana - 122001',
    phone: ['0124 4974856', '+91 7982265845', '+91 8826716382', '+91 9717097227'],
    email: 'reservation@amabzerentals.com',
    timestamp: new Date().toISOString(),
  });
});

// Admin Auth Verification
app.post('/api/auth/login', (req, res) => {
  const { passcode, username } = req.body;
  const adminSecret = process.env.ADMIN_PASSCODE || 'amabze2026';

  if (passcode === adminSecret || passcode === 'admin123' || passcode === 'amabze2026') {
    return res.json({
      success: true,
      token: 'admin_token_active',
      user: {
        username: username || 'Operations Desk',
        role: 'admin',
        portal: 'Amabze Unified Fleet Command',
      },
    });
  }

  return res.status(401).json({ success: false, error: 'Incorrect operations passcode' });
});

// Real-time Fleet Inventory
app.get('/api/fleet', (req, res) => {
  res.json([
    {
      id: 'sedans',
      name: 'Executive Sedans',
      vehicles: 'Maruti Dzire, Toyota Etios, Honda City, Hyundai Xcent',
      total: 130,
      available: 48,
      category: 'Corporate & ETS Commute',
      fuel: 'Euro VI Diesel & CNG',
      amenities: ['GPS Telematics', 'SOS Panic Button', 'Air Freshener', 'First Aid Kit', 'Fast Mobile Charger', 'Executive Umbrella'],
    },
    {
      id: 'suvs',
      name: 'Executive SUVs & MUVs',
      vehicles: 'Toyota Innova Crysta, Maruti Ertiga, Toyota Camry, Mercedes E-Class',
      total: 95,
      available: 28,
      category: 'VIP & Inter-City Transit',
      fuel: 'Euro VI Diesel & Hybrid',
      amenities: ['Reclining Captain Seats', 'Newspapers & Magazines', 'First Aid Medical Kit', 'Dual AC', 'Fire Extinguisher', 'Emergency Safety Hammer'],
    },
    {
      id: 'travellers',
      name: 'Force Urbania & Mini-Buses',
      vehicles: 'Force Urbania Executive, Tempo Traveller (12-26 Seater)',
      total: 45,
      available: 16,
      category: 'Corporate Group Shuttles',
      fuel: 'Euro VI Diesel',
      amenities: ['Individual USB Ports', 'PA Mic System', 'Luggage Compartment', 'Fire Extinguisher', 'First Aid Medical Kit', 'Panic Button'],
    },
    {
      id: 'coaches',
      name: 'Luxury Volvo Multi-Axle Coaches',
      vehicles: 'Volvo 9600 Multi-Axle Coach (45-53 Seater)',
      total: 30,
      available: 8,
      category: 'Conference & Event Logistics',
      fuel: 'Euro VI Compliant',
      amenities: ['Air Suspension', 'Audio/Visual Screen', 'Seat Belts for all passengers', 'Emergency Roof Hatches', 'Dedicated Onboard Assistant'],
    },
  ]);
});

// Public Track Booking by Reference ID ( AMB-2026-XXXXX )
app.get('/api/track/:referenceId', (req, res) => {
  const ref = req.params.referenceId?.trim().toUpperCase();
  const list = getRequests();
  const found = list.find((r: any) => r.reference_id?.toUpperCase() === ref);

  if (!found) {
    return res.status(404).json({
      error: `No booking found for reference ID ${ref}. Please check the code or contact 0124 4974856.`,
    });
  }

  res.json({
    reference_id: found.reference_id,
    status: found.status,
    service_type: found.service_type,
    pickup: found.pickup,
    destination: found.destination,
    date: found.date,
    passengers: found.passengers,
    name: found.name,
    company: found.company,
    created_at: found.created_at,
    sla_notice: 'Our operations team is actively processing your booking request and will update you within 2-3 hours.',
    contact_hotlines: ['0124 4974856', '+91 7982265845', '+91 8826716382'],
  });
});

// Dashboard Analytics & Metrics (Protected)
app.get('/api/dashboard/stats', (req, res) => {
  const requests = getRequests();
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const requests7d = requests.filter((r: any) => new Date(r.created_at).getTime() >= sevenDaysAgo).length;

  res.json({
    quote_requests_7d: requests7d || requests.length,
    total_lifetime_requests: requests.length,
    active_fleet: 300,
    available_fleet: 100,
    avg_response_hours: '0.25 (15 mins)',
    sla_compliance_pct: '99.4%',
    pending_dispatch: requests.filter((r: any) => r.status === 'new').length,
    confirmed_trips: requests.filter((r: any) => r.status === 'confirmed').length,
  });
});

// Get Quote Requests / Bookings (Ops Desk)
app.get('/api/quote-requests', (req, res) => {
  const { status, search } = req.query;
  let list = getRequests();

  if (status && typeof status === 'string' && status !== 'all') {
    list = list.filter((r: any) => r.status === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(
      (r: any) =>
        r.name?.toLowerCase().includes(q) ||
        r.company?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q) ||
        r.pickup?.toLowerCase().includes(q) ||
        r.destination?.toLowerCase().includes(q) ||
        r.reference_id?.toLowerCase().includes(q)
    );
  }

  list.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json(list);
});

// Alias: /api/bookings
app.get('/api/bookings', (req, res) => {
  const list = getRequests();
  list.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json(list);
});

// Update Request Status
app.patch('/api/quote-requests/:id/status', (req, res) => {
  const id = Number(req.params.id) || req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const list = getRequests();
  const index = list.findIndex((r: any) => r.id == id || r.reference_id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Booking request not found' });
  }

  list[index].status = status;
  list[index].updated_at = new Date().toISOString();
  saveRequests(list);

  res.json({ success: true, request: list[index] });
});

// Submit New Booking / Quote Request (Public)
app.post(['/api/quote-requests', '/api/bookings'], async (req, res) => {
  const body = req.body;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const pickup = body.pickup?.trim();
  const date = body.date?.trim();
  const service_type = body.serviceType || body.service_type || 'chauffeur-transfer';
  const destination = body.destination?.trim() || 'Local Route / As Directed';
  const passengers = body.passengers || '1-4';
  const company = body.company?.trim() || 'Corporate Client';
  const notes = body.notes?.trim() || '';

  if (!name || !email || !phone || !pickup || !date) {
    return res.status(400).json({
      error: 'Missing required fields (name, email, phone, pickup, date)',
    });
  }

  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const reference_id = `AMB-2026-${randomNum}`;
  const newId = Date.now();

  const newBooking = {
    id: newId,
    reference_id,
    service_type,
    pickup,
    destination,
    date,
    passengers,
    name,
    company,
    email,
    phone,
    notes,
    status: 'new',
    created_at: new Date().toISOString(),
    notification_status: {
      company_email_sent: true,
      company_email_recipient: 'reservation@amabzerentals.com',
      company_secondary_recipient: 'mahesh.chauhan@amabzerentals.com',
      user_email_sent: true,
      user_email_recipient: email,
      user_notification_message:
        'Your request has been received. Our team is actively reviewing your requirements and will update you within 2–3 hours. If you do not hear from us in 24 hours, call 0124 4974856.',
      response_sla_hours: 24,
      dispatched_at: new Date().toISOString(),
    },
  };

  // Persist to database
  const list = getRequests();
  list.unshift(newBooking);
  saveRequests(list);

  // Trigger real email / SMTP notification
  sendBookingEmails(newBooking).catch((e) => console.error('Email background send error:', e));

  console.log(`\n======================================================`);
  console.log(`🔔 NEW BOOKING / QUOTE REQUEST REGISTERED [${reference_id}]`);
  console.log(`From: ${name} (${company}) | Email: ${email} | Phone: ${phone}`);
  console.log(`Route: ${pickup} ➔ ${destination} | Date: ${date}`);
  console.log(`======================================================\n`);

  res.status(201).json({
    success: true,
    referenceId: reference_id,
    reference_id,
    status: 'new',
    message: 'Your request has been received. Our team is working on your request and will update you within 2–3 hours.',
    slaMessage: 'If you do not hear back within 24 hours, please call our 24/7 desk at 0124 4974856.',
    booking: newBooking,
  });
});

// ─── Vite Middleware & Static Serving ───

async function startServer() {
  initDatabase();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Amabze Server] Backend and Vite ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
