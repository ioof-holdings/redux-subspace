import React from "react";
import { render } from "enzyme";
import createDisplayName from "../../src/utils/createDisplayName";

const WRAPPER_NAME = "testHocName";
const TestComponent = () => <div>test</div>;
describe("createDisplayname util Tests", () => {
  it("should return a value of undefined if no WrapperComponent is passed", () => {
    expect(createDisplayName(null, WRAPPER_NAME)).to.equal(undefined);
  });
  it("should return a value of undefined if no wrapperName is passed", () => {
    const testComponent = render(<TestComponent />);
    expect(createDisplayName(testComponent, null)).to.equal(undefined);
  });
  it("should return WrappedComponent.displayName when the component has a displayName defined", () => {
    const testComponent = render(<TestComponent />);
    testComponent.displayName = "TestComponentDisplayName";
    testComponent.name = "TestComponentName";
    expect(createDisplayName(testComponent, WRAPPER_NAME)).to.equal(
      `${WRAPPER_NAME}(${testComponent.displayName})`
    );
  });
  it("should return WrappedComponent.name when the component has name defined but no displayName", () => {
    const testComponent = render(<TestComponent />);
    testComponent.displayName = null;
    testComponent.name = "TestComponentName";
    expect(createDisplayName(testComponent, WRAPPER_NAME)).to.equal(
      `${WRAPPER_NAME}(${testComponent.name})`
    );
  });
  it("should return 'Component' as WrappedComponent name when the component does not have a defined name or displayName", () => {
    const testComponent = render(<TestComponent />);
    testComponent.displayName = null;
    testComponent.name = null;
    expect(createDisplayName(testComponent, WRAPPER_NAME)).to.equal(
      `${WRAPPER_NAME}(Component)`
    );
  });
  it("if WrappedComponent arg is a string, the string should be returned in the wrapped displayname", () => {
    const TestComponent = "StringName";
    expect(createDisplayName(TestComponent, WRAPPER_NAME)).to.equal(
      `${WRAPPER_NAME}(${TestComponent})`
    );
  });
});
