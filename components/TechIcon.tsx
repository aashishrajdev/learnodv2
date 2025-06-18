import React from "react";

interface TechIconProps {
  lang: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, string> = {
  python: "/assets/python.png",
  java: "/assets/java.png",
  c: "/assets/c.png",
  cpp: "/assets/cpp.png",
  typescript: "/assets/TypeScript.png",
  javascript: "/assets/JavaScript.png",
  php: "/assets/php.png",
  go: "/assets/Go.png",
  rust: "/assets/rust.png",
  web: "/assets/web.png",
};

const TechIcon: React.FC<TechIconProps> = ({
  lang,
  size = 20,
  className = "",
}) => {
  const src = iconMap[lang] || "/assets/learnodlogo.png";
  return (
    <img
      src={src}
      alt={lang + " logo"}
      width={size}
      height={size}
      className={className + " inline align-middle"}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
};

export default TechIcon;
