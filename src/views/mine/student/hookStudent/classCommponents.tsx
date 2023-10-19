import React, { ReactNode, memo } from 'react';

//泛型约束()
//类组件需要继承React.Component
//修改this.setState()
class ClassCommponents extends React.Component {
  state = {
    count: 0
  };
  clickHandler = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render(): React.ReactNode {
    console.log(this.props);
    return (
      <div>
        count:{this.state.count}
        <button>点击</button>
      </div>
    );
  }
}
export default memo(ClassCommponents);
