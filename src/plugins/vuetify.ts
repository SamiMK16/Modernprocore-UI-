import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import {colors} from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#027f84', // #E53935
                secondary: '#02B3BADF', // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
            },
        },
    },
});
