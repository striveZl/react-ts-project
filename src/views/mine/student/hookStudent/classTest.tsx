import React, { memo } from 'react';
import ClassCommponents from './classCommponents';

//泛型约束()
//类组件需要继承React.Component
class classTest extends React.Component {
  render(): any {
    return <ClassCommponents />;
  }
}
export default memo(classTest);
