
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col } from 'antd';
import BraftEditor from '../common/BraftEditor';
import dataConfig from '../../configs/announce';
import { mapPropsToFields } from '../../lib/form';

const { Item: FormItem } = Form;
const Option = Select.Option;

class AnnounceEditForm extends Component {
    handleSubmit = () => {
        const values = this.props.form.getFieldsValue();
        this.props.onSubmit({
            ...values,
            [dataConfig.detail]: values[dataConfig.detail].toHTML(),
        });
    };

    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="标题">
                        {
                            getFieldDecorator(dataConfig.title, {
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem label="内容">
                        {
                            getFieldDecorator(dataConfig.detail, {
                            })(<BraftEditor />)
                        }
                    </FormItem>
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
})(AnnounceEditForm);
