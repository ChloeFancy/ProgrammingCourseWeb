import React, { PureComponent } from 'react';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import BraftEditor from '../common/BraftEditor';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;

class ContestDetailForm extends PureComponent {
  render() {
    const { testCaseList } = this.props;
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };

    return (
      <Form>
        <Row>
          <FormItem label={getLabel('比赛名称')}>
            <Input />
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('说明')}>
            <BraftEditor />
          </FormItem>
        </Row>
        <Row {...RowConfig}>
          <Col span={10}>
            <FormItem label={getLabel('开始时间')}>
              <Input />
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={getLabel('结束时间')}>
              <Input />
            </FormItem>
          </Col>
        </Row>

        <Row {...RowConfig}>
          <Col>
            <FormItem label={getLabel('是否公开')}>
              <Checkbox>可见</Checkbox>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

// todo
export default Form.create({
  // mapPropsToFields: (props) => {
  //     return {
  //         username: Form.createFormField({
  //             ...props.username,
  //             value: props.username.value,
  //         }),
  //     };
  // },
  // onFieldsChange: (props, fields) => {
  //     props.onChange(changedFields);
  // },
})(ContestDetailForm);
