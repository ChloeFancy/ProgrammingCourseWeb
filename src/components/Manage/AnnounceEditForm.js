
import React, { Component } from 'react';
import { Form, Input } from 'antd';
import BraftEditor from '../common/BraftEditor';
import dataConfig from '../../configs/announce';
import { mapPropsToFields } from '../../lib/form';

const { Item: FormItem } = Form;

class AnnounceEditForm extends Component {
    handleSubmit = () => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const values = this.props.form.getFieldsValue();
          this.props.onSubmit({
            ...values,
            [dataConfig.detail]: values[dataConfig.detail].toHTML(),
          });
        }
      });
    };

    checkContent = (rule, value, callback) => {
      const content = BraftEditor.getValueString(value);
      if (!content) {
        callback('请输入公告内容');
      } else {
        callback();
      }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="标题">
                        {
                            getFieldDecorator(dataConfig.title, {
                              rules: [{
                                required: true, message: '请输入标题',
                              }],
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem label="内容">
                        {
                            getFieldDecorator(dataConfig.detail, {
                              rules: [{
                                required: true, message: '请输入公告内容',
                              }, {
                                validator: this.checkContent,
                              }],
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
