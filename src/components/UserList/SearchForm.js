
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button } from 'antd';
import dataConfig, { userTypeOptions, searchFormDataConfig } from '../../configs/UserList';
import { mapPropsToFields } from '../../lib/form';

const { Item: FormItem } = Form;
const Option = Select.Option;

class SearchForm extends Component {
    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.onSubmit(this.props.form.getFieldsValue());
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { info } = this.props;
        const RowConfig = {
            type: 'flex',
            justify: 'start',
        };
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 15 },
        };
        const colSpan = 7;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row {...RowConfig}>
                        <Col span={colSpan}>
                            <FormItem {...formItemLayout} label="角色">
                                {
                                    getFieldDecorator(searchFormDataConfig.role, {
                                    })(
                                        <Select>
                                            {
                                                userTypeOptions.map(({ key, value }) => {
                                                    return <Option key={value} value={value}>{key}</Option>;
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem {...formItemLayout} label="关键词">
                                {
                                    getFieldDecorator(searchFormDataConfig.keyword, {
                                    })(<Input placeholder="请输入关键词" />)
                                }
                            </FormItem>
                        </Col>
                        <Col span={colSpan}>
                            <FormItem><Button type="primary" htmlType="submit">搜索</Button></FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create()(SearchForm);
