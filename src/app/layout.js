import "./globals.css";

export const metadata = {
  title: "Compression Api",
  description: "This is my compression api for videos and images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
