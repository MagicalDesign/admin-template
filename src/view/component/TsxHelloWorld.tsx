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

const myDefineComponent = <
  P extends {},
  I extends { render: () => JSX.Element }
>(
  componnent: (props: P, ctx: SetupContext) => any
) => {
  const comName = componnent.name || "Anonymous Component";

  const OptionCom = defineComponent({
    name: `_${comName}`,
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

  const funtionCom = {
    [comName]: (props: P) => {
      const instance = <OptionCom {...props}></OptionCom>;
      return instance as unknown as I;
    },
  };

  return funtionCom[comName] as unknown as (props: P) => I & JSX.Element;
};

export const EnhengSimpleGreeting = myDefineComponent(function Aaa(
  props: { name: string },
  ctx
) {
  return {
    render() {
      return <span>hi {props.name}</span>;
    },
  };
});

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

    const comInstance = (
      <EnhengSimpleGreeting name={"完美的类型推断"}></EnhengSimpleGreeting>
    );

    const comInstance3 = EnhengSimpleGreeting({ name: "pyx 小朋友aaa" });

    return {
      fn,
      render() {
        return (
          <div>
            greeting {comInstance},{comInstance3},
            <EnhengSimpleGreeting name={"测试一下"}></EnhengSimpleGreeting>
          </div>
        );
      },
    };
  },
  render(ctx: { render: () => JSX.Element }) {
    return ctx.render();
  },
});
