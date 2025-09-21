export const sendOtp = async (phone: string) => {
  await fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
};

export const verifyOtp = async (phone: string, otp: string) => {
  await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code: otp }),
  });
};
