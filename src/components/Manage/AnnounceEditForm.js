
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col } from 'antd';
import BraftEditor from '../common/BraftEditor';
import dataConfig from '../../configs/announce';

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
        const { getFieldDecorator } = this.props.form;
        const { info } = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="标题">
                        {
                            getFieldDecorator(dataConfig.title, {
                                initialValue: info[dataConfig.title],
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem label="内容">
                        {
                            getFieldDecorator(dataConfig.detail, {
                                initialValue: info[dataConfig.detail],
                            })(<BraftEditor
                                // className={styles['braft-editor']}
                                // contentClassName={styles['bf-content']}
                              />)
                        }
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AnnounceEditForm);
