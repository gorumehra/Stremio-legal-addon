const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const PORT = process.env.PORT || 7000;

const manifest = {
  id: "com.example.cloudstream-style-legal",
  version: "1.0.0",
  name: "CloudStream Style Legal Sources",
  description: "Multi-source Stremio addon template for legal/public-domain media.",
  resources: ["catalog", "meta", "stream"],
  types: ["movie"],
  catalogs: [{
    type: "movie",
    id: "public-domain",
    name: "Public Domain"
  }],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

// Replace/add only sources that you are legally allowed to redistribute.
const PUBLIC_DOMAIN = [
  {
    id: "tt1254207",
    name: "Big Buck Bunny",
    poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    streams: [
      {
        name: "Public Domain / Demo",
        title: "Big Buck Bunny — 1080p",
        url: "https://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"
      }
    ]
  }
];

builder.defineCatalogHandler(async ({ type, id }) => {
  if (type !== "movie" || id !== "public-domain") return { metas: [] };

  return {
    metas: PUBLIC_DOMAIN.map(x => ({
      id: x.id,
      type: "movie",
      name: x.name,
      poster: x.poster
    }))
  };
});

builder.defineMetaHandler(async ({ type, id }) => {
  const item = PUBLIC_DOMAIN.find(x => x.id === id && type === "movie");
  if (!item) return { meta: null };

  return {
    meta: {
      id: item.id,
      type: "movie",
      name: item.name,
      poster: item.poster
    }
  };
});

builder.defineStreamHandler(async ({ type, id }) => {
  const item = PUBLIC_DOMAIN.find(x => x.id === id && type === "movie");
  if (!item) return { streams: [] };

  // Multiple legal sources can be returned here.
  return {
    streams: item.streams.map(s => ({
      name: s.name,
      title: s.title,
      url: s.url
    }))
  };
});

serveHTTP(builder.getInterface(), { port: PORT });
console.log(`Addon running on http://127.0.0.1:${PORT}/manifest.json`);
