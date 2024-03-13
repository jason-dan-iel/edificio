let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
  API_BASE_URL = "http://localhost:3000";
} else {
  API_BASE_URL = "https://edificio-24-backend.vercel.app";
}

export { API_BASE_URL };

export const yearData = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Graduated",
  "Faculty/Staff",
];
