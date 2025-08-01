import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const isHangfireRoute = request.nextUrl.pathname.startsWith('/admin/hangfire') || 
                         request.nextUrl.pathname.startsWith('/hangfire');
  
  if (!isHangfireRoute) {
    return NextResponse.next();
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  const hangfireBaseUrl = isDevelopment 
    ? 'http://localhost:5206' 
    : process.env.HANGFIRE_URL;
  
  if (!hangfireBaseUrl) {
    console.error('Hangfire URL not configured');
    return new NextResponse('Hangfire URL not configured', { status: 500 });
  }

  let targetUrl;
  if (request.nextUrl.pathname.startsWith('/admin/hangfire')) {
    const path = request.nextUrl.pathname.replace('/admin/hangfire', '');
    targetUrl = `${hangfireBaseUrl}/hangfire${path}${request.nextUrl.search}`;
  } else {
    targetUrl = `${hangfireBaseUrl}${request.nextUrl.pathname}${request.nextUrl.search}`;
  }

  try {
    const requestHeaders = new Headers();
    
    request.headers.forEach((value, key) => {
      if (!['host', 'connection'].includes(key.toLowerCase())) {
        requestHeaders.set(key, value);
      }
    });
    
    requestHeaders.set('Host', new URL(hangfireBaseUrl).host);
    requestHeaders.set('Origin', hangfireBaseUrl);
    requestHeaders.set('Referer', `${hangfireBaseUrl}/hangfire`);

    const fetchOptions: RequestInit = {
      method: request.method,
      headers: requestHeaders,
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const contentType = request.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        fetchOptions.body = await request.text();
      } else if (contentType?.includes('application/x-www-form-urlencoded')) {
        fetchOptions.body = await request.text();
      } else if (request.body) {
        fetchOptions.body = request.body;
      }
    }

    const response = await fetch(targetUrl, fetchOptions);

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Response error:', response.status, responseText);
    }

    const responseHeaders = new Headers();
    
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });
    
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self'");
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Hangfire proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(`Proxy failed: ${errorMessage}`, { status: 502 });
  }
}

export const config = {
  matcher: [
    '/admin/hangfire',
    '/admin/hangfire/:path*',
    '/hangfire/:path*'
  ]
};