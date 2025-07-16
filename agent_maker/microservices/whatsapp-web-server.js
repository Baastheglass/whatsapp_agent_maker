const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const qrcodeLib = require('qrcode'); // Add this for generating QR code data URLs
const express = require('express');
const cors = require('cors'); // Add this for CORS
const app = express();
const port = 3000;

// Enable CORS for your Next.js frontend
app.use(cors({
    origin: 'http://localhost:3001', // Your Next.js app URL
    credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Store client instance and QR code
let whatsappClient = null;
let currentQRCode = null;
let clientStatus = 'disconnected';

// Sample API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Get current status and QR code
app.get('/api/whatsapp/status', (req, res) => {
    res.json({ 
        status: clientStatus,
        qrCode: currentQRCode,
        hasClient: whatsappClient !== null
    });
});

app.post('/api/whatsapp/start', async (req, res) => {
    console.log("Request received: ", {requestBody: req.body});
    try {
        // If client already exists and is ready, don't create a new one
        if (whatsappClient && clientStatus === 'ready') {
            return res.json({ 
                success: true,
                message: 'WhatsApp client is already running and ready!',
                status: 'ready'
            });
        }

        // Create new client
        whatsappClient = new Client({
            authStrategy: new LocalAuth({
                clientId: 'default',
                dataPath: './session'
            }),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        // Create promise that waits for QR code or ready state
        const waitForQROrReady = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout waiting for QR code'));
            }, 30000);

            whatsappClient.on('qr', async (qr) => {
                console.log('📱 QR Code received');
                qrcode.generate(qr, { small: true });
                
                try {
                    currentQRCode = await qrcodeLib.toDataURL(qr);
                    clientStatus = 'qr_ready';
                    console.log('QR Code generated for frontend');
                    
                    clearTimeout(timeout);
                    resolve({
                        success: true,
                        message: 'QR code ready. Please scan with your phone.',
                        status: 'qr_ready',
                        qrCode: currentQRCode  // ✅ QR code included in response
                    });
                } catch (error) {
                    clearTimeout(timeout);
                    reject(error);
                }
            });

            whatsappClient.on('ready', () => {
                console.log('🎉 WhatsApp client is ready!');
                clientStatus = 'ready';
                currentQRCode = null;
                
                clearTimeout(timeout);
                resolve({
                    success: true,
                    message: 'WhatsApp client is ready!',
                    status: 'ready'
                });
            });

            whatsappClient.on('auth_failure', (msg) => {
                console.log('❌ Authentication failed:', msg);
                clientStatus = 'auth_failed';
                clearTimeout(timeout);
                reject(new Error(`Authentication failed: ${msg}`));
            });
        });

        // Initialize and wait for result
        clientStatus = 'initializing';
        whatsappClient.initialize();
        
        const result = await waitForQROrReady;
        res.json(result);  // ✅ Response includes QR code

    } catch (error) {
        console.error('Error starting WhatsApp client:', error);
        clientStatus = 'error';
        res.status(500).json({ 
            success: false,
            message: 'Failed to start WhatsApp client',
            error: error.message
        });
    }
});

// Send message endpoint
app.post('/api/whatsapp/send-message', async (req, res) => {
    try {
        if (!whatsappClient || clientStatus !== 'ready') {
            return res.status(400).json({
                success: false,
                message: 'WhatsApp client is not ready'
            });
        }

        const { number, message } = req.body;
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
        
        await whatsappClient.sendMessage(chatId, message);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});