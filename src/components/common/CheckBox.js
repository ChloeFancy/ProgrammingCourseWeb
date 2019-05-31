import { Checkbox } from 'antd';
import React, { PureComponent } from 'react';

class WrappedCheckBox extends PureComponent {
  render() {
    let status = true;
    if (!this.props.value || this.props.value === false || this.props.value === 'false') status=false;
    return (
      <Checkbox
        checked={status}
        onChange={this.props.onChange}>
        {this.props.children}
      </Checkbox>
    );
  }
}

export default WrappedCheckBox;
