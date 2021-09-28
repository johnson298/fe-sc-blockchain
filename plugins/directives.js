import Vue from 'vue';

/*** MAKE EMIT EVENT ***/
let emit = (vnode, name, data) => {
    let handlers = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners);

    if (handlers && handlers[name]) {
        handlers[name].fns(data);
    }
};

/*** DEFINE ID DIRECTIVE ***/
Vue.directive('validNumber', {
    bind(el, binding, vnode) {

      el.addEventListener('keypress', (e) => {
        const value = e.key;
        const regex = /[^ a-zA-Z0-9:/\.\\\_]/g;
        if (regex.test(value))
          e.preventDefault();
      });

    }
});

Vue.directive('validRegex', {
  bind(el, binding, vnode){
    el.addEventListener('keypress', (e) => {
      const value = e.key;
      const regex = binding.expression;
      if(!regex) return;
      const regexStr = regex.substring(1, regex.length-1);
      const test = new RegExp(regexStr).test(value);
      if (!test)
        e.preventDefault();
    });
  }
})

Vue.directive('numericOnly', {
  bind(el) {
    el.addEventListener('keyup', () => {
      let regex = /^[0-9]*$/
      if (!regex.test(el.value)) {
        el.value = el.value.slice(0, -1)
      }
    })
  }
})

Vue.directive('formatMoney', {
  bind(el, binding, vnode){
    let handler = function(e) {
      let value = parseInt(e.target.value.replace(/,/g, ''))
      value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      el.value = value
      // console.log('vnode', vnode.elm.value);
      // vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
    }
    el.addEventListener('input', handler);
  },
})
