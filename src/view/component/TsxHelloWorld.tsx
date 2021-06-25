import {
  defineComponent,
  getCurrentInstance,
  reactive,
  SetupContext,
} from "vue";
import { defineFunctionComponent } from "./defineFunctionComponent";
import { useState } from "./hookImp";
/**
 * 极其简单的函数式组件，强烈推荐使用
 * @param props
 * @returns
 */

export const SimpleGreeting = (props: { name: string }, children: []) => {
  const state = useState(reactive({ count: 0 }));
  return (
    <div>
      <button
        onClick={() => {
          state.count++;
        }}
      >
        increase
      </button>
      :{state.count}
    </div>
  );
};

export const EnhengSimpleGreeting = defineFunctionComponent(function Aaa(
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
