import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import BraftEditor from '../common/BraftEditor';
import MultiInput from './multiInput';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;

class ContestPaperDetailForm extends PureComponent {
  static propTypes = {
      options: PropTypes.obj,
  };

  static defaultProps = {
      options: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  handleTagsChange = (value) => {
    const { options: { tags } } = this.props;
    this.setState({
      tags: value.reduce((prev, cur) => {
        return {
          ...prev,
          [cur]: tags[cur],
        };
      }, {}),
    });
  };

  render() {
    const { options } = this.props;
    const { tags } = this.state;
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };

    return (
      <Form>
        <Row>
          <FormItem label={getLabel('难度')}>
            <MultiInput optionMap={options.difficulty} />
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('认知程度')}>
            <MultiInput optionMap={options.cognition} />
          </FormItem>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem label={getLabel('知识点')}>
              <Select onChange={this.handleTagsChange} mode="multiple">{
                Object.entries(options.tags).map(([id, label]) => {
                  return <Option value={id} key={id}>{label}</Option>
                })
              }</Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <MultiInput optionMap={tags} />
        </Row>
      </Form>
    );
  }
}

// todo
export default Form.create({
  // mapPropsToFields: (props) => {
  //     return {
  //         username: Form.createFormField({
  //             ...props.username,
  //             value: props.username.value,
  //         }),
  //     };
  // },
  // onFieldsChange: (props, fields) => {
  //     props.onChange(changedFields);
  // },
})(ContestPaperDetailForm);
