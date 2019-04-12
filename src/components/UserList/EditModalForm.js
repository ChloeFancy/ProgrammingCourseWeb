
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col } from 'antd';
import dataConfig, { userTypeOptions } from '../../configs/UserList';
import { mapPropsToFields } from '../../lib/form';

const { Item: FormItem } = Form;
const Option = Select.Option;

class EditModalForm extends Component {
    handleSubmit = () => {
        this.props.onSubmit(this.props.form.getFieldsValue());
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { info } = this.props;
        const RowConfig = {
            type: 'flex',
            justify: 'space-between',
          };
        const colSpan = 7;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row {...RowConfig}>
                        <Col span={colSpan}>
                            <FormItem label="ID">
                                {
                                    getFieldDecorator(dataConfig.ID, {
                                    })(<Input disabled />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem label="用户名">
                                {
                                    getFieldDecorator(dataConfig.account, {
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem label="真实姓名">
                                {
                                    getFieldDecorator(dataConfig.name, {
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
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem label="电子邮箱">
                                {
                                    getFieldDecorator(dataConfig.email, {
                                    })(<Input />)
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
    mapPropsToFields,
    onFieldsChange: (props, fields) => {
        props.onChange(fields);
    },
})(EditModalForm);
