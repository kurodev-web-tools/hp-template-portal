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
            icon: 'domain',
            image: ''
        },
        {
            id: 'streamer',
            name: 'Streamer',
            description: 'Gaming, V-Tuber, Pop',
            // Neon Purple
            color: '#bc13fe',
            theme: 'theme-streamer',
            icon: 'sports_esports',
            image: ''
        },
        {
            id: 'lp',
            name: 'LP',
            description: 'Sales, Marketing, Impact',
            // Vibrant Pink/Red
            color: '#ff0055',
            theme: 'theme-lp',
            icon: 'rocket_launch',
            image: ''
        },
        {
            id: 'portfolio',
            name: 'Portfolio',
            description: 'Creative, Works, Minimal',
            // Yellow/White
            color: '#ffcc00',
            theme: 'theme-portfolio',
            icon: 'palette',
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
                image: 'assets/thumbnails/business/bus_a.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Authentic'
            },
            {
                id: 'bus_b', name: 'Business B', tag: 'B', path: 'templates/business/b',
                description: '革新とエネルギーを感じさせる大胆なデザイン。スタートアップやベンチャー企業向け。',
                features: ['Startup', 'Bold Typography', 'High Contrast'],
                colors: ['#ff9900', '#1a1a1a', '#ffffff'],
                image: 'assets/thumbnails/business/bus_b.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Bold'
            },
            {
                id: 'bus_c', name: 'Business C', tag: 'C', path: 'templates/business/c',
                description: '清潔感と安心感を与えるクリーンなデザイン。医療機関やコンサルティングファームに。',
                features: ['Medical', 'Clean', 'Minimalist'],
                colors: ['#30cfd0', '#ffffff', '#330867'],
                image: 'assets/thumbnails/business/bus_c.webp',
                bgPosition: 'center 90%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Clean'
            },
            {
                id: 'bus_d', name: 'Business D', tag: 'D', path: 'templates/business/d',
                description: 'スピード感と力強さを強調したダイナミックなデザイン。スポーツや自動車関連に。',
                features: ['Automotive', 'Speed', 'Impact'],
                colors: ['#ff4500', '#1a1a1a', '#ffffff'],
                image: 'assets/thumbnails/business/bus_d.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Dynamic'
            },
            {
                id: 'bus_e', name: 'Business E', tag: 'E', path: 'templates/business/e',
                description: '自然との調和をテーマにしたエコデザイン。環境保護団体やオーガニック製品に。',
                features: ['Nature', 'Organic', 'Sustainability'],
                colors: ['#a8e6cf', '#dcedc1', '#f9f9f0'],
                image: 'assets/thumbnails/business/bus_e.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Eco'
            },
            {
                id: 'bus_f', name: 'Business F', tag: 'F', path: 'templates/business/f',
                description: '最先端技術をイメージさせる近未来的なデザイン。IT企業やテック系サービスに。',
                features: ['Cyber', 'Neon', 'Tech'],
                colors: ['#00ffff', '#000000', '#111111'],
                image: 'assets/thumbnails/business/bus_f.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Future'
            },
            {
                id: 'bus_g', name: 'Business G', tag: 'G', path: 'templates/business/g',
                description: '世界規模のネットワークを表現したグローバルデザイン。物流や商社に。',
                features: ['Logistics', 'Global', 'Network'],
                colors: ['#1e90ff', '#0d1b2a', '#ffffff'],
                image: 'assets/thumbnails/business/bus_g.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Global'
            },
            {
                id: 'bus_h', name: 'Business H', tag: 'H', path: 'templates/business/h',
                description: '圧倒的な高級感と静寂を演出するラグジュアリーデザイン。ホテルや高級ブランドに。',
                features: ['Luxury', 'Hotel', 'Premium'],
                colors: ['#d4af37', '#1a1a1a', '#ffffff'],
                image: 'assets/thumbnails/business/bus_h.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'High-end'
            },
            {
                id: 'bus_i', name: 'Business I', tag: 'I', path: 'templates/business/i',
                description: '信頼と知性を象徴するインテリジェント・デザイン。分析ツールやダッシュボードに最適です。',
                features: ['Monitoring', 'Intelligent', 'Dashboard'],
                colors: ['#0a192f', '#64ffda', '#ccd6f6'],
                image: 'assets/thumbnails/business/bus_i.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Intelligent'
            },
            {
                id: 'bus_j', name: 'Business J', tag: 'J', path: 'templates/business/j',
                description: '伝統と革新が融合する和モダン・デザイン。京都の老舗や和テイストのブランドに。',
                features: ['Modern Japanese', 'Vertical Text', 'Mincho'],
                colors: ['#2d3436', '#00b894', '#dfe6e9'],
                image: 'assets/thumbnails/business/bus_j.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Modern'
            },
            {
                id: 'bus_k', name: 'Business K', tag: 'K', path: 'templates/business/k',
                description: '理性と知性を重んじるアカデミックなデザイン。研究所や学会、教育機関向け。',
                features: ['Academic', 'Rational', 'Serif'],
                colors: ['#1a202c', '#edf2f7', '#2d3748'],
                image: 'assets/thumbnails/business/bus_k.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Knowledge'
            },
            {
                id: 'bus_l', name: 'Business L', tag: 'L', path: 'templates/business/l',
                description: '論理的思考とシステム美を体現するロジカル・デザイン。エンジニアリングやシステム開発に。',
                features: ['Systemic', 'Terminal', 'Logic Flow'],
                colors: ['#0f172a', '#38bdf8', '#1e293b'],
                image: 'assets/thumbnails/business/bus_l.webp',
                bgPosition: 'center 100%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Logical'
            },
            {
                id: 'bus_m', name: 'Business M', tag: 'M', path: 'templates/business/m',
                description: '本質のみを抽出した究極のミニマル・デザイン。プロダクトギャラリーや建築事務所に。',
                features: ['Minimalist', 'Whitespace', 'Typography'],
                colors: ['#ffffff', '#000000', '#333333'],
                image: 'assets/thumbnails/business/bus_m.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Minimal'
            },
            {
                id: 'bus_n', name: 'Business N', tag: 'N', path: 'templates/business/n',
                description: 'ネオンの鼓動を感じるサイバーパンク・デザイン。ナイトクラブやエキサイティングなイベントに。',
                features: ['Neon', 'Cyber', 'Night-life'],
                colors: ['#ff00ff', '#00ffff', '#000000'],
                image: 'assets/thumbnails/business/bus_n.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Neon Night'
            },
            {
                id: 'bus_o', name: 'Business O', tag: 'O', path: 'templates/business/o',
                description: '自然のリズムと調和する流体デザイン。スパやウェルビーイング、オーガニックブランドに。',
                features: ['Organic', 'Fluid Shape', 'Healing'],
                colors: ['#ff7f50', '#ffdced', '#ffffff'],
                image: 'assets/thumbnails/business/bus_o.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Organic Flow'
            },
            {
                id: 'bus_p', name: 'Business P', tag: 'P', path: 'templates/business/p',
                description: '元気を届けるポップで弾けるデザイン。エンターテインメントや親しみやすいブランドに。',
                features: ['Pop', 'Vibrant', 'Comic Style'],
                colors: ['#ff6600', '#ffea00', '#ff007f'],
                image: 'assets/thumbnails/business/bus_p.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Pop Vibrant'
            },
            {
                id: 'bus_q', name: 'Business Q', tag: 'Q', path: 'templates/business/q',
                description: '究極の精度と品質を象徴する、引き算の美学。高級プロダクトや精密機器ブランドに。',
                features: ['Quality', 'Precision', 'Minimal Luxury'],
                colors: ['#000000', '#ffffff', '#e5e5e5'],
                image: 'assets/thumbnails/business/bus_q.webp',
                bgPosition: 'center 85%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Quality First'
            },
            {
                id: 'bus_r', name: 'Business R', tag: 'R', path: 'templates/business/r',
                description: '格式高い伝統と権威を継承するマルチページ。歴史ある組織や高級ブランドのアーカイブに。',
                features: ['Multi-page', 'Tradition', 'Decorative'],
                colors: ['#8b0000', '#d4af37', '#0d0d0d'],
                image: 'assets/thumbnails/business/bus_r.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Royal Legacy'
            },
            {
                id: 'bus_s', name: 'Business S', tag: 'S', path: 'templates/business/s',
                description: '次世代の効率を追求したモダンなSaaS UI。テックツールやWebサービスの紹介に。',
                features: ['Modern SaaS', 'Isometric', 'High Efficiency'],
                colors: ['#8a2be2', '#f8f9fe', '#1a1a1a'],
                image: 'assets/thumbnails/business/bus_s.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Smart SaaS'
            },
            {
                id: 'bus_t', name: 'Business T', tag: 'T', path: 'templates/business/t',
                description: '堅牢なセキュリティと信頼を誓うマルチページ。金融・インフラ・セキュリティ企業向け。',
                features: ['Multi-page', 'Security', 'Robust'],
                colors: ['#434b4d', '#1e3a8a', '#f0f2f5'],
                image: 'assets/thumbnails/business/bus_t.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Trust Guard'
            },
            {
                id: 'bus_u', name: 'Business U', tag: 'U', path: 'templates/business/u',
                description: '都市のエネルギーをステンシルで刻んだストリート・デザイン。クリエイティブ集団やカルチャー拠点に。',
                features: ['Urban', 'Stencil', 'Raw Energy'],
                colors: ['#ff3e00', '#444444', '#eaeaea'],
                image: 'assets/thumbnails/business/bus_u.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Urban Street'
            },
            {
                id: 'bus_v', name: 'Business V', tag: 'V', path: 'templates/business/v',
                description: '記憶に焼き付く補色配色のインパクト・デザイン。広告・プロモーションや先鋭的なアートプロジェクトに。',
                features: ['Vivid', 'Contrast', 'Impact'],
                colors: ['#ffff00', '#ff00ff', '#000000'],
                image: 'assets/thumbnails/business/bus_v.webp',
                bgPosition: 'center 70%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Vivid Impact'
            },
            {
                id: 'bus_w', name: 'Business W', tag: 'W', path: 'templates/business/w',
                description: 'パノラマ的な広がりを見せる横スクロール・デザイン。写真・建築・風景を愛するブランドに。',
                features: ['Horizontal Scroll', 'Panorama', 'Minimal'],
                colors: ['#ffffff', '#000000', '#f0f0f0'],
                image: 'assets/thumbnails/business/bus_w.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Wide Horizon'
            },
            {
                id: 'bus_x', name: 'Business X', tag: 'X', path: 'templates/business/x',
                description: '極限のボルテージを全画面スナップで表現。エクストリームスポーツや熱狂的なプロジェクトに。',
                features: ['Snap Scroll', 'Action', 'Xtreme'],
                colors: ['#ff0000', '#000000', '#ffffff'],
                image: 'assets/thumbnails/business/bus_x.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Xtreme Snap'
            },
            {
                id: 'bus_y', name: 'Business Y', tag: 'Y', path: 'templates/business/y',
                description: '着実な成長と収益をイメージした洗練のマルチページ。コンサルティングや投資関連ビジネスに。',
                features: ['Multi-page', 'Investment', 'Sophisticated'],
                colors: ['#d4af37', '#3a4d39', '#ffffff'],
                image: 'assets/thumbnails/business/bus_y.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Yield Growth'
            },
            {
                id: 'bus_z', name: 'Business Z', tag: 'Z', path: 'templates/business/z',
                description: '究極の静寂と和の精神を形にした禅デザイン。茶室・スパ・哲学的なブランドに。',
                features: ['Zen', 'Vertical', 'Silence'],
                colors: ['#ffffff', '#1a1a1a', '#f5f5f5'],
                image: 'assets/thumbnails/business/bus_z.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Zen Garden'
            }
        ],
        'streamer': [
            {
                id: 'st_a', name: 'Abyss Neon', tag: 'A', path: 'templates/streamer/a',
                description: '深海ネオン、グリッチ、中毒性のある青とピンク。没入感溢れるサイバーパンク・デザイン。',
                features: ['Cyberpunk', 'Glitch Effect', 'Neon'],
                colors: ['#00f2ff', '#ff0055', '#05050a'],
                image: 'assets/thumbnails/streamer/st_a.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Abyss Neon'
            },
            {
                id: 'st_b', name: 'Boss Room', tag: 'B', path: 'templates/streamer/b',
                description: 'RPGのボス戦を彷彿とさせる重厚なデザイン。ダークゴールドと視差効果で圧倒的な存在感を。',
                features: ['RPG Boss', 'Parallax', 'Dark Gold'],
                colors: ['#d4af37', '#8a6d3b', '#121212'],
                image: 'assets/thumbnails/streamer/st_b.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Boss Room'
            },
            {
                id: 'st_c', name: 'Crystal Prism', tag: 'C', path: 'templates/streamer/c',
                description: '宝石のような透明感と虹色の輝き。パステルカラーのガラスモーフィズム・デザイン。',
                features: ['Glassmorphism', 'Prism', 'Pastel'],
                colors: ['#ffd6ff', '#e7ffff', '#c8b6ff'],
                image: 'assets/thumbnails/streamer/st_c.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Crystal Prism'
            },
            {
                id: 'st_d', name: 'Digital Ghost', tag: 'D', path: 'templates/streamer/d',
                description: 'デジタルノイズと匿名性の深淵。スポットライト演出がミステリアスな雰囲気を醸成。',
                features: ['Matrix', 'Spotlight', 'Mysterious'],
                colors: ['#00ff41', '#003b00', '#000000'],
                image: 'assets/thumbnails/streamer/st_d.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Digital Ghost'
            },
            {
                id: 'st_e', name: 'E-Sports Pro', tag: 'E', path: 'templates/streamer/e',
                description: 'プロ大会の熱狂と信頼を形に。清潔感のあるブルーと白のグリッドレイアウト。',
                features: ['Competitive', 'Scoreboard', 'Official'],
                colors: ['#0055ff', '#ffffff', '#0a0e1a'],
                image: 'assets/thumbnails/streamer/st_e.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'E-Sports Pro'
            },
            {
                id: 'st_f', name: 'Future Tech', tag: 'F', path: 'templates/streamer/f',
                description: '宇宙船のコンソールをイメージした未来志向のデザイン。独立したウィジェットが浮遊感を演出。',
                features: ['Sci-Fi', 'Dashboard', 'Widget'],
                colors: ['#00f2ff', '#030a10', '#00f2ff'],
                image: 'assets/thumbnails/streamer/st_f.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Future Tech'
            },
            {
                id: 'st_g', name: 'Glitch Core', tag: 'G', path: 'templates/streamer/g',
                description: 'RGBズレとカオスなエネルギー。過激な演出が視聴者の視線を釘付けにする衝撃的デザイン。',
                features: ['Glitch', 'Noise', 'Chaos'],
                colors: ['#ff0000', '#00ffff', '#000000'],
                image: 'assets/thumbnails/streamer/st_g.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Glitch Core'
            },
            {
                id: 'st_h', name: 'Horror Mansion', tag: 'H', path: 'templates/streamer/h',
                description: 'ホラーゲーム実況に特化した、没入感溢れるダークデザイン。懐中電灯演出が恐怖を誘う。',
                features: ['Horror', 'Spotlight', 'Dark'],
                colors: ['#991b1b', '#1a1a1b', '#000000'],
                image: 'assets/thumbnails/streamer/st_h.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Horror Mansion'
            },
            {
                id: 'st_i', name: 'Idol Stage', tag: 'I', path: 'templates/streamer/i',
                description: 'キラキラと輝くライブステージを再現。歌枠やアイドル系ストリーマーに最適。',
                features: ['Idol', 'Particles', 'Sparkle'],
                colors: ['#f472b6', '#ffffff', '#ffebf5'],
                image: 'assets/thumbnails/streamer/st_i.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Idol Stage'
            },
            {
                id: 'st_j', name: 'Jazz Lounge', tag: 'J', path: 'templates/streamer/j',
                description: '大人の余裕を感じさせる横スクロールデザイン。深夜の雑談やチルな配信に。',
                features: ['Side Scroll', 'Jazz', 'Chill'],
                colors: ['#b45309', '#2d1b0d', '#1a0f08'],
                image: 'assets/thumbnails/streamer/st_j.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Jazz Lounge'
            },
            {
                id: 'st_k', name: 'Knight Honor', tag: 'K', path: 'templates/streamer/k',
                description: '騎士の誇りと格式を。羊皮紙テクスチャとロイヤルブルーが織りなすマルチページ構成。',
                features: ['Knight', 'Multi-page', 'Classic'],
                colors: ['#2563eb', '#f3f4f6', '#d1d5db'],
                image: 'assets/thumbnails/streamer/st_k.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Knight Honor'
            },
            {
                id: 'st_l', name: 'Lunar Phase', tag: 'L', path: 'templates/streamer/l',
                description: '月の満ち欠けと幻想的な夜空。情緒的な配信スタイルを美しく演出。',
                features: ['Lunar', 'Fantasy', 'Calm'],
                colors: ['#fef3c7', '#4c1d95', '#1e1b4b'],
                image: 'assets/thumbnails/streamer/st_l.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Lunar Phase'
            },
            {
                id: 'st_m', name: 'Metallic Chrome', tag: 'M', path: 'templates/streamer/m',
                description: '無機質で鋭利なクロームデザイン。液体金属のような高度なビジュアル表現。',
                features: ['Metallic', 'Liquid', 'Pro'],
                colors: ['#9ca3af', '#111827', '#000000'],
                image: 'assets/thumbnails/streamer/st_m.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Metallic Chrome'
            },
            {
                id: 'st_n', name: 'Neon Night', tag: 'N', path: 'templates/streamer/n',
                description: '眠らない街のネオンサイン。都会的でストリート感のあるパープルスタイル。',
                features: ['Neon', 'Urban', 'Street'],
                colors: ['#7000ff', '#1e1b4b', '#020617'],
                image: 'assets/thumbnails/streamer/st_n.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Neon Night'
            },
            {
                id: 'st_o', name: 'Orbit Space', tag: 'O', path: 'templates/streamer/o',
                description: '宇宙の壮大さと浮遊感を表現した全画面スクロールデザイン。銀河を旅するような体験を。',
                features: ['Full-page', 'Snap Scroll', 'Space'],
                colors: ['#00d2ff', '#3a7bd5', '#000222'],
                image: 'assets/thumbnails/streamer/st_o.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Orbit Space'
            },
            {
                id: 'st_p', name: 'Pixel Retro', tag: 'P', path: 'templates/streamer/p',
                description: '懐かしの8-bitスタイル。ドット絵とPress Start 2Pフォントが織りなすレトロな世界観。',
                features: ['8-bit', 'Pixel Art', 'Retro'],
                colors: ['#22c55e', '#795548', '#000000'],
                image: 'assets/thumbnails/streamer/st_p.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Pixel Retro'
            },
            {
                id: 'st_q', name: 'Quest Log', tag: 'Q', path: 'templates/streamer/q',
                description: '王道RPGのメニュー画面をWebサイトに。冒険の記録（配信内容）を美しく整理。',
                features: ['RPG UI', 'Log Style', 'Fantasy'],
                colors: ['#f5e6be', '#5d4037', '#2b1d0e'],
                image: 'assets/thumbnails/streamer/st_q.webp',
                bgPosition: 'center 20%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Quest Log'
            },
            {
                id: 'st_r', name: 'Rogue Stealth', tag: 'R', path: 'templates/streamer/r',
                description: '暗闇に紛れるアウトロースタイル。スモーク演出とヴィネット効果が緊張感を醸成。',
                features: ['Stealth', 'Smoke Effect', 'Dark Red'],
                colors: ['#991b1b', '#000000', '#1a1a1a'],
                image: 'assets/thumbnails/streamer/st_r.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Rogue Stealth'
            },
            {
                id: 'st_s', name: 'Steampunk Gear', tag: 'S', path: 'templates/streamer/s',
                description: '蒸気と歯車の重厚なマルチページ。産業革命時代のレトロフューチャリスティックなデザイン。',
                features: ['Steampunk', 'Multi-page', 'Gear'],
                colors: ['#b87333', '#262626', '#1a1a1a'],
                image: 'assets/thumbnails/streamer/st_s.webp',
                bgPosition: 'center 70%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Steampunk Gear'
            },
            {
                id: 'st_t', name: 'Tech Logic', tag: 'T', path: 'templates/streamer/t',
                description: '論理的で戦略的なダッシュボード。回路基板のような幾何学的な美しさを。',
                features: ['Tech', 'Logic', 'Circuit'],
                colors: ['#06b6d4', '#1f2937', '#111827'],
                image: 'assets/thumbnails/streamer/st_t.webp',
                bgPosition: 'center 50%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Tech Logic'
            },
            {
                id: 'st_u', name: 'Urban Graffiti', tag: 'U', path: 'templates/streamer/u',
                description: '自由なストリート文化を体現。スプレーアートと全画面スクロールの躍動感。',
                features: ['Graffiti', 'Street', 'Vivid'],
                colors: ['#fbbf24', '#262626', '#181818'],
                image: 'assets/thumbnails/streamer/st_u.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Urban Graffiti'
            },
            {
                id: 'st_v', name: 'Vivid Glitch', tag: 'V', path: 'templates/streamer/v',
                description: '色彩が弾け、視覚が震える。スクロール連動型のRGBズレ演出が強烈な個性を放つ。',
                features: ['Vivid', 'RGB Shift', 'Glitch'],
                colors: ['#ff00ff', '#00ffff', '#000000'],
                image: 'assets/thumbnails/streamer/st_v.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Vivid Glitch'
            },
            {
                id: 'st_w', name: 'Wide Pan', tag: 'W', path: 'templates/streamer/w',
                description: '地平線まで続くかのような圧倒的スケール。横スクロールと視差効果によるパノラマ体験。',
                features: ['Side Scroll', 'Parallax', 'Scenic'],
                colors: ['#10b981', '#064e3b', '#000000'],
                image: 'assets/thumbnails/streamer/st_w.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Wide Pan'
            },
            {
                id: 'st_x', name: 'Xtreme Action', tag: 'X', path: 'templates/streamer/x',
                description: '爆発的なエネルギーと躍動感。衝撃波エフェクトがセクション切り替えに劇的な緊迫感を。',
                features: ['Xtreme', 'Shockwave', 'Snap Scroll'],
                colors: ['#fbbf24', '#000000', '#78350f'],
                image: 'assets/thumbnails/streamer/st_x.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Xtreme Action'
            },
            {
                id: 'st_y', name: 'Yield Chart', tag: 'Y', path: 'templates/streamer/y',
                description: '上昇し続ける数値とリアルタイムチャート。成長を可視化するトレーディング風デザイン。',
                features: ['Trading', 'Counter', 'Chart'],
                colors: ['#22c55e', '#1a2e05', '#ffffff'],
                image: 'assets/thumbnails/streamer/st_y.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Yield Chart'
            },
            {
                id: 'st_z', name: 'Zen Brush', tag: 'Z', path: 'templates/streamer/z',
                description: '静寂の中の力強さ。一筆書きのアニメーションと和の精神が宿るマルチページ。',
                features: ['Zen', 'Brush Stroke', 'Multi-page'],
                colors: ['#171717', '#fafafa', '#404040'],
                image: 'assets/thumbnails/streamer/st_z.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Zen Brush'
            }
        ],
        'lp': [
            {
                id: 'lp_a',
                name: 'App Showcase',
                tag: 'A',
                path: 'templates/lp/a',
                description: 'スマホの中のアプリが実際に動く、没入型デモンストレーション。アプリやSaaSの魅力が直感的に伝わります。',
                features: ['Interactive Mockup', 'Scroll Animation', 'App/SaaS'],
                colors: ['#2563EB', '#ffffff', '#F8FAFC'],
                image: 'assets/thumbnails/lp/lp_a.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'App Showcase'
            },
            {
                id: 'lp_b',
                name: 'Brand Story',
                tag: 'B',
                path: 'templates/lp/b',
                description: 'ブランドの世界観を余すことなく表現するストーリーテリング型LP。D2Cやアパレルの「想い」を伝えます。',
                features: ['Parallax', 'Storytelling', 'D2C/Brand'],
                colors: ['#A68A64', '#57534E', '#FAFAF9'],
                image: 'assets/thumbnails/lp/lp_b.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Brand Story'
            },
            {
                id: 'lp_c', name: 'Campaign Flow', tag: 'C', path: 'templates/lp/c',
                description: '期間限定キャンペーンやセールに勝つための、緊急性と期待感を煽るデザイン。',
                features: ['Campaign', 'Sale', 'Urgency'],
                colors: ['#ef4444', '#fee2e2', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_c.webp',
                bgPosition: 'center 35%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Campaign Flow'
            },
            {
                id: 'lp_d', name: 'Digital SaaS', tag: 'D', path: 'templates/lp/d',
                description: 'B2B向けSaaS製品の機能とメリットを、論理的かつ洗練されたUIで訴求。',
                features: ['SaaS', 'B2B', 'Tech'],
                colors: ['#0f172a', '#38bdf8', '#f8fafc'],
                image: 'assets/thumbnails/lp/lp_d.webp',
                bgPosition: 'center 25%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Digital SaaS'
            },
            {
                id: 'lp_e', name: 'Event Summit', tag: 'E', path: 'templates/lp/e',
                description: 'オンラインセミナーやカンファレンスの集客に特化した、熱量と信頼を伝えるデザイン。',
                features: ['Event', 'Seminar', 'Conf'],
                colors: ['#4f46e5', '#312e81', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_e.webp',
                bgPosition: 'center 35%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Event Summit'
            },
            {
                id: 'lp_f', name: 'Food & Dining', tag: 'F', path: 'templates/lp/f',
                description: 'シズル感たっぷりの写真で食欲を刺激。レストランや食品通販のCV率を高めます。',
                features: ['Food', 'Restaurant', 'Delicious'],
                colors: ['#ea580c', '#fff7ed', '#292524'],
                image: 'assets/thumbnails/lp/lp_f.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Food & Dining'
            },
            {
                id: 'lp_g', name: 'Gym & Fit', tag: 'G', path: 'templates/lp/g',
                description: '力強さと躍動感を表現。フィットネスジムやパーソナルトレーニングの入会促進に。',
                features: ['Fitness', 'Gym', 'Energy'],
                colors: ['#000000', '#bef264', '#171717'],
                image: 'assets/thumbnails/lp/lp_g.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Gym & Fit'
            },
            {
                id: 'lp_h', name: 'Health Clinic', tag: 'H', path: 'templates/lp/h',
                description: '清潔感と安心感を最優先。クリニックや整体院の予約獲得に最適化されたデザイン。',
                features: ['Medical', 'Clinic', 'Trust'],
                colors: ['#0ea5e9', '#f0f9ff', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_h.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Health Clinic'
            },
            {
                id: 'lp_i', name: 'Interior Art', tag: 'I', path: 'templates/lp/i',
                description: '住空間の美しさを引き立てる、余白を活かした不動産・リノベーション向けLP。',
                features: ['Real Estate', 'Interior', 'Space'],
                colors: ['#57534e', '#e7e5e4', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_i.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Interior Art'
            },
            {
                id: 'lp_j', name: 'Jewelry Lux', tag: 'J', path: 'templates/lp/j',
                description: '高級感あふれるセリフ体とゴールドのあしらい。ジュエリーや時計のブランディングに。',
                features: ['Luxury', 'Jewelry', 'Gold'],
                colors: ['#b45309', '#fffbeb', '#1c1917'],
                image: 'assets/thumbnails/lp/lp_j.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Jewelry Lux'
            },
            {
                id: 'lp_k', name: 'Knowledge Base', tag: 'K', path: 'templates/lp/k',
                description: '学びへの意欲を掻き立てるアカデミックなデザイン。スクールやオンライン講座に。',
                features: ['Education', 'School', 'Academic'],
                colors: ['#047857', '#ecfdf5', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_k.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Knowledge Base'
            },
            {
                id: 'lp_l', name: 'Legal Trust', tag: 'L', path: 'templates/lp/l',
                description: '「頼れる」「相談できる」イメージを確立。法律事務所や税理士法人の集客に。',
                features: ['Legal', 'Trust', 'Professional'],
                colors: ['#1e40af', '#1e3a8a', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_l.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Legal Trust'
            },
            {
                id: 'lp_m', name: 'Media & News', tag: 'M', path: 'templates/lp/m',
                description: '最新情報をスタイリッシュに発信。ニュースメディアや情報商材のローンチに。',
                features: ['Media', 'News', 'Modern'],
                colors: ['#2dd4bf', '#134e4a', '#f0fdfa'],
                image: 'assets/thumbnails/lp/lp_m.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Media & News'
            },
            {
                id: 'lp_n', name: 'Nature Beauty', tag: 'N', path: 'templates/lp/n',
                description: '自然派コスメやオーガニック製品の魅力を伝える、優しく透明感のあるデザイン。',
                features: ['Organic', 'Beauty', 'Nature'],
                colors: ['#a3e635', '#f7fee7', '#3f6212'],
                image: 'assets/thumbnails/lp/lp_n.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Nature Beauty'
            },
            {
                id: 'lp_o', name: 'One Product', tag: 'O', path: 'templates/lp/o',
                description: 'たった一つの商品にスポットライトを。ガジェットやアイデア商品の購入率を最大化。',
                features: ['Single Product', 'Focus', 'Gadget'],
                colors: ['#6366f1', '#eef2ff', '#111827'],
                image: 'assets/thumbnails/lp/lp_o.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'One Product'
            },
            {
                id: 'lp_p', name: 'Pet Life', tag: 'P', path: 'templates/lp/p',
                description: '愛らしさと温かみで飼い主の心を掴む。ペットサロンや動物病院向け。',
                features: ['Pet', 'Cute', 'Warm'],
                colors: ['#f59e0b', '#fffbeb', '#78350f'],
                image: 'assets/thumbnails/lp/lp_p.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Pet Life'
            },
            {
                id: 'lp_q', name: 'Quiz & Lead', tag: 'Q', path: 'templates/lp/q',
                description: '診断コンテンツやクイズで楽しみながらリードを獲得。インタラクティブなマーケティングに。',
                features: ['Quiz', 'Interactive', 'Lead'],
                colors: ['#ec4899', '#fdf2f8', '#831843'],
                image: 'assets/thumbnails/lp/lp_q.webp',
                bgPosition: 'center 35%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Quiz & Lead'
            },
            {
                id: 'lp_r', name: 'Recruit Hero', tag: 'R', path: 'templates/lp/r',
                description: '企業の未来を担う人材へ。情熱とビジョンを語りかける採用特化型LP。',
                features: ['Recruit', 'Vision', 'Passion'],
                colors: ['#dc2626', '#fef2f2', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_r.webp',
                bgPosition: 'center 35%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Recruit Hero'
            },
            {
                id: 'lp_s', name: 'Service & Tech', tag: 'S', path: 'templates/lp/s',
                description: 'Webサービスやアプリの利便性をスマートに紹介。回遊性を抑えCVへ直結。',
                features: ['Service', 'App', 'Smart'],
                colors: ['#8b5cf6', '#f5f3ff', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_s.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Service & Tech'
            },
            {
                id: 'lp_t', name: 'Travel & Stay', tag: 'T', path: 'templates/lp/t',
                description: '非日常への没入感を演出。ホテル予約や観光ツアーの申し込みを後押し。',
                features: ['Travel', 'Resort', 'Experience'],
                colors: ['#06b6d4', '#ecfeff', '#164e63'],
                image: 'assets/thumbnails/lp/lp_t.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Travel & Stay'
            },
            {
                id: 'lp_u', name: 'Utility Tool', tag: 'U', path: 'templates/lp/u',
                description: '機能美を追求したツール紹介。開発者やプロフェッショナル層に響くデザイン。',
                features: ['Utility', 'Tool', 'Functional'],
                colors: ['#64748b', '#f1f5f9', '#0f172a'],
                image: 'assets/thumbnails/lp/lp_u.webp',
                bgPosition: 'center 35%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Utility Tool'
            },
            {
                id: 'lp_v', name: 'Visual Story', tag: 'V', path: 'templates/lp/v',
                description: '動画や画像を全面に押し出し、視覚情報で直感的に魅力を伝えるVSLスタイル。',
                features: ['Video', 'Visual', 'Impact'],
                colors: ['#000000', '#ffffff', '#e5e5e5'],
                image: 'assets/thumbnails/lp/lp_v.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Visual Story'
            },
            {
                id: 'lp_w', name: 'Webinar Host', tag: 'W', path: 'templates/lp/w',
                description: '専門性と講師の人柄をアピール。ウェビナー申し込みや動画教材の販売に。',
                features: ['Webinar', 'Expert', 'Trust'],
                colors: ['#2e1065', '#faf5ff', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_w.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Webinar Host'
            },
            {
                id: 'lp_x', name: 'Xross Media', tag: 'X', path: 'templates/lp/x',
                description: 'SNSと連動し、バズを生み出すための仕掛けが満載。バイラルマーケティングに。',
                features: ['Viral', 'SNS', 'Cross Media'],
                colors: ['#1da1f2', '#000000', '#ffffff'],
                image: 'assets/thumbnails/lp/lp_x.webp',
                bgPosition: 'center 40%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Xross Media'
            },
            {
                id: 'lp_y', name: 'Youth Culture', tag: 'Y', path: 'templates/lp/y',
                description: 'トレンドに敏感な若者層へ。ポップでエッジの効いたデザインが共感を生む。',
                features: ['Youth', 'Trend', 'Pop'],
                colors: ['#fbbf24', '#fef3c7', '#000000'],
                image: 'assets/thumbnails/lp/lp_y.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Youth Culture'
            },
            {
                id: 'lp_z', name: 'Zone Focus', tag: 'Z', path: 'templates/lp/z',
                description: '特定のターゲット層に深く刺さる、ニッチで尖ったコンセプトLP。',
                features: ['Niche', 'Focus', 'Deep'],
                colors: ['#4c1d95', '#ffffff', '#000000'],
                image: 'assets/thumbnails/lp/lp_z.webp',
                bgPosition: 'center 30%', // [Adjust] Vertical position: 0% (Top) - 100% (Bottom)
                themeLabel: 'Zone Focus'
            }
        ],
        'portfolio': [
            {
                id: 'pf_a', name: 'Aurora', tag: 'A', path: 'templates/portfolio/a',
                description: '複数のグラデーションと発光効果を使った「生きたオーロラ」体験。ビジュアルデザイナーのポートフォリオに最適です。',
                features: ['Aurora', 'Gradient', 'Visual Design'],
                colors: ['#00f2ff', '#ff0055', '#1a1a2e'],
                image: 'assets/thumbnails/portfolio/pf_a.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Aurora'
            },
            {
                id: 'pf_b', name: 'Blueprint', tag: 'B', path: 'templates/portfolio/b',
                description: '設計図の線がスクロールで描画される堅牢なデザイン。バックエンドエンジニアやシステムアーキテクトに。',
                features: ['Blueprint', 'SVG Animation', 'System'],
                colors: ['#2563eb', '#1e3a8a', '#f1f5f9'],
                image: 'assets/thumbnails/portfolio/pf_b.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Blueprint'
            },
            {
                id: 'pf_c', name: 'Cinematic', tag: 'C', path: 'templates/portfolio/c',
                description: '21:9の画角と超低速ズーム効果。映像クリエイターやディレクターの作品を映画のように魅せます。',
                features: ['Cinematic', 'Ken Burns', 'Video'],
                colors: ['#000000', '#1a1a1a', '#ffffff'],
                image: 'assets/thumbnails/portfolio/pf_c.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Cinematic'
            },
            {
                id: 'pf_d', name: 'Darkmode', tag: 'D', path: 'templates/portfolio/d',
                description: '完全な漆黒の背景に、ホバー時だけ局所的に発光するストイックな意匠。デベロッパーやハッカー向け。',
                features: ['Darkmode', 'Terminal', 'Glow'],
                colors: ['#00ff00', '#000000', '#111111'],
                image: 'assets/thumbnails/portfolio/pf_d.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Darkmode'
            },
            {
                id: 'pf_e', name: 'Ethereal', tag: 'E', path: 'templates/portfolio/e',
                description: '圧倒的な余白と、スクロールで浮き上がる「雲のレイヤー」。女性的なUIデザインやアートに。',
                features: ['Ethereal', 'Parallax', 'Feminine'],
                colors: ['#fdf2f8', '#ffffff', '#db2777'],
                image: 'assets/thumbnails/portfolio/pf_e.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Ethereal'
            },
            {
                id: 'pf_f', name: 'Film', tag: 'F', path: 'templates/portfolio/f',
                description: '横スクロールを強制するフィルムストリップレイアウト。写真家のアナログな作品集に没入感を与えます。',
                features: ['Film', 'Horizontal Scroll', 'Photo'],
                colors: ['#262626', '#171717', '#e5e5e5'],
                image: 'assets/thumbnails/portfolio/pf_f.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Film'
            },
            {
                id: 'pf_g', name: 'Glassmorphism', tag: 'G', path: 'templates/portfolio/g',
                description: '強烈なメッシュグラデーション背景と、分厚い擦りガラスのカード。トレンドを追うUI/UXデザイナー向け。',
                features: ['Glassmorphism', 'Mesh', 'Trendy'],
                colors: ['#a855f7', '#ec4899', '#ffffff'],
                image: 'assets/thumbnails/portfolio/pf_g.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Glassmorphism'
            },
            {
                id: 'pf_h', name: 'Holographic', tag: 'H', path: 'templates/portfolio/h',
                description: 'デバイスの傾きやマウス位置に応じた七色のホログラフィック反射。3D・クリプトアーティストの顔に。',
                features: ['Holographic', 'RGB Split', '3D Art'],
                colors: ['#00ffff', '#ff00ff', '#1a1a1a'],
                image: 'assets/thumbnails/portfolio/pf_h.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Holographic'
            },
            {
                id: 'pf_i', name: 'Infinite', tag: 'I', path: 'templates/portfolio/i',
                description: 'Z軸の奥行きに特化。スクロールするたび星屑に飛び込んでいく圧倒的没入感。VFXアーティスト向け。',
                features: ['Infinite', 'Z-axis', 'VFX'],
                colors: ['#020617', '#1e293b', '#38bdf8'],
                image: 'assets/thumbnails/portfolio/pf_i.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Infinite'
            },
            {
                id: 'pf_j', name: 'Journal', tag: 'J', path: 'templates/portfolio/j',
                description: 'タイポグラフィの美しさを極めた雑誌のような段組み。エディターや文筆家のコンテンツポートフォリオに。',
                features: ['Journal', 'Typography', 'Editorial'],
                colors: ['#f8fafc', '#334155', '#0f172a'],
                image: 'assets/thumbnails/portfolio/pf_j.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Journal'
            },
            {
                id: 'pf_k', name: 'Kinetic', tag: 'K', path: 'templates/portfolio/k',
                description: 'テキストや画像が重力を持つように揺れる物理演算UI。クリエイティブコーダーやモーションデザイナーに。',
                features: ['Kinetic', 'Physics', 'Motion'],
                colors: ['#ef4444', '#171717', '#ffffff'],
                image: 'assets/thumbnails/portfolio/pf_k.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Kinetic'
            },
            {
                id: 'pf_l', name: 'Line', tag: 'L', path: 'templates/portfolio/l',
                description: 'すべての境目が1pxの絶対的な実線で描かれるミニマル空間。建築家やミニマリストの思想を体現。',
                features: ['Line', '1px Solid', 'Architect'],
                colors: ['#ffffff', '#000000', '#a3a3a3'],
                image: 'assets/thumbnails/portfolio/pf_l.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Line'
            },
            {
                id: 'pf_m', name: 'Minimal', tag: 'M', path: 'templates/portfolio/m',
                description: '極限まで装飾を削ぎ落とし、画面に入る瞬間に文字が静かに現れるReveal。アートディレクター至高の選択。',
                features: ['Minimal', 'Reveal', 'Art Director'],
                colors: ['#f5f5f5', '#1a1a1a', '#e5e5e5'],
                image: 'assets/thumbnails/portfolio/pf_m.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Minimal'
            },
            {
                id: 'pf_n', name: 'Neon', tag: 'N', path: 'templates/portfolio/n',
                description: '本物のネオン管の輝きとランダムなフリッカー（点滅）アニメーション。ミュージシャンやナイトクラブ向け。',
                features: ['Neon', 'Flicker', 'Night-life'],
                colors: ['#000000', '#ff00ff', '#00ffff'],
                image: 'assets/thumbnails/portfolio/pf_n.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Neon'
            },
            {
                id: 'pf_o', name: 'Obsidian', tag: 'O', path: 'templates/portfolio/o',
                description: '黒曜石のテクスチャと、上から滑り落ちる赤い光のスポットライト。ラグジュアリーブランドの威厳を。',
                features: ['Obsidian', 'Spotlight', 'Luxury'],
                colors: ['#0a0a0a', '#991b1b', '#262626'],
                image: 'assets/thumbnails/portfolio/pf_o.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Obsidian'
            },
            {
                id: 'pf_p', name: 'Paper', tag: 'P', path: 'templates/portfolio/p',
                description: '紙の重なりと影の物理的正確さを追求。ホバーで本当に紙が持ち上がったかのような質感。イラストレーターに。',
                features: ['Paper', 'Shadow', 'Illustrator'],
                colors: ['#fefce8', '#78350f', '#fef08a'],
                image: 'assets/thumbnails/portfolio/pf_p.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Paper'
            },
            {
                id: 'pf_q', name: 'Quantum', tag: 'Q', path: 'templates/portfolio/q',
                description: '無機質なノードとエッジが繋がり合うネットワークアニメーション。データサイエンティストの叡智を視覚化。',
                features: ['Quantum', 'Network', 'Data Science'],
                colors: ['#111827', '#10b981', '#ffffff'],
                image: 'assets/thumbnails/portfolio/pf_q.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Quantum'
            },
            {
                id: 'pf_r', name: 'Retro', tag: 'R', path: 'templates/portfolio/r',
                description: '意図的なブロックノイズやRGBの色ズレ（Glitch）。インディーゲーム開発者のレトロなポートフォリオに。',
                features: ['Retro', 'Glitch', '8-bit'],
                colors: ['#172554', '#facc15', '#ef4444'],
                image: 'assets/thumbnails/portfolio/pf_r.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Retro'
            },
            {
                id: 'pf_s', name: 'Space', tag: 'S', path: 'templates/portfolio/s',
                description: '直線的ではなく、中心の周りを衛星のように要素が「円軌道」で周回する独特のレイアウト。3Dクリエイター向け。',
                features: ['Space', 'Orbit', 'Aerospace'],
                colors: ['#0f172a', '#e2e8f0', '#3b82f6'],
                image: 'assets/thumbnails/portfolio/pf_s.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Space'
            },
            {
                id: 'pf_t', name: 'Typography', tag: 'T', path: 'templates/portfolio/t',
                description: '巨大なアウトラインテキストが背景を埋め尽くし、スクロールでスライド。タイポグラファーの文字への執着を形に。',
                features: ['Typography', 'Outline', 'Graphic'],
                colors: ['#fafafa', '#000000', '#a1a1aa'],
                image: 'assets/thumbnails/portfolio/pf_t.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Typography'
            },
            {
                id: 'pf_u', name: 'Underwater', tag: 'U', path: 'templates/portfolio/u',
                description: 'SVGフィルターによる水面のゆらぎエフェクト。ダイバーやネイチャーフォトグラファーの静謐な世界観。',
                features: ['Underwater', 'Displacement', 'Nature'],
                colors: ['#083344', '#22d3ee', '#cffafe'],
                image: 'assets/thumbnails/portfolio/pf_u.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Underwater'
            },
            {
                id: 'pf_v', name: 'Vintage', tag: 'V', path: 'templates/portfolio/v',
                description: '薄いセピア・ビネットフィルターとホコリのテクスチャ。歴史家やクラフトマンの経年劣化したヴィンテージ空間。',
                features: ['Vintage', 'Sepia', 'Craftsman'],
                colors: ['#fde68a', '#451a03', '#92400e'],
                image: 'assets/thumbnails/portfolio/pf_v.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Vintage'
            },
            {
                id: 'pf_w', name: 'Watercolor', tag: 'W', path: 'templates/portfolio/w',
                description: '画像の境界を水彩画の筆跡そのままの形にマスク（mask-image）。画家のための柔らかく曖昧な表現。',
                features: ['Watercolor', 'Mask', 'Painter'],
                colors: ['#fdf4ff', '#c026d3', '#fbcfe8'],
                image: 'assets/thumbnails/portfolio/pf_w.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Watercolor'
            },
            {
                id: 'pf_x', name: 'Xenon', tag: 'X', path: 'templates/portfolio/x',
                description: 'ホバー時に白い光の帯（Sheen）が鋭く走るCSSアニメーション。インダストリアルデザインや自動車関連に。',
                features: ['Xenon', 'Sheen', 'Industrial'],
                colors: ['#1c1917', '#e7e5e4', '#fb923c'],
                image: 'assets/thumbnails/portfolio/pf_x.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Xenon'
            },
            {
                id: 'pf_y', name: 'Yarn', tag: 'Y', path: 'templates/portfolio/y',
                description: 'すべてのボーダーを破線やステッチ風に見せた、丸みを帯びたポップな手触り感。アパレルや手芸作家に。',
                features: ['Yarn', 'Dashed', 'Handcraft'],
                colors: ['#fff1f2', '#e11d48', '#fecdd3'],
                image: 'assets/thumbnails/portfolio/pf_y.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Yarn'
            },
            {
                id: 'pf_z', name: 'Zen', tag: 'Z', path: 'templates/portfolio/z',
                description: 'スクロールで「筆文字」が描かれるアニメーションと枯山水テクスチャ。和風建築家や哲学的なポートフォリオに。',
                features: ['Zen', 'Brush', 'Japanese Architect'],
                colors: ['#f5f5f4', '#1c1917', '#d6d3d1'],
                image: 'assets/thumbnails/portfolio/pf_z.webp',
                bgPosition: 'center 50%',
                themeLabel: 'Zen'
            }
        ]
    }
};

export { PORTAL_DATA };
