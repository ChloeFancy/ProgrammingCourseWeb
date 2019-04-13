
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button } from 'antd';
import dataConfig, { searchFormDataConfig } from '../../configs/UserList';
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
        const { tagOptions } = this.props;
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
                    <Row type="flex" justify="center">
                        <Col span={12}>
                        <FormItem label="关键词" {...formItemLayout}>
                            {
                                getFieldDecorator('keyword')(
                                    <Input
                                        placeholder="请输入关键词"
                                    />
                                )
                            }
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem label="标签" {...formItemLayout}>
                            {
                                getFieldDecorator('tag')(
                                    <Select allowClear>
                                        {tagOptions.map(({ key, value }) => {
                                            return <Option value={value}>{key}</Option>;
                                        })}
                                    </Select>
                                )
                            }
                        </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col>
                        <Button htmlType="submit" type="primary">
                            搜索
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create()(SearchForm);
