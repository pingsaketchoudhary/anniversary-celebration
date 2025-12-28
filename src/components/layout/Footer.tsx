import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-black py-8 flex justify-center items-center relative z-50">
            <p className="text-zinc-600 font-serif italic tracking-widest text-sm hover:text-gold transition-colors duration-500 cursor-default">
                Made with love <span className="text-red-500">♥</span> By SaketKumarChoudhary
            </p>
        </footer>
    );
}
