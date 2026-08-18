export function Footer() {
  return (
    <footer className="mt-6 sm:mt-8 flex flex-col items-center gap-3 px-4 text-center select-none" id="real-world-footer">
      {/* Logos and Brands */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
        <div className="flex flex-col items-center">
          <span className="font-silkscreen text-[9px] text-[#e53935] tracking-widest uppercase">
            MARVEL STUDIOS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black italic tracking-wide text-[#e53935] drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] -mt-1">
            SPIDER-MAN
          </h2>
          <span className="font-condensed text-[10px] font-bold tracking-[0.3em] uppercase text-[#6ec0ff] -mt-1">
            BRAND NEW DAY &bull; HACKATHON 2026
          </span>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-[#2a3765]" />

        <div className="flex flex-col items-center sm:items-start">
          <span className="font-condensed text-[10px] text-[#9aa0c8] uppercase tracking-wider">
            Powered by
          </span>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
            SAMSUNG Galaxy
          </span>
        </div>
      </div>

      {/* Legal and Quick Links */}
      <nav className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-wider font-condensed text-[#9aa0c8] pt-2 border-t border-[#1b2650] w-full max-w-2xl">
        <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
        <span className="text-[#3b4778]">•</span>
        <a href="#terms" className="hover:text-white transition-colors">TERMS OF USE</a>
        <span className="text-[#3b4778]">•</span>
        <a href="#cookies" className="hover:text-white transition-colors">COOKIE CONSENT TOOL</a>
        <span className="text-[#3b4778]">•</span>
        <a href="#credits" className="hover:text-white transition-colors">CREDITS ▲</a>
      </nav>

      <p className="font-condensed text-[9px] tracking-wider text-[#6d759d]">
        &copy; &amp; &trade; 2026 MARVEL. &copy;2026 CPII AND PIXEL HUD SYSTEMS LLC. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}
