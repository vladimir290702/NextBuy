export const generateTrackingNumber = () => {
  const prefix = "00340434"; // Fixed starting numbers
  const randomPart = Math.random().toString().slice(2, 14); // Generate a random number (12 digits)

  return prefix + randomPart;
};
