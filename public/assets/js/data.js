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
            {
                id: 'bus_i', name: 'Business I', tag: 'I', path: 'templates/business/i',
                description: '信頼と知性を象徴するインテリジェント・デザイン。分析ツールやダッシュボードに最適です。',
                features: ['Monitoring', 'Intelligent', 'Dashboard'],
                colors: ['#0a192f', '#64ffda', '#ccd6f6'],
                image: '',
                themeLabel: 'Intelligent'
            },
            {
                id: 'bus_j', name: 'Business J', tag: 'J', path: 'templates/business/j',
                description: '伝統と革新が融合する和モダン・デザイン。京都の老舗や和テイストのブランドに。',
                features: ['Modern Japanese', 'Vertical Text', 'Mincho'],
                colors: ['#2d3436', '#00b894', '#dfe6e9'],
                image: '',
                themeLabel: 'Modern'
            },
            {
                id: 'bus_k', name: 'Business K', tag: 'K', path: 'templates/business/k',
                description: '理性と知性を重んじるアカデミックなデザイン。研究所や学会、教育機関向け。',
                features: ['Academic', 'Rational', 'Serif'],
                colors: ['#1a202c', '#edf2f7', '#2d3748'],
                image: '',
                themeLabel: 'Knowledge'
            },
            {
                id: 'bus_l', name: 'Business L', tag: 'L', path: 'templates/business/l',
                description: '論理的思考とシステム美を体現するロジカル・デザイン。エンジニアリングやシステム開発に。',
                features: ['Systemic', 'Terminal', 'Logic Flow'],
                colors: ['#0f172a', '#38bdf8', '#1e293b'],
                image: '',
                themeLabel: 'Logical'
            },
            {
                id: 'bus_m', name: 'Business M', tag: 'M', path: 'templates/business/m',
                description: '本質のみを抽出した究極のミニマル・デザイン。プロダクトギャラリーや建築事務所に。',
                features: ['Minimalist', 'Whitespace', 'Typography'],
                colors: ['#ffffff', '#000000', '#333333'],
                image: '',
                themeLabel: 'Minimal'
            },
            {
                id: 'bus_n', name: 'Business N', tag: 'N', path: 'templates/business/n',
                description: 'ネオンの鼓動を感じるサイバーパンク・デザイン。ナイトクラブやエキサイティングなイベントに。',
                features: ['Neon', 'Cyber', 'Night-life'],
                colors: ['#ff00ff', '#00ffff', '#000000'],
                image: '',
                themeLabel: 'Neon Night'
            },
            {
                id: 'bus_o', name: 'Business O', tag: 'O', path: 'templates/business/o',
                description: '自然のリズムと調和する流体デザイン。スパやウェルビーイング、オーガニックブランドに。',
                features: ['Organic', 'Fluid Shape', 'Healing'],
                colors: ['#ff7f50', '#ffdced', '#ffffff'],
                image: '',
                themeLabel: 'Organic Flow'
            },
            {
                id: 'bus_p', name: 'Business P', tag: 'P', path: 'templates/business/p',
                description: '元気を届けるポップで弾けるデザイン。エンターテインメントや親しみやすいブランドに。',
                features: ['Pop', 'Vibrant', 'Comic Style'],
                colors: ['#ff6600', '#ffea00', '#ff007f'],
                image: '',
                themeLabel: 'Pop Vibrant'
            },
            {
                id: 'bus_q', name: 'Business Q', tag: 'Q', path: 'templates/business/q',
                description: '究極の精度と品質を象徴する、引き算の美学。高級プロダクトや精密機器ブランドに。',
                features: ['Quality', 'Precision', 'Minimal Luxury'],
                colors: ['#000000', '#ffffff', '#e5e5e5'],
                image: '',
                themeLabel: 'Quality First'
            },
            {
                id: 'bus_r', name: 'Business R', tag: 'R', path: 'templates/business/r',
                description: '格式高い伝統と権威を継承するマルチページ。歴史ある組織や高級ブランドのアーカイブに。',
                features: ['Multi-page', 'Tradition', 'Decorative'],
                colors: ['#8b0000', '#d4af37', '#0d0d0d'],
                image: '',
                themeLabel: 'Royal Legacy'
            },
            {
                id: 'bus_s', name: 'Business S', tag: 'S', path: 'templates/business/s',
                description: '次世代の効率を追求したモダンなSaaS UI。テックツールやWebサービスの紹介に。',
                features: ['Modern SaaS', 'Isometric', 'High Efficiency'],
                colors: ['#8a2be2', '#f8f9fe', '#1a1a1a'],
                image: '',
                themeLabel: 'Smart SaaS'
            },
            {
                id: 'bus_t', name: 'Business T', tag: 'T', path: 'templates/business/t',
                description: '堅牢なセキュリティと信頼を誓うマルチページ。金融・インフラ・セキュリティ企業向け。',
                features: ['Multi-page', 'Security', 'Robust'],
                colors: ['#434b4d', '#1e3a8a', '#f0f2f5'],
                image: '',
                themeLabel: 'Trust Guard'
            },
            {
                id: 'bus_u', name: 'Business U', tag: 'U', path: 'templates/business/u',
                description: '都市のエネルギーをステンシルで刻んだストリート・デザイン。クリエイティブ集団やカルチャー拠点に。',
                features: ['Urban', 'Stencil', 'Raw Energy'],
                colors: ['#ff3e00', '#444444', '#eaeaea'],
                image: '',
                themeLabel: 'Urban Street'
            },
            {
                id: 'bus_v', name: 'Business V', tag: 'V', path: 'templates/business/v',
                description: '記憶に焼き付く補色配色のインパクト・デザイン。広告・プロモーションや先鋭的なアートプロジェクトに。',
                features: ['Vivid', 'Contrast', 'Impact'],
                colors: ['#ffff00', '#ff00ff', '#000000'],
                image: '',
                themeLabel: 'Vivid Impact'
            },
            {
                id: 'bus_w', name: 'Business W', tag: 'W', path: 'templates/business/w',
                description: 'パノラマ的な広がりを見せる横スクロール・デザイン。写真・建築・風景を愛するブランドに。',
                features: ['Horizontal Scroll', 'Panorama', 'Minimal'],
                colors: ['#ffffff', '#000000', '#f0f0f0'],
                image: '',
                themeLabel: 'Wide Horizon'
            },
            {
                id: 'bus_x', name: 'Business X', tag: 'X', path: 'templates/business/x',
                description: '極限のボルテージを全画面スナップで表現。エクストリームスポーツや熱狂的なプロジェクトに。',
                features: ['Snap Scroll', 'Action', 'Xtreme'],
                colors: ['#ff0000', '#000000', '#ffffff'],
                image: '',
                themeLabel: 'Xtreme Snap'
            },
            {
                id: 'bus_y', name: 'Business Y', tag: 'Y', path: 'templates/business/y',
                description: '着実な成長と収益をイメージした洗練のマルチページ。コンサルティングや投資関連ビジネスに。',
                features: ['Multi-page', 'Investment', 'Sophisticated'],
                colors: ['#d4af37', '#3a4d39', '#ffffff'],
                image: '',
                themeLabel: 'Yield Growth'
            },
            {
                id: 'bus_z', name: 'Business Z', tag: 'Z', path: 'templates/business/z',
                description: '究極の静寂と和の精神を形にした禅デザイン。茶室・スパ・哲学的なブランドに。',
                features: ['Zen', 'Vertical', 'Silence'],
                colors: ['#ffffff', '#1a1a1a', '#f5f5f5'],
                image: '',
                themeLabel: 'Zen Garden'
            }
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
