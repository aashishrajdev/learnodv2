// Utility to create and download a zip file in browser
import JSZip from "jszip";

export async function saveFilesAsZip(
  files: { name: string; content: string }[],
  zipName = "web-code.zip",
) {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file.content);
  });
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = zipName;
  link.click();
  URL.revokeObjectURL(url);
}
