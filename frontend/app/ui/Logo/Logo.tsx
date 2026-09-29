import { Link } from "@mui/material";

type LogoProps = {
  clickable?: boolean;
};

export default function Logo({ clickable }: LogoProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: clickable ? "pointer" : "default",
      }}
    >
      {clickable ? (
        <Link href="/">
          <img
            src={"/logo.png"}
            alt="Logo"
            style={{
              width: "350px",
              height: "350px",
              animation: "float 3s ease-in-out infinite",
            }}
          />
        </Link>
      ) : (
        <img
          src={"/logo.png"}
          alt="Logo"
          style={{
            width: "350px",
            height: "350px",
            animation: "float 3s ease-in-out infinite",
          }}
        />
      )}
      <style>
        {`
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `}
      </style>
    </div>
  );
}
