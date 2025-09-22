// lib/helper.ts

const API_BASE_URL = 'http://localhost:5000';

// Send OTP function
export const sendOtp = async (phone: string): Promise<void> => {
  if (!phone) {
    throw new Error('Phone number is required');
  }

  // Clean and validate phone number
  const cleanedPhone = phone.replace(/\D/g, '');
  
  if (cleanedPhone.length !== 10) {
    throw new Error('Please enter a valid 10-digit phone number');
  }

  try {
    console.log(`🚀 Sending OTP to: ${cleanedPhone}`);
    
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ phone: cleanedPhone }),
    });

    console.log(`📨 Send OTP Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      }));
      
      throw new Error(errorData.error || `Failed to send OTP: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ OTP sent successfully:', data);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to send OTP');
    }

  } catch (error: any) {
    console.error("❌ Error sending OTP:", error.message);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    
    if (error.message.includes('CORS')) {
      throw new Error('CORS error. Please check server configuration.');
    }
    
    throw error;
  }
};

// Verify OTP function
export const verifyOtp = async (phone: string, otp: string): Promise<void> => {
  if (!phone || !otp) {
    throw new Error('Phone number and OTP code are required');
  }

  // Clean inputs
  const cleanedPhone = phone.replace(/\D/g, '');
  const cleanedOtp = otp.replace(/\D/g, '');
  
  if (cleanedPhone.length !== 10) {
    throw new Error('Invalid phone number format');
  }
  
  if (cleanedOtp.length !== 6) {
    throw new Error('OTP must be 6 digits');
  }

  try {
    console.log(`🔍 Verifying OTP for: ${cleanedPhone} with code: ${cleanedOtp}`);
    
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ phone: cleanedPhone, code: cleanedOtp }),
    });

    console.log(`📨 Verify OTP Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      }));
      
      throw new Error(errorData.error || `Failed to verify OTP: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ OTP verification result:', data);
    
    if (!data.success) {
      throw new Error(data.error || data.message || 'Invalid or expired OTP');
    }

  } catch (error: any) {
    console.error("❌ Error verifying OTP:", error.message);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    
    if (error.message.includes('CORS')) {
      throw new Error('CORS error. Please check server configuration.');
    }
    
    throw error;
  }
};

// Test server connection
export const testServerConnection = async (): Promise<any> => {
  try {
    console.log('🔍 Testing server connection...');
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Server health check failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Server connection successful:', data);
    return data;
    
  } catch (error: any) {
    console.error('❌ Server connection test failed:', error.message);
    throw error;
  }
};