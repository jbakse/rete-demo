import Rete from "rete";
import Vue from "vue/dist/vue.esm";

////////////////////////////////////////////////////////////////////////////////
// numSocket

const numSocket = new Rete.Socket("Number value");

////////////////////////////////////////////////////////////////////////////////
// numControl

var VueNumControl = Vue.component("num", {
  props: ["readonly", "emitter", "ikey", "getData", "putData"],
  template: `
  <input 
    type="number" 
    :readonly="readonly" 
    :value="value" 
    @input="change($event)" 
    @dblclick.stop="" 
    @pointerdown.stop="" 
    @pointermove.stop=""
  />
  `,
  data() {
    return {
      value: 0
    };
  },
  methods: {
    change(e) {
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) this.putData(this.ikey, this.value);
      this.emitter.trigger("process");
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
});

class NumControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

////////////////////////////////////////////////////////////////////////////////
// NumComponent

export class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  builder(node) {
    let out = new Rete.Output("num", "Number", numSocket);
    node.description = "It is a Number.";
    node.addControl(new NumControl(this.editor, "num"));
    node.addOutput(out);
    console.log(node);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}
