import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "User Dashboard",
  description: "React Query + Zustand Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white">

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
