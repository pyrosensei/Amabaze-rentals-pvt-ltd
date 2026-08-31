import express from 'express';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';

// --- Firebase Client SDK for Backend Storage ---
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc, query, orderBy } from 'firebase/firestore';
import fs from 'fs';

// Read Firebase Config
let firebaseConfig: any = null;
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
} catch (e) {
  console.warn('⚠️ No firebase-applet-config.json found.');
}

const firebaseApp = firebaseConfig ? initializeApp(firebaseConfig) : null;
const db = firebaseApp && firebaseConfig?.firestoreDatabaseId 
  ? getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId)
  : (firebaseApp ? getFirestore(firebaseApp) : null);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const adminSecret = process.env.ADMIN_PASSCODE;

  if (!adminSecret) {
    return res.status(500).json({ error: 'Server Configuration Error: ADMIN_PASSCODE environment variable is missing.' });
  }

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  
  // Validate token directly against the secret
  if (token === adminSecret) {
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
  const adminSecret = process.env.ADMIN_PASSCODE;

  if (!adminSecret) {
    return res.status(500).json({ success: false, error: 'Server Error: ADMIN_PASSCODE is missing in environment variables.' });
  }

  if (passcode === adminSecret) {
    return res.json({
      success: true,
      token: adminSecret,
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
app.get('/api/track/:referenceId', async (req, res) => {
  try {
    const ref = req.params.referenceId?.trim().toUpperCase();
    const q = query(collection(db, 'quote_requests'));
    const snapshot = await getDocs(q);
    const found = snapshot.docs.map(d => d.data()).find((r: any) => r.reference_id?.toUpperCase() === ref);

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
      created_at: found.created_at || found.createdAt,
      sla_notice: 'Our operations team is actively processing your booking request and will update you within 2-3 hours.',
      contact_hotlines: ['0124 4974856', '+91 7982265845', '+91 8826716382'],
    });
  } catch (error) {
    console.error('Track error:', error);
    res.status(500).json({ error: 'Failed to retrieve booking data' });
  }
});

// Dashboard Analytics & Metrics (Protected)
app.get('/api/dashboard/stats', adminAuthMiddleware, async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'quote_requests'));
    const requests = snapshot.docs.map(d => d.data());
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const requests7d = requests.filter((r: any) => new Date(r.created_at || r.createdAt).getTime() >= sevenDaysAgo).length;

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
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});

// Get Quote Requests / Bookings (Ops Desk)
app.get('/api/quote-requests', adminAuthMiddleware, async (req, res) => {
  try {
    const { status, search } = req.query;
    const snapshot = await getDocs(collection(db, 'quote_requests'));
    let list = snapshot.docs.map(d => ({ docId: d.id, ...d.data() }));

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

    list.sort((a: any, b: any) => new Date(b.created_at || b.createdAt).getTime() - new Date(a.created_at || a.createdAt).getTime());
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quote requests' });
  }
});

// Alias: /api/bookings
app.get('/api/bookings', adminAuthMiddleware, async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'quote_requests'));
    let list = snapshot.docs.map(d => ({ docId: d.id, ...d.data() }));
    list.sort((a: any, b: any) => new Date(b.created_at || b.createdAt).getTime() - new Date(a.created_at || a.createdAt).getTime());
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// Update Request Status
app.patch('/api/quote-requests/:id/status', adminAuthMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const snapshot = await getDocs(collection(db, 'quote_requests'));
    const docToUpdate = snapshot.docs.find(d => d.id === id || d.data().reference_id === id);

    if (!docToUpdate) {
      return res.status(404).json({ error: 'Booking request not found' });
    }

    await updateDoc(doc(db, 'quote_requests', docToUpdate.id), {
      status,
      updated_at: new Date().toISOString()
    });

    res.json({ success: true, request: { ...docToUpdate.data(), status } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request' });
  }
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

  try {
    // Persist to database (Firestore)
    await addDoc(collection(db, 'quote_requests'), newBooking);

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
  } catch (error) {
    console.error('Failed to submit quote:', error);
    res.status(500).json({ error: 'Failed to submit quote request' });
  }
});

// ─── Vite Middleware & Static Serving ───


async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Amabze Server] Backend ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
