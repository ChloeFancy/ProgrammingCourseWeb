
import React, { Component } from 'react';
import { Form, Input, Row, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import dataConfig from '../../configs/UserList';
import { mapPropsToFields } from '../../lib/form';

const FormItem = Form.Item;

class PersonalCenterForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const validValues = Object.entries(values).reduce((prev, [key, val]) => {
          return val ? {
            ...prev,
            [key]: val,
          } : prev;
        }, {});
        this.props.onSubmit(validValues);
      }
    });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('password') && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  render() {
    const { form: { getFieldDecorator }, onBack } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormItem label="用户名">
              {
                getFieldDecorator(dataConfig.account, {
                  rules: [{
                    required: true, message: '请输入用户名',
                  }],
                })(<Input />)
              }
            </FormItem>
          </Row>
          <Row>
            <FormItem label="真实姓名">
              {
                getFieldDecorator(dataConfig.name, {
                  rules: [{
                    required: true, message: '请输入真实姓名',
                  }],
                })(<Input />)
              }
            </FormItem>
          </Row>
          <Row>
            <FormItem label="新密码">
              {
                getFieldDecorator(dataConfig.password, {
                  rules: [
                    // {
                    //   required: true,
                    //   message: "密码不能为空",
                    // },
                  ],
                })(<Input placeholder="留空则保留原密码" type="password" />)
              }
            </FormItem>
          </Row>
          <Row>
            <FormItem label="重复新密码">
              {
                getFieldDecorator('repeatPassword', {
                  rules: [
                    // {
                    //   required: true,
                    //   message: formatMessage({ id: 'validation.confirm-password.required' }),
                    // },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(<Input placeholder="请确认新密码" type="password" />)
              }
            </FormItem>
          </Row>
          <Row>
            <FormItem label="电子邮箱">
              {
                getFieldDecorator(dataConfig.email, {
                  rules: [{
                    type: 'email', message: '请输入正确的邮箱地址',
                  }, {
                    required: true, message: '请输入电子邮箱',
                  }],
                })(<Input type="email" />)
              }
            </FormItem>
          </Row>
          <Row>
            <Button htmlType="submit" type="primary">保存</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button htmlType="button" onClick={onBack}>返回</Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => mapPropsToFields(props.info),
  onFieldsChange: (props, fields) => {
    props.onChange(fields);
  },
})(PersonalCenterForm);
