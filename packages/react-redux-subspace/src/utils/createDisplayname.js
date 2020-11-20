const createDisplaynameForWrappedComponent = (
  WrappedComponent,
  wrapperName
) => {
  if (!WrappedComponent || !wrapperName) {
    return undefined;
  }
  let componentName = "Component";

  if (WrappedComponent.displayname) {
    componentName = WrappedComponent.displayname;
  } else if (WrappedComponent.name) {
    componentName = WrappedComponent.name;
  } else if (typeof WrappedComponent === "string") {
    componentName = WrappedComponent;
  }
  return `${wrapperName}(${componentName})`;
};

export default createDisplaynameForWrappedComponent;
