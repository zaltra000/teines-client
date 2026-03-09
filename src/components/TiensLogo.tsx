export function TiensLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 740" className={className}>
      <defs>
        {/* قناع التفريغ (Mask) للموجة البيضاء */}
        <mask id="waveMask">
          <rect x="0" y="0" width="1000" height="1000" fill="white" />
          <path d="M -20 500 
                   C 80 500, 160 400, 230 320 
                   C 300 400, 330 500, 365 500 
                   C 400 500, 440 350, 500 220 
                   C 560 350, 600 500, 635 500 
                   C 670 500, 700 400, 770 320 
                   C 840 400, 920 500, 1020 500" 
                fill="none" stroke="black" strokeWidth="34" strokeLinejoin="miter" strokeMiterlimit="50" />
        </mask>
      </defs>

      {/* مجموعة الأوراق مفرغة باستخدام القناع */}
      <g mask="url(#waveMask)">
        {/* الورقة الخضراء اليسرى */}
        <path d="M 230 140 C 40 300, 40 500, 230 630 C 420 500, 420 300, 230 140 Z" fill="#4DB942" />
        
        {/* الورقة الخضراء اليمنى */}
        <path d="M 770 140 C 580 300, 580 500, 770 630 C 960 500, 960 300, 770 140 Z" fill="#4DB942" />
        
        {/* الورقة الصفراء الوسطى */}
        <path d="M 500 40 C 260 220, 260 520, 500 700 C 740 520, 740 220, 500 40 Z" fill="#FDBA12" />
      </g>
    </svg>
  );
}
