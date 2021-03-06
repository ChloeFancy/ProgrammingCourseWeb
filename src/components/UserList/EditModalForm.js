
import React, { Component } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import dataConfig from '../../configs/UserList';
import { mapPropsToFields } from '../../lib/form';

const { Item: FormItem } = Form;
const { Option } = Select;

class EditModalForm extends Component {
    handleSubmit = () => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.onSubmit(values);
        }
      });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { userTypeOptions } = this.props;
        const RowConfig = {
            type: 'flex',
            justify: 'space-between',
          };
        const colSpan = 7;
        return (
            <div>
                <Form>
                    <Row {...RowConfig}>
                        <Col span={colSpan}>
                            <FormItem label="ID">
                                {
                                    getFieldDecorator(dataConfig.ID)(<Input disabled />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem label="用户名">
                                {
                                    getFieldDecorator(dataConfig.account, {
                                      rules: [{
                                        required: true, message: '请输入用户名',
                                      }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem label="真实姓名">
                                {
                                    getFieldDecorator(dataConfig.name, {
                                      rules: [{
                                        required: true, message: '请输入真实姓名',
                                      }],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row {...RowConfig}>
                        <Col span={colSpan}>
                            <FormItem label="新密码（留空则保留原密码）">
                                {
                                    getFieldDecorator(dataConfig.password, {
                                    })(<Input placeholder="留空则保留原密码" type="password" />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
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
                        </Col>
                        <Col span={colSpan}>
                            <FormItem label="用户类型">
                                {
                                    getFieldDecorator(dataConfig.type, {
                                    })(
                                        <Select>
                                            {
                                                userTypeOptions.map(({ key, value }) => {
                                                    return <Option value={value} key={key}>{key}</Option>;
                                                })
                                            }
                                        </Select>,
                                    )
                                }
                            </FormItem>
                        </Col>
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
})(EditModalForm);
