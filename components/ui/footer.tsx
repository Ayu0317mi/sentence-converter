//footer.tsx
'use server'
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t h-20">
            <p className="text-xs text-muted-foreground">
                &copy; Copyright 2025. Designed by
                <Link href="/" className="text-blue-500" target="_blank"> Ayumi Nuguroho</Link>.
                All rights reserved</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            </nav>
        </footer>
    );
};

export default Footer;