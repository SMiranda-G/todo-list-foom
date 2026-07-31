import "./globals.css";

export const metadata = {
  title: "Todo List",
  description: "A simple Todo List",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
