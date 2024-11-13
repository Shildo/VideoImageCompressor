import "./globals.css";

export const metadata = {
  title: "Comp-Api",
  description: "This is the compression api for videos and images",
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
