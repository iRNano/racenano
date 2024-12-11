// app/layout.tsx (Server Component for Metadata)
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Race Event App",
  description: "Manage and track races efficiently",
};

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <ClientLayout>{children}</ClientLayout> {/* Use ClientLayout here */}
        </AuthProvider>
      </body>
    </html>
  );
}
