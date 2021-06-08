import { defineComponent } from "@vue/runtime-core";

/**
 * 极其简单的函数式组件，强烈推荐使用
 * @param props
 * @returns
 */
export const SimpleGreeting = (props: { name: string }) => {
  return <div>hi {props.name}</div>;
};

/**
 *  带功能的组件
 */
export const Greeting = defineComponent({
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