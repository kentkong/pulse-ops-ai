import { cn } from "@/lib/utils";
import { textureAssets } from "@/lib/asset-url";

type TextureKey = keyof typeof textureAssets;

const textureStyle = (key: TextureKey) => ({
  backgroundImage: `url("${textureAssets[key]}")`,
});

/** Slate / hero / command texture layer — inline URL avoids CSS basePath issues. */
export function TextureBg({
  texture = "pulseOps",
  className,
  ...props
}: React.ComponentProps<"div"> & { texture?: TextureKey }) {
  return (
    <div
      className={cn(className)}
      style={textureStyle(texture)}
      aria-hidden
      {...props}
    />
  );
}
