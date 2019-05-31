import React, { PureComponent } from 'react';
import { DatePicker, Form, Input, Row, Col } from 'antd';
import BraftEditor from '../common/BraftEditor';
import Checkbox from '../common/CheckBox';
import { mapPropsToFields } from '../../lib/form';
import { contestConfig } from '../../configs/contest';

const FormItem = Form.Item;
const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;

class ContestDetailForm extends PureComponent {
  checkContent = (rule, value, callback) => {
    const content = BraftEditor.getValueString(value);
    if (!content) {
      callback('请输入说明');
    } else {
      callback();
    }
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };

    return (
      <Form>
        <Row>
          <FormItem label={getLabel(contestConfig.name.text)}>
            {
              getFieldDecorator(contestConfig.name.dataIndex, {
                rules: [{
                  required: true, message: '请输入名称',
                }],
              })(
                <Input />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('说明')}>
            {
              getFieldDecorator(contestConfig.introduction.dataIndex, {
                rules: [{
                  required: true, message: '请输入说明',
                }, {
                  validator: this.checkContent,
                }],
              })(
                <BraftEditor />
              )
            }
          </FormItem>
        </Row>
        <Row {...RowConfig}>
          <Col span={10}>
            <FormItem label={getLabel(contestConfig.startTime.text)}>
              {
                getFieldDecorator(contestConfig.startTime.dataIndex, {
                  rules: [{
                    required: true, message: '请选择开始时间',
                  }],
                })(
                  <DatePicker showTime />
                )
              }
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={getLabel(contestConfig.endTime.text)}>
              {
                getFieldDecorator(contestConfig.endTime.dataIndex, {
                  rules: [{
                    required: true, message: '请选择结束时间',
                  }],
                })(
                  <DatePicker showTime />
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row {...RowConfig}>
          <Col>
            <FormItem label={getLabel(contestConfig.isPublic.text)}>
              {
                getFieldDecorator(contestConfig.isPublic.dataIndex)(
                  <Checkbox>可见</Checkbox>
                )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => mapPropsToFields(props.info),
  onFieldsChange: (props, fields) => {
    props.onChange(fields);
  },
})(ContestDetailForm);
