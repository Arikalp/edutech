import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EduAgent",
    short_name: "EduAgent",
    description: "Empowering teachers to lead classrooms with confidence and AI-powered intelligence.",
    start_url: "/",
    display: "standalone",
    background_color: "#090A0F",
    theme_color: "#cfbcff",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
