import { Header } from '@/components/header';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/providers/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className=''>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <div className="flex min-h-screen flex-col antialiased">
            <Header />
            <div className="flex flex-1 flex-col  gap-4 p-8 pt-6">
              {children}
            </div>
          </div>
        </ThemeProvider>
        <Toaster richColors={true} />
      </body>
    </html>
  );
}