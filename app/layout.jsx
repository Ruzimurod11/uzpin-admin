import "./globals.css";

export const metadata = {
  title: "Uz pin",
  description: "UZ PIN ADMIN!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
