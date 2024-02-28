"use client"
import { useImmer } from 'use-immer';

// 高阶组件
const withToggle = (WrappedComponent) => {
  return () => {
    const [toggle, setToggle] = useImmer(false);

    const change = () => {
      setToggle(prevState => !prevState);
    };

    return (
      <WrappedComponent
        toggle={toggle}
        change={change}
      />
    );
  };
};


// 使用高阶组件
const MyComponent = (props) => {
  console.log('props', props);
  const { toggle, change } = props;
  return (
    <div>
      <button onClick={change}>
        {toggle ? 'Toggle Off' : 'Toggle On'}
      </button>
      {toggle && <p>Toggle is On</p>}
    </div>
  );
};

const EnhancedComponent = withToggle(MyComponent);

// 使用增强后的组件
const Hoc = () => {
  return (
    <div>
      <h1>Higher Order Component Example</h1>
      <EnhancedComponent />
    </div>
  );
};

export default Hoc;
