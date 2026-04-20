// Email regex pattern
export const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const invalidEmailMsg = "Please provide a valid email address";

// Egyptian phone number pattern (01x-xxxxxxxx)
export const phoneNumberField = /^01[0125][0-9]{8}$/;
export const invalidPhoneMsg = "Please provide a valid Egyptian phone number (e.g. 01012345678)";
