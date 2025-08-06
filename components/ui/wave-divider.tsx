interface WaveDividerProps {
  className?: string;
  fillColor?: string;
}

export function WaveDivider({ className = "", fillColor = "#f8f9fa" }: WaveDividerProps) {
  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-auto"
        style={{ display: 'block' }}
      >
        <path
          d="M0,0 C300,60 600,60 1200,0 L1200,120 L0,120 Z"
          fill={fillColor}
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
} 