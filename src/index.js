import "babel-polyfill";

import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";

import { NumComponent } from "./number";

import CustomNode from "./custom_node.vue";

async function init() {
  const container = document.querySelector("#rete");
  const editor = new Rete.NodeEditor("demo@0.1.0", container);

  editor.use(ConnectionPlugin);
  editor.use(VueRenderPlugin, {
    component: CustomNode
  });

  const numComponent = new NumComponent();
  editor.register(numComponent);

  const engine = new Rete.Engine("demo@0.1.0");
  engine.register(numComponent);

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  var n1 = await numComponent.createNode({ num: 2 });
  n1.position = [80, 200];
  editor.addNode(n1);
}

init();
