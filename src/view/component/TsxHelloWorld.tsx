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

const myDefineComponent = <P extends {}>(
  componnent: (props: P, ctx: SetupContext) => any
) => {
  const com = defineComponent({
    setup(_, ctx) {
      const { render, ...obj } = componnent(ctx.attrs as P, ctx);

      return {
        obj,
        render() {
          return render();
        },
      };
    },
    render(ctx: { render: () => JSX.Element }) {
      return ctx.render();
    },
  });
  return com as unknown as (props: P) => JSX.Element;
};

export const EnhengSimpleGreeting = myDefineComponent(
  (props: { name: string }, ctx) => {
    return {
      render() {
        return <div>hi {props.name}</div>;
      },
    };
  }
);

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
        return (
          <div>
            greeting{" "}
            <EnhengSimpleGreeting
              name={"完美的类型推断"}
            ></EnhengSimpleGreeting>
          </div>
        );
      },
    };
  },
  render(ctx: { render: () => JSX.Element }) {
    return ctx.render();
  },
});
