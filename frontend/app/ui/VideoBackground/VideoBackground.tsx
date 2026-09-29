import React, { useState, useEffect } from "react";

type VideoBackgroundProps = {
  src: string;
  children?: React.ReactNode;
};

export default function VideoBackground({
  src,
  children,
}: VideoBackgroundProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [nextSrc, setNextSrc] = useState(src);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setNextSrc(src);
  }, [src]);

  const handleLoadedData = () => {
    setFade(true);
    setCurrentSrc(nextSrc);
    const timeout = setTimeout(() => {
      setFade(false);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <video
        src={`${process.env.PUBLIC_API_URL}/files/${currentSrc}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s",
          opacity: fade ? 0 : 1,
        }}
        autoPlay
        loop
        muted
      />
      <video
        src={`${process.env.PUBLIC_API_URL}/files/${nextSrc}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.5s",
          opacity: fade ? 1 : 0,
        }}
        preload="auto"
        onCanPlayThrough={handleLoadedData}
      />
      {children && (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            width: "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
