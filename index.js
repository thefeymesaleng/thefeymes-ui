import { FVScroll } from "./components/f/VScroll.vue";

export default {
  install: (app, options) => {
    app.component("FVScroll", FVScroll);
  },
};
