
import React, { Component } from 'react';
import { Button, Form, Select, Row, Col, Input } from 'antd';
import dataConfig, { searchFormDataConfig } from '../../configs/UserList';
import { mapPropsToFields } from '../../lib/form';

const { Item: FormItem } = Form;
const Option = Select.Option;
const { TextArea } = Input;

class InOutExamples extends Component {
  handleDelete = (index) => {
    return () => {
      const { value: examples } = this.props;
      const newExamples = [...examples];
      newExamples.splice(index, 1);
      this.props.onChange(newExamples);
    };
  };

  handleChange = (field, index) => {
    return (ev) => {
      const { value: examples } = this.props;
      const newExamples = [...examples];
      newExamples[index] = {
        ...newExamples[index],
        [field]: ev.target.value,
      };
      this.props.onChange(newExamples);
    };
  };

  render() {
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    const colSpan = 7;
    const { value: examples } = this.props;
    return (
      <div>
        {(examples || []).map((item, index) => {
          return (
            <div>
              <div>
                {index + 1}.&nbsp;&nbsp;
                {/* <Button>折叠</Button> */}
                &nbsp;&nbsp;
                <Button onClick={this.handleDelete(index)}>删除</Button>
              </div>
              <Row {...RowConfig}>
                <Col span={11}>
                  <FormItem label="样例输入">
                    <TextArea onChange={this.handleChange('input', index)} value={item.input} />
                  </FormItem>
                </Col>
                <Col span={11}>
                  <FormItem label="样例输出">
                    <TextArea onChange={this.handleChange('output', index)} value={item.output} />
                  </FormItem>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
}

export default InOutExamples;
