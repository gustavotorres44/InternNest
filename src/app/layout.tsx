export const metadata = {
  title: "InternNest",
  description: "Your internship city, decoded.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
