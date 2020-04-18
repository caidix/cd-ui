import CdTabPane from "../tabs/src/tab-pane";

CdTabPane.install = function(Vue) {
  Vue.component(CdTabPane.name, CdTabPane);
};

export default CdTabPane;
