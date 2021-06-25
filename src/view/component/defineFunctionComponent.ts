import { SetupContext, defineComponent, h, VNode } from "vue";

export const defineFunctionComponent = <
  P extends {},
  I extends { render: () => VNode }
>(
  componnent: (props: P, ctx: SetupContext) => any
) => {
  const comName = componnent.name || "Anonymous Component";

  const OptionCom = defineComponent({
    name: `_${comName}`,
    setup(_, ctx) {
      return componnent(ctx.attrs as P, ctx);
    },
    render(ctx: { render: () => VNode }) {
      return ctx.render();
    },
  });

  const funtionCom = {
    [comName]: (props: P) => {
      const instance = h(OptionCom, props);
      return instance as unknown as I;
    },
  };

  return funtionCom[comName] as unknown as (props: P) => I & VNode;
};
