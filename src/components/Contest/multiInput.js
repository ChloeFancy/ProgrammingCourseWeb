import React, { PureComponent } from 'react';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import BraftEditor from '../common/BraftEditor';
import styles from './multiInput.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;

export default class multiInput extends PureComponent {
  render() {
    const { optionMap } = this.props;

    return (
      <div className={styles['multi-input-wrapper']}>
        {
            Object.entries(optionMap).map(([_, label]) => {
                return (
                    <div>
                        <FormItem label={label}>
                            <Input />
                        </FormItem>
                    </div>
                );
            })
        }
      </div>
    );
  }
}

