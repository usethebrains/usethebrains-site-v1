"use client";
import { ThemeProvider } from '@/components/theme/theme-provider';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}
