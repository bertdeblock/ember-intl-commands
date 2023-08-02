import Component from "@glimmer/component";

export default class FooComponent extends Component {
  @service("intl") intlService;

  zero = this.intlService.t();

  one = this.intlService.t("new.key.in.component.js.one", {
    foo: "foo",
    bar: "bar",
    htmlSafe: true,
  });

  two = this.intlService.t("new.key.in.component.js.two", {
    foo: "foo",
    bar: "bar",
    htmlSafe: true,
  });

  three = this.intlService.t("new.key.in.component.js.three");
}
