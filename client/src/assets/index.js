const rawAssets = import.meta.glob("./*.{png,jpg,jpeg,webp,svg,avif}", {
  eager: true,
  import: "default",
});

export const assets = Object.fromEntries(
  Object.entries(rawAssets).map(([path, module]) => [
    path.split("/").pop(),
    module,
  ])
);
