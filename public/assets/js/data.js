/**
 * Portal Data Source
 * Define all categories and templates here.
 */

const PORTAL_DATA = {
    categories: [
        {
            id: 'business',
            name: 'Business',
            description: 'Corporate, Trust, Professional',
            // Deep Navy & Gold/Blue
            color: '#4fc3f7', // Light Blue for accent
            theme: 'theme-business',
            image: ''
        },
        {
            id: 'streamer',
            name: 'Streamer',
            description: 'Gaming, V-Tuber, Pop',
            // Neon Purple
            color: '#bc13fe',
            theme: 'theme-streamer',
            image: ''
        },
        {
            id: 'lp',
            name: 'Landing Page',
            description: 'Sales, Marketing, Impact',
            // Vibrant Pink/Red
            color: '#ff0055',
            theme: 'theme-lp',
            image: ''
        },
        {
            id: 'portfolio',
            name: 'Portfolio',
            description: 'Creative, Works, Minimal',
            // Yellow/White
            color: '#ffcc00',
            theme: 'theme-portfolio',
            image: ''
        }
    ],
    templates: {
        'business': [
            // Populating A-Z with Rich Dummy Data
            {
                id: 'bus_a', name: 'Business A', tag: 'A', path: 'templates/business/a',
                description: 'Trustworthy and professional design suitable for corporate websites. Features a clean layout with blue accents.',
                features: ['Responsive', 'Corporate', 'Blue Theme'],
                colors: ['#007bff', '#ffffff', '#333333'],
                // New Visual Props
                image: '', // e.g. 'assets/images/thumbs/bus_a.jpg'
                themeLabel: 'Corporate'
            },
            {
                id: 'bus_b', name: 'Business B', tag: 'B', path: 'templates/business/b',
                description: 'Modern and bold style for startups. High contrast and dynamic typography.',
                features: ['Bold Typography', 'Dark Mode', 'Startup'],
                colors: ['#ff9900', '#1a1a1a', '#ffffff'],
                image: '',
                themeLabel: 'Startup'
            },
            {
                id: 'bus_c', name: 'Business C', tag: 'C', path: 'templates/business/c',
                description: 'Elegant solution for consultancy firms. Minimalist approach with plenty of whitespace.',
                features: ['Minimalist', 'Consulting', 'Elegant'],
                colors: ['#2c3e50', '#ecf0f1', '#bdc3c7'],
                image: '',
                themeLabel: 'Consulting'
            },
            // ... Generating simple placeholders for D-Z to avoid huge file size,
            // in a real app this would be in a separate JSON file.
            ...Array.from({ length: 23 }, (_, i) => {
                const char = String.fromCharCode(68 + i); // D (68) to Z
                return {
                    id: `bus_${char.toLowerCase()}`,
                    name: `Business ${char}`,
                    tag: char,
                    path: `templates/business/${char.toLowerCase()}`,
                    description: `Standard business template variant ${char}. suitable for general purpose use.`,
                    features: ['Responsive', 'Fast Load', 'SEO Ready'],
                    colors: ['#00f2ff', '#000000', '#ffffff']
                };
            })
        ],
        'streamer': [
            {
                id: 'st_a', name: 'Streamer A', tag: 'A', path: 'templates/streamer/a',
                description: 'High energy design for streamers and content creators.',
                features: ['Gaming', 'Twitch Integration', 'Neon'],
                colors: ['#7000ff', '#00ff00', '#000000'],
                image: '',
                themeLabel: 'Gaming'
            },
            ...Array.from({ length: 25 }, (_, i) => {
                const char = String.fromCharCode(66 + i); // B to Z
                return {
                    id: `st_${char.toLowerCase()}`,
                    name: `Streamer ${char}`,
                    tag: char,
                    path: `templates/streamer/${char.toLowerCase()}`,
                    description: `Vibrant streaming overlay style ${char}.`,
                    features: ['OBS Ready', 'Responsive', 'Neon'],
                    colors: ['#7000ff', '#00ff00', '#111111'],
                    image: '',
                    themeLabel: 'V-Tuber'
                };
            })
        ],
        'lp': [
            ...Array.from({ length: 26 }, (_, i) => {
                const char = String.fromCharCode(65 + i); // A to Z
                return {
                    id: `lp_${char.toLowerCase()}`,
                    name: `LP ${char}`,
                    tag: char,
                    path: `templates/lp/${char.toLowerCase()}`,
                    description: `High conversion Landing Page template ${char}.`,
                    features: ['Impact', 'Sales', 'Marketing'],
                    colors: ['#ff0055', '#ffffff', '#000000'],
                    image: '',
                    themeLabel: 'Campaign'
                };
            })
        ],
        'portfolio': [
            ...Array.from({ length: 26 }, (_, i) => {
                const char = String.fromCharCode(65 + i); // A to Z
                return {
                    id: `pf_${char.toLowerCase()}`,
                    name: `Portfolio ${char}`,
                    tag: char,
                    path: `templates/portfolio/${char.toLowerCase()}`,
                    description: `Minimalist portfolio for creators ${char}.`,
                    features: ['Gallery', 'Minimal', 'Creative'],
                    colors: ['#ffcc00', '#111111', '#eeeeee'],
                    image: '',
                    themeLabel: 'Creative'
                };
            })
        ]
    }
};
