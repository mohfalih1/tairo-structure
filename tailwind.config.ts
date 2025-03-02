import { withShurikenUI } from '@shuriken-ui/tailwind'
import { join } from 'path'
import defaultTheme from 'tailwindcss/defaultTheme'

/**
 * This is the Tailwind config file for the demo.
 * It extends the default config from @shuriken-ui/tailwind
 *
 * You can add/override your own customizations here.
 */
export default withShurikenUI({
    content: [join(__dirname, `/utils/**/*.ts`)], // Parse the utils folder for demo
    safelist: [
        // Those classes are used in the pageTransition config in nuxt.config.ts
        'transition-all',
        'duration-200',
        'duration-75',
        'ease-out',
        'ease-in',
        'opacity-0',
        'opacity-100',
    ],
    theme: {
        // Custom fonts
        fontFamily: {
            sans: ['Tajawal', 'sans-serif'],
            heading: ['Tajawal', 'sans-serif'],
            alt: ['Tajawal', 'sans-serif'],
            mono: ['Fira Code Variable', ...defaultTheme.fontFamily.mono],
        },
        extend: {
            // Custom font size
            fontSize: {
                label: '0.825rem',
            },
            // Custom box shadow
            boxShadow: {
                'onsuccess': '3px 0px 80px 5px rgba(0, 237, 81, 1)',
                'ondanger': '3px 0px 80px 5px rgba(240, 66, 72, 1)',
              },
            // Custom colors
            // Custom color shades generate with https://www.tints.dev/brand/4E3CB9
            colors: {

                backDark:{
                    50: '#F6F6F6',
                    100: '#EDEDED',
                    200: '#D3D3D3',
                    300: '#B9B9B9',
                    400: '#848484',
                    500: '#4F4F4F',
                    600: '#474747',
                    700: '#2F2F2F',
                    800: '#242424',
                    900: '#171717',
                    950: '#1E1E1E',
                },
                backLight:{
                    50: '#F9F9F9',
                    100: '#F2F2F2',
                    200: '#E0E0E0',
                    300: '#CECECE',
                    400: '#ABABAB',
                    500: '#888888',
                    600: '#7A7A7A',
                    700: '#525252',
                    800: '#3D3D3D',
                    900: '#282828',
                    950: '#141414',
                },
                primary: {
                    50: '#E3F2FF',
                    100: '#B8DDFF',
                    200: '#8AC7FF',
                    300: '#5CB0FF',
                    400: '#2D99FF',
                    500: '#037EFF',  // Primary color
                    600: '#036ED4',
                    700: '#025AA8',
                    800: '#01467D',
                    900: '#003352',
                    950: '#00233B',
                },
                // muted: colors.stone,
                info: {
                    50: '#E3E2FD',
                    100: '#C3C1FB',
                    200: '#8682F7',
                    300: '#4A44F3',
                    400: '#160FEB',
                    500: '#0F0BAB',
                    600: '#0D098B',
                    700: '#0A0665',
                    800: '#060443',
                    900: '#030222',
                    950: '#020113',
                },
                success: {
                    50: '#E0FFF9',
                    100: '#BDFFF3',
                    200: '#80FFE8',
                    300: '#3DFFDB',
                    400: '#00FACC',
                    500: '#00B998',
                    600: '#009479',
                    700: '#00705C',
                    800: '#004D3E',
                    900: '#00241D',
                    950: '#001411',
                },
                warning: {
                    50: '#FFF4E5',
                    100: '#FFEACC',
                    200: '#FFD599',
                    300: '#FFBF66',
                    400: '#FFAA33',
                    500: '#FF9500',
                    600: '#CC7700',
                    700: '#995900',
                    800: '#663C00',
                    900: '#331E00',
                    950: '#190F00',
                },
                danger: {
                    50: '#FCE8EE',
                    100: '#F9CDDA',
                    200: '#F3A0B9',
                    300: '#ED6E94',
                    400: '#E84072',
                    500: '#D51A52',
                    600: '#AD1543',
                    700: '#7F1031',
                    800: '#560B21',
                    900: '#290510',
                    950: '#170309',
                },
                mauve: {
                    50: '#EEECF9',
                    100: '#DCD8F3',
                    200: '#B6AEE5',
                    300: '#9488D8',
                    400: '#6E5DCB',
                    500: '#fff',
                    600: '#3E2F92',
                    700: '#302470',
                    800: '#1F1849',
                    900: '#100C27',
                    950: '#080613',
                },
                muted: {
                    50: '#E3F0FF', // active text, border - lighter and cooler tone
                    100: '#C7D4E8', // muted border or light text
                    200: '#A0B2C7', // muted text
                    300: '#7B8798', // slightly darker than original for balance with blue
                    400: '#5A6A7D', // light background
                    500: '#3C4E63', // background
                    600: '#2E3D4E', // dark background
                    700: '#202C39', // darker bg or text
                    800: '#151E27', // very dark bg or highlights
                    900: '#0A1014', // near black
                    950: '#05080A', // black
                  },
                transparent: 'transparent',
                /**
                 * We use CSS variables to define our colors so that we can easily
                 * change them in the browser.
                 *
                 * The <alpha-value> placeholder is replaced with the alpha value
                 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
                 *
                 * @example .demo/assets/css/colors.css
                 * @example .demo/utils/colors-switcher.ts
                 * @example .demo/components/DemoAppLayoutSwitcher.vue
                 */
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'spin-fast': 'spin 0.65s linear infinite',
            },
        },
    },
})
