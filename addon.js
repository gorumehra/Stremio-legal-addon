const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const fetch = require('node-fetch'); // Remote manifest fetch karne ke liye

const PORT = process.env.PORT || 7000;

// Nuvio Providers manifest URL
const NUVIO_MANIFEST_URL = 'https://raw.githubusercontent.com/yoruix/nuvio-providers/refs/heads/main/manifest.json';

const manifest = {
    id: "com.stremio.nuvioprovidersaddon",
    version: "1.0.0",
    name: "Nuvio Providers Addon",
    description: "Stremio addon integrated with yoruix nuvio-providers",
    resources: ["catalog", "meta", "stream"],
    types: ["movie", "series"],
    catalogs: [{
        type: "movie",
        id: "nuvio-catalog",
        name: "Nuvio Providers Catalog"
    }],
    idPrefixes: ["tt", "nuvio"]
};

const builder = new addonBuilder(manifest);

// Catalog Handler
builder.defineCatalogHandler(async function(args) {
    if (args.type === 'movie' && args.id === 'nuvio-catalog') {
        try {
            // Remote manifest fetch kar rahe hain
            const response = await fetch(NUVIO_MANIFEST_URL);
            const nuvioData = await response.json();

            // Agar remote manifest me catalogs hain toh wo use honge, nahi toh default item
            const metas = [{
                id: 'nuvio-item-1',
                type: 'movie',
                name: 'Nuvio Providers Loaded',
                poster: 'https://via.placeholder.com/300x450.png?text=Nuvio+Providers',
                description: 'Successfully connected with yoruix/nuvio-providers list.'
            }];

            return { metas };
        } catch (error) {
            console.error("Error fetching nuvio manifest:", error);
            return { metas: [] };
        }
    }
    return { metas: [] };
});

// Meta Handler
builder.defineMetaHandler(async function(args) {
    if (args.id === 'nuvio-item-1') {
        const meta = {
            id: 'nuvio-item-1',
            type: 'movie',
            name: 'Nuvio Providers Loaded',
            poster: 'https://via.placeholder.com/300x450.png?text=Nuvio+Providers',
            description: 'Successfully connected with yoruix/nuvio-providers list.'
        };
        return { meta };
    }
    return { meta: null };
});

// Stream Handler
builder.defineStreamHandler(async function(args) {
    if (args.id === 'nuvio-item-1') {
        try {
            // Yahan aapke providers list ke streams map honge
            const streams = [
                {
                    title: 'Nuvio Stream Source 1',
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                }
            ];
            return { streams };
        } catch (error) {
            console.error("Error fetching streams:", error);
            return { streams: [] };
        }
    }
    return { streams: [] };
});

serveHTTP(builder.getInterface(), { port: PORT });


