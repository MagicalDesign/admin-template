import { defineComponent } from "@vue/runtime-core";
import { SetupContext } from "vue";

/**
 * 极其简单的函数式组件，强烈推荐使用
 * @param props
 * @returns
 */
export const SimpleGreeting = (props: { name: string }, children: []) => {
  return <div>hi {props.name}</div>;
};

/**
 *  带功能的组件
 */
export const Greeting = defineComponent({
  props: {
    name: {
      type: String,
      require: true,
    },
  },
  setup() {
    const fn = () => {
      console.log("greeting from fn");
    };

    return {
      fn,
      render() {
        return <div>greeting</div>;
      },
    };
  },
  render(ctx: { render: () => JSX.Element }) {
    return ctx.render();
  },
});
