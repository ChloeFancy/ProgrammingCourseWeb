
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col } from 'antd';
import dataConfig, { userTypeOptions } from '../../configs/UserList';

const { Item: FormItem } = Form;
const Option = Select.Option;

class EditModalForm extends Component {
    handleSubmit = () => {
        this.props.onSubmit(this.props.form.getFieldsValue());
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { info } = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={8}>
                            <FormItem label="ID">
                                {
                                    getFieldDecorator(dataConfig.ID, {
                                        initialValue: info[dataConfig.ID],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="用户名">
                                {
                                    getFieldDecorator(dataConfig.nickname, {
                                        initialValue: info[dataConfig.nickname],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="真实姓名">
                                {
                                    getFieldDecorator(dataConfig.name, {
                                        initialValue: info[dataConfig.name],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="新密码（留空则保留原密码）">
                                {
                                    getFieldDecorator(dataConfig.password, {
                                        initialValue: info[dataConfig.password],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="电子邮箱">
                                {
                                    getFieldDecorator(dataConfig.email, {
                                        initialValue: info[dataConfig.email],
                                    })(<Input />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="用户类型">
                                {
                                    getFieldDecorator(dataConfig.type, {
                                        initialValue: info[dataConfig.type],
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

export default Form.create()(EditModalForm);
