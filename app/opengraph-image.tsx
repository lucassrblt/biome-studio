import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site, hero } from "@/lib/content";

/**
 * Aperçu de partage (réseaux sociaux, messageries, Google) généré par code.
 * Branded « Biome » : dégradé teal, logo recoloré crème + promesse + réassurance.
 * Statique (build-time), donc zéro coût au runtime. Sert aussi de twitter-image
 * via la card déclarée dans app/layout.tsx.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#f6f9f8";
const CYAN = "#c4eaee";

export default async function Image() {
  const [bricolage, hanken, logoRaw] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/bricolage-800.ttf")),
    readFile(join(process.cwd(), "assets/fonts/hanken-500.ttf")),
    readFile(join(process.cwd(), "public/biome.svg"), "utf-8"),
  ]);

  // Logo (wordmark) recoloré en crème pour ressortir sur le fond teal.
  const logo = logoRaw.replaceAll("#2c6e6d", CREAM);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background: "linear-gradient(135deg, #15302e 0%, #2c6e6d 100%)",
          color: CREAM,
          fontFamily: "Hanken",
        }}
      >
        {/* Forme organique discrète en fond */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: "42% 58% 60% 40% / 45% 45% 55% 55%",
            background: "rgba(196,234,238,0.10)",
          }}
        />

        <img src={logoSrc} width={360} height={240} alt="" style={{ marginLeft: -8 }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 66,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 940,
            }}
          >
            {hero.title}
          </div>
          <div style={{ fontSize: 30, color: "rgba(246,249,248,0.78)", marginTop: 22 }}>
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {hero.reassurance.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(246,249,248,0.22)",
                fontSize: 24,
                color: "rgba(246,249,248,0.92)",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, background: CYAN }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, style: "normal", weight: 800 },
        { name: "Hanken", data: hanken, style: "normal", weight: 500 },
      ],
    },
  );
}
