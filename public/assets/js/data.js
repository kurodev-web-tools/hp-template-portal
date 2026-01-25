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
            name: 'LP',
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
                id: 'st_a', name: 'Abyss Neon', tag: 'A', path: 'templates/streamer/a',
                description: '深海ネオン、グリッチ、中毒性のある青とピンク。没入感溢れるサイバーパンク・デザイン。',
                features: ['Cyberpunk', 'Glitch Effect', 'Neon'],
                colors: ['#00f2ff', '#ff0055', '#05050a'],
                image: '',
                themeLabel: 'Abyss Neon'
            },
            {
                id: 'st_b', name: 'Boss Room', tag: 'B', path: 'templates/streamer/b',
                description: 'RPGのボス戦を彷彿とさせる重厚なデザイン。ダークゴールドと視差効果で圧倒的な存在感を。',
                features: ['RPG Boss', 'Parallax', 'Dark Gold'],
                colors: ['#d4af37', '#8a6d3b', '#121212'],
                image: '',
                themeLabel: 'Boss Room'
            },
            {
                id: 'st_c', name: 'Crystal Prism', tag: 'C', path: 'templates/streamer/c',
                description: '宝石のような透明感と虹色の輝き。パステルカラーのガラスモーフィズム・デザイン。',
                features: ['Glassmorphism', 'Prism', 'Pastel'],
                colors: ['#ffd6ff', '#e7ffff', '#c8b6ff'],
                image: '',
                themeLabel: 'Crystal Prism'
            },
            {
                id: 'st_d', name: 'Digital Ghost', tag: 'D', path: 'templates/streamer/d',
                description: 'デジタルノイズと匿名性の深淵。スポットライト演出がミステリアスな雰囲気を醸成。',
                features: ['Matrix', 'Spotlight', 'Mysterious'],
                colors: ['#00ff41', '#003b00', '#000000'],
                image: '',
                themeLabel: 'Digital Ghost'
            },
            {
                id: 'st_e', name: 'E-Sports Pro', tag: 'E', path: 'templates/streamer/e',
                description: 'プロ大会の熱狂と信頼を形に。清潔感のあるブルーと白のグリッドレイアウト。',
                features: ['Competitive', 'Scoreboard', 'Official'],
                colors: ['#0055ff', '#ffffff', '#0a0e1a'],
                image: '',
                themeLabel: 'E-Sports Pro'
            },
            {
                id: 'st_f', name: 'Future Tech', tag: 'F', path: 'templates/streamer/f',
                description: '宇宙船のコンソールをイメージした未来志向のデザイン。独立したウィジェットが浮遊感を演出。',
                features: ['Sci-Fi', 'Dashboard', 'Widget'],
                colors: ['#00f2ff', '#030a10', '#00f2ff'],
                image: '',
                themeLabel: 'Future Tech'
            },
            {
                id: 'st_g', name: 'Glitch Core', tag: 'G', path: 'templates/streamer/g',
                description: 'RGBズレとカオスなエネルギー。過激な演出が視聴者の視線を釘付けにする衝撃的デザイン。',
                features: ['Glitch', 'Noise', 'Chaos'],
                colors: ['#ff0000', '#00ffff', '#000000'],
                image: '',
                themeLabel: 'Glitch Core'
            },
            {
                id: 'st_h', name: 'Horror Mansion', tag: 'H', path: 'templates/streamer/h',
                description: 'ホラーゲーム実況に特化した、没入感溢れるダークデザイン。懐中電灯演出が恐怖を誘う。',
                features: ['Horror', 'Spotlight', 'Dark'],
                colors: ['#991b1b', '#1a1a1b', '#000000'],
                image: '',
                themeLabel: 'Horror Mansion'
            },
            {
                id: 'st_i', name: 'Idol Stage', tag: 'I', path: 'templates/streamer/i',
                description: 'キラキラと輝くライブステージを再現。歌枠やアイドル系ストリーマーに最適。',
                features: ['Idol', 'Particles', 'Sparkle'],
                colors: ['#f472b6', '#ffffff', '#ffebf5'],
                image: '',
                themeLabel: 'Idol Stage'
            },
            {
                id: 'st_j', name: 'Jazz Lounge', tag: 'J', path: 'templates/streamer/j',
                description: '大人の余裕を感じさせる横スクロールデザイン。深夜の雑談やチルな配信に。',
                features: ['Side Scroll', 'Jazz', 'Chill'],
                colors: ['#b45309', '#2d1b0d', '#1a0f08'],
                image: '',
                themeLabel: 'Jazz Lounge'
            },
            {
                id: 'st_k', name: 'Knight Honor', tag: 'K', path: 'templates/streamer/k',
                description: '騎士の誇りと格式を。羊皮紙テクスチャとロイヤルブルーが織りなすマルチページ構成。',
                features: ['Knight', 'Multi-page', 'Classic'],
                colors: ['#2563eb', '#f3f4f6', '#d1d5db'],
                image: '',
                themeLabel: 'Knight Honor'
            },
            {
                id: 'st_l', name: 'Lunar Phase', tag: 'L', path: 'templates/streamer/l',
                description: '月の満ち欠けと幻想的な夜空。情緒的な配信スタイルを美しく演出。',
                features: ['Lunar', 'Fantasy', 'Calm'],
                colors: ['#fef3c7', '#4c1d95', '#1e1b4b'],
                image: '',
                themeLabel: 'Lunar Phase'
            },
            {
                id: 'st_m', name: 'Metallic Chrome', tag: 'M', path: 'templates/streamer/m',
                description: '無機質で鋭利なクロームデザイン。液体金属のような高度なビジュアル表現。',
                features: ['Metallic', 'Liquid', 'Pro'],
                colors: ['#9ca3af', '#111827', '#000000'],
                image: '',
                themeLabel: 'Metallic Chrome'
            },
            {
                id: 'st_n', name: 'Neon Night', tag: 'N', path: 'templates/streamer/n',
                description: '眠らない街のネオンサイン。都会的でストリート感のあるパープルスタイル。',
                features: ['Neon', 'Urban', 'Street'],
                colors: ['#7000ff', '#1e1b4b', '#020617'],
                image: '',
                themeLabel: 'Neon Night'
            },
            {
                id: 'st_o', name: 'Orbit Space', tag: 'O', path: 'templates/streamer/o',
                description: '宇宙の壮大さと浮遊感を表現した全画面スクロールデザイン。銀河を旅するような体験を。',
                features: ['Full-page', 'Snap Scroll', 'Space'],
                colors: ['#00d2ff', '#3a7bd5', '#000222'],
                image: '',
                themeLabel: 'Orbit Space'
            },
            {
                id: 'st_p', name: 'Pixel Retro', tag: 'P', path: 'templates/streamer/p',
                description: '懐かしの8-bitスタイル。ドット絵とPress Start 2Pフォントが織りなすレトロな世界観。',
                features: ['8-bit', 'Pixel Art', 'Retro'],
                colors: ['#22c55e', '#795548', '#000000'],
                image: '',
                themeLabel: 'Pixel Retro'
            },
            {
                id: 'st_q', name: 'Quest Log', tag: 'Q', path: 'templates/streamer/q',
                description: '王道RPGのメニュー画面をWebサイトに。冒険の記録（配信内容）を美しく整理。',
                features: ['RPG UI', 'Log Style', 'Fantasy'],
                colors: ['#f5e6be', '#5d4037', '#2b1d0e'],
                image: '',
                themeLabel: 'Quest Log'
            },
            {
                id: 'st_r', name: 'Rogue Stealth', tag: 'R', path: 'templates/streamer/r',
                description: '暗闇に紛れるアウトロースタイル。スモーク演出とヴィネット効果が緊張感を醸成。',
                features: ['Stealth', 'Smoke Effect', 'Dark Red'],
                colors: ['#991b1b', '#000000', '#1a1a1a'],
                image: '',
                themeLabel: 'Rogue Stealth'
            },
            {
                id: 'st_s', name: 'Steampunk Gear', tag: 'S', path: 'templates/streamer/s',
                description: '蒸気と歯車の重厚なマルチページ。産業革命時代のレトロフューチャリスティックなデザイン。',
                features: ['Steampunk', 'Multi-page', 'Gear'],
                colors: ['#b87333', '#262626', '#1a1a1a'],
                image: '',
                themeLabel: 'Steampunk Gear'
            },
            {
                id: 'st_t', name: 'Tech Logic', tag: 'T', path: 'templates/streamer/t',
                description: '論理的で戦略的なダッシュボード。回路基板のような幾何学的な美しさを。',
                features: ['Tech', 'Logic', 'Circuit'],
                colors: ['#06b6d4', '#1f2937', '#111827'],
                image: '',
                themeLabel: 'Tech Logic'
            },
            {
                id: 'st_u', name: 'Urban Graffiti', tag: 'U', path: 'templates/streamer/u',
                description: '自由なストリート文化を体現。スプレーアートと全画面スクロールの躍動感。',
                features: ['Graffiti', 'Street', 'Vivid'],
                colors: ['#fbbf24', '#262626', '#181818'],
                image: '',
                themeLabel: 'Urban Graffiti'
            },
            {
                id: 'st_v', name: 'Vivid Glitch', tag: 'V', path: 'templates/streamer/v',
                description: '色彩が弾け、視覚が震える。スクロール連動型のRGBズレ演出が強烈な個性を放つ。',
                features: ['Vivid', 'RGB Shift', 'Glitch'],
                colors: ['#ff00ff', '#00ffff', '#000000'],
                image: '',
                themeLabel: 'Vivid Glitch'
            },
            {
                id: 'st_w', name: 'Wide Pan', tag: 'W', path: 'templates/streamer/w',
                description: '地平線まで続くかのような圧倒的スケール。横スクロールと視差効果によるパノラマ体験。',
                features: ['Side Scroll', 'Parallax', 'Scenic'],
                colors: ['#10b981', '#064e3b', '#000000'],
                image: '',
                themeLabel: 'Wide Pan'
            },
            {
                id: 'st_x', name: 'Xtreme Action', tag: 'X', path: 'templates/streamer/x',
                description: '爆発的なエネルギーと躍動感。衝撃波エフェクトがセクション切り替えに劇的な緊迫感を。',
                features: ['Xtreme', 'Shockwave', 'Snap Scroll'],
                colors: ['#fbbf24', '#000000', '#78350f'],
                image: '',
                themeLabel: 'Xtreme Action'
            },
            {
                id: 'st_y', name: 'Yield Chart', tag: 'Y', path: 'templates/streamer/y',
                description: '上昇し続ける数値とリアルタイムチャート。成長を可視化するトレーディング風デザイン。',
                features: ['Trading', 'Counter', 'Chart'],
                colors: ['#22c55e', '#1a2e05', '#ffffff'],
                image: '',
                themeLabel: 'Yield Chart'
            },
            {
                id: 'st_z', name: 'Zen Brush', tag: 'Z', path: 'templates/streamer/z',
                description: '静寂の中の力強さ。一筆書きのアニメーションと和の精神が宿るマルチページ。',
                features: ['Zen', 'Brush Stroke', 'Multi-page'],
                colors: ['#171717', '#fafafa', '#404040'],
                image: '',
                themeLabel: 'Zen Brush'
            }
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
                    themeLabel: `${char}: Landing Page`
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
                    themeLabel: `${char}: Portfolio`
                };
            })
        ]
    }
};
