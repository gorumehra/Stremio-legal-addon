const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');

const PORT = process.env.PORT || 7000;

// Nuvio Providers manifest integration
const manifest = {
    id: "com.stremio.nuvioprovidersaddon",
    version: "1.0.0",
    name: "Nuvio Providers Addon",
    description: "Stremio addon integrated with Nuvio custom providers list",
    resources: ["catalog", "meta", "stream"],
    types: ["movie", "series"],
    catalogs: [{
        type: "movie",
        id: "nuvio-movies",
        name: "Nuvio Providers Catalog"
    }],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

// Catalog Handler (Ye Stremio me list dikhayega)
builder.defineCatalogHandler(async function(args) {
    if (args.type === 'movie' && args.id === 'nuvio-movies') {
        const metas = [
            {
                id: 'tt1234567',
                type: 'movie',
                name: 'Sample Stream Item from Nuvio',
                poster: 'https://via.placeholder.com/300x450.png?text=Nuvio+Stream',
                description: 'Integrated via yoruix nuvio-providers manifest.'
            }
        ];
        return { metas };
    }
    return { metas: [] };
});

// Meta Handler (Details ke liye)
builder.defineMetaHandler(async function(args) {
    if (args.id === 'tt1234567') {
        const meta = {
            id: 'tt1234567',
            type: 'movie',
            name: 'Sample Stream Item from Nuvio',
            poster: 'https://via.placeholder.com/300x450.png?text=Nuvio+Stream',
            description: 'Integrated via yoruix nuvio-providers manifest.'
        };
        return { meta };
    }
    return { meta: null };
});

// Stream Handler (Ye actual streaming links/providers connect karega)
builder.defineStreamHandler(async function(args) {
    const streams = [
        {
            title: 'Nuvio Provider Link 1',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
    ];
    return { streams };
});

serveHTTP(builder.getInterface(), { port: PORT });

  
