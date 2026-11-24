import "./globals.css";

export const metadata = {
  title: "Form Studio — Make your mark",
  description: "A thoughtful workspace for packaging and brand ideas.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
