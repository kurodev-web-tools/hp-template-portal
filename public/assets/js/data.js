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
            {
                id: 'bus_a', name: 'Business A', tag: 'A', path: 'templates/business/a',
                description: '信頼と誠実さを表現するオーセンティックなデザイン。企業の公式サイトに最適です。',
                features: ['Corporate', 'Trust', 'Blue Theme'],
                colors: ['#003366', '#ffffff', '#f5f5f5'],
                image: '',
                themeLabel: 'Authentic'
            },
            {
                id: 'bus_b', name: 'Business B', tag: 'B', path: 'templates/business/b',
                description: '革新とエネルギーを感じさせる大胆なデザイン。スタートアップやベンチャー企業向け。',
                features: ['Startup', 'Bold Typography', 'High Contrast'],
                colors: ['#ff9900', '#1a1a1a', '#ffffff'],
                image: '',
                themeLabel: 'Bold'
            },
            {
                id: 'bus_c', name: 'Business C', tag: 'C', path: 'templates/business/c',
                description: '清潔感と安心感を与えるクリーンなデザイン。医療機関やコンサルティングファームに。',
                features: ['Medical', 'Clean', 'Minimalist'],
                colors: ['#30cfd0', '#ffffff', '#330867'],
                image: '',
                themeLabel: 'Clean'
            },
            {
                id: 'bus_d', name: 'Business D', tag: 'D', path: 'templates/business/d',
                description: 'スピード感と力強さを強調したダイナミックなデザイン。スポーツや自動車関連に。',
                features: ['Automotive', 'Speed', 'Impact'],
                colors: ['#ff4500', '#1a1a1a', '#ffffff'],
                image: '',
                themeLabel: 'Dynamic'
            },
            {
                id: 'bus_e', name: 'Business E', tag: 'E', path: 'templates/business/e',
                description: '自然との調和をテーマにしたエコデザイン。環境保護団体やオーガニック製品に。',
                features: ['Nature', 'Organic', 'Sustainability'],
                colors: ['#a8e6cf', '#dcedc1', '#f9f9f0'],
                image: '',
                themeLabel: 'Eco'
            },
            {
                id: 'bus_f', name: 'Business F', tag: 'F', path: 'templates/business/f',
                description: '最先端技術をイメージさせる近未来的なデザイン。IT企業やテック系サービスに。',
                features: ['Cyber', 'Neon', 'Tech'],
                colors: ['#00ffff', '#000000', '#111111'],
                image: '',
                themeLabel: 'Future'
            },
            {
                id: 'bus_g', name: 'Business G', tag: 'G', path: 'templates/business/g',
                description: '世界規模のネットワークを表現したグローバルデザイン。物流や商社に。',
                features: ['Logistics', 'Global', 'Network'],
                colors: ['#1e90ff', '#0d1b2a', '#ffffff'],
                image: '',
                themeLabel: 'Global'
            },
            {
                id: 'bus_h', name: 'Business H', tag: 'H', path: 'templates/business/h',
                description: '圧倒的な高級感と静寂を演出するラグジュアリーデザイン。ホテルや高級ブランドに。',
                features: ['Luxury', 'Hotel', 'Premium'],
                colors: ['#d4af37', '#1a1a1a', '#ffffff'],
                image: '',
                themeLabel: 'High-end'
            },
            // Validating I-Z (Placeholders)
            ...Array.from({ length: 18 }, (_, i) => {
                const char = String.fromCharCode(73 + i); // I (73) to Z
                return {
                    id: `bus_${char.toLowerCase()}`,
                    name: `Business ${char}`,
                    tag: char,
                    path: `templates/business/${char.toLowerCase()}`,
                    description: `Standard business template variant ${char}.`,
                    features: ['Responsive', 'Fast Load'],
                    colors: ['#cccccc', '#000000', '#ffffff'],
                    themeLabel: 'Standard'
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
