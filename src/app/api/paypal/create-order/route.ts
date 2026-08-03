import { NextResponse } from 'next/server';

const base = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
  
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('MISSING_API_CREDENTIALS');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('Failed to generate Access Token', data);
    throw new Error('Failed to generate Access Token');
  }
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const { cartItems } = await request.json();

    if (!cartItems || !cartItems.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate total on the server side
    const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);
    const total = subtotal + (subtotal * 0.05); // 5% tax or processing fee (as in the UI)
    const totalFixed = total.toFixed(2);

    const accessToken = await generateAccessToken();

    const url = `${base}/v2/checkout/orders`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: totalFixed,
          },
        },
      ],
      application_context: {
        return_url: `${appUrl}/billing?success=true`,
        cancel_url: `${appUrl}/billing?canceled=true`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'Digitexa',
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      // Find the approve URL to redirect the user
      const approveLink = data.links.find((link: any) => link.rel === 'approve');
      
      if (approveLink) {
        return NextResponse.json({ url: approveLink.href });
      } else {
        return NextResponse.json({ error: 'Approve link not found in PayPal response' }, { status: 500 });
      }
    } else {
      console.error('Failed to create order', data);
      return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error in create-order API:', error);
    if (error.message === 'MISSING_API_CREDENTIALS') {
      return NextResponse.json({ error: 'PayPal API credentials not configured.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
