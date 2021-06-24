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
  const OptionCom = defineComponent({
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

  const funtionCom = (props: P) => {
    const instance = <OptionCom {...props}></OptionCom>;
    return instance as unknown as I;
  };

  const CombinedCom = Object.assign(funtionCom, OptionCom);

  return CombinedCom as unknown as (props: P) => I & JSX.Element;
};

export const EnhengSimpleGreeting = myDefineComponent(
  (props: { name: string }, ctx) => {
    return {
      render() {
        return <span>hi {props.name}</span>;
      },
    };
  }
);

const render = <P extends {}, I>(Com: (p: P) => I & JSX.Element, props: P) => {
  const instance = <Com {...props}></Com>;

  return instance as unknown as I;
};

const r = render;

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

    const comInstance2 = r(EnhengSimpleGreeting, { name: "pyx 小朋友" });
    const comInstance3 = EnhengSimpleGreeting({ name: "pyx 小朋友aaa" });

    return {
      fn,
      render() {
        return (
          <div>
            greeting {comInstance},{comInstance2},{comInstance3},
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
