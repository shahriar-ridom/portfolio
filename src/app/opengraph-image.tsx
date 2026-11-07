import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#ffffff",
          color: "#353535",
        }}
      >
        <div style={{ fontSize: 44, color: "#6a6a6a" }}>{profile.name}</div>
        <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.1, marginTop: 24 }}>
          I build things for the digital world.
        </div>
        <div style={{ fontSize: 34, color: "#6a6a6a", marginTop: 36 }}>
          Native Linux apps · Rust · Web
        </div>
      </div>
    ),
    size,
  );
}
