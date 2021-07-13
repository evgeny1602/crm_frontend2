import colors from 'vuetify/lib/util/colors'

const vuetify_colors_config = {
    theme: {
        themes: {
            light: {
                primary: colors.blue.darken1,
                secondary: colors.blue.darken1,
                accent: colors.shades.white,
                error: colors.red.accent3,
                background: colors.grey.lighten3,
                background_light: colors.shades.white,
                font_color: colors.grey.darken4,
                success: colors.green.darken1
            },
            dark: {
                primary: colors.blue.darken2,
                secondary: colors.blue.darken2,
                accent: colors.grey.darken3,
                background: colors.grey.darken3,
                error: colors.red.accent3,
                success: colors.green.darken1
            }
        }
    }
}

export default vuetify_colors_config