
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col } from 'antd';
import { classConfig } from '../../configs/class';
import { mapPropsToFields } from '../../lib/form';
import CheckBox from '../../components/common/CheckBox';

const { Item: FormItem } = Form;
const Option = Select.Option;
const TextArea = Input.TextArea;

class ClassInfoForm extends Component {
    handleSubmit = () => {
        this.props.onSubmit(this.props.form.getFieldsValue());
    };

    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { info, userTypeOptions } = this.props;
        const RowConfig = {
            type: 'flex',
            justify: 'space-between',
          };
        const colSpan = 7;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row {...RowConfig}>
                        <FormItem label={classConfig.name.text}>
                            {
                                getFieldDecorator(classConfig.name.dataIndex, {
                                })(<Input />)
                            }
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label={classConfig.introduction.text}>
                            {
                                getFieldDecorator(classConfig.introduction.dataIndex, {
                                })(<TextArea />)
                            }
                        </FormItem>
                    </Row>
                    <Row {...RowConfig}>
                        <Col span={colSpan}>
                            <FormItem label={classConfig.isCheck.text}>
                                {
                                    getFieldDecorator(classConfig.isCheck.dataIndex, {
                                    })(<CheckBox>是否需要导师审核</CheckBox>)
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
})(ClassInfoForm);
