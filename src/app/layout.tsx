import { AuthContext } from "./AuthContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head></head>
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
