import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio, Row, Col, Checkbox, InputNumber, Table, Button } from 'antd';
import router from 'umi/router';
import { mapPropsToFields } from '../../lib/form';
import { paperConfig } from '../../configs/contest';
import problemConfig from '../../configs/problemEdit';
import { formatTimeFromTimeStamp } from '../../lib/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;
const getColumns = (onEdit, onDelete) => {
  return [
    {
      title: problemConfig.id.text,
      dataIndex: problemConfig.id.dataIndex,
      key: problemConfig.id.dataIndex,
    },
    {
      title: problemConfig.title.text,
      dataIndex: problemConfig.title.dataIndex,
      key: problemConfig.title.dataIndex,
    },
    {
      title: problemConfig.createTime.text,
      dataIndex: problemConfig.createTime.dataIndex,
      key: problemConfig.createTime.dataIndex,
      render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
    },
    {
      title: `${problemConfig.acceptTime.text}/${problemConfig.submitTime.text}`,
      dataIndex: problemConfig.acceptTime.dataIndex,
      key: problemConfig.acceptTime.dataIndex,
      render: (_, record) => `${record[problemConfig.acceptTime.dataIndex]}/${record[problemConfig.submitTime.dataIndex]}`
    },
    {
      title: '管理',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record) => {
        return (
          <div>
            <Button onClick={onEdit(record)}>编辑</Button>
          </div>
        );
      },
    },
  ];
};

class ContestPaperDetailForm extends PureComponent {
  static propTypes = {
      options: PropTypes.object,
  };

  static defaultProps = {
      options: {},
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tags: [],
  //     indeterminate: true,
  //     checkTagsAll: false,
  //   };
  // }
  //
  // onTagsCheckAllChange = (e) => {
  //   this.setState({
  //     indeterminate: false,
  //     checkTagsAll: e.target.checked,
  //   });
  // };

  handleEdit = (record) => {
    return () => {
      router.push(`/problem/edit/${record.id}`);
    };
  };

  handleDelete = () => {

  };

  render() {
    // todo 考虑做个全选
    const { info, options, form: { getFieldDecorator, getFieldValue } } = this.props;
    const problems = getFieldValue(paperConfig.problems.dataIndex);
    return (
      <Form>
        <h1>试卷信息</h1>
        <Row>
          <FormItem label={getLabel(paperConfig.problemNum.text)}>
            {
              getFieldDecorator(paperConfig.problemNum.dataIndex)(
                <InputNumber />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(paperConfig.difficulty.text)}>
            {
              getFieldDecorator(paperConfig.difficulty.dataIndex)(
                <RadioGroup>
                  {
                    Array.isArray(options.difficulty) ?
                      options.difficulty.map(({ key, value }) => <Radio value={value} key={value}>{key}</Radio>)
                      :
                      []
                  }
                </RadioGroup>
              )
            }
          </FormItem>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem label={getLabel(
              <span>
                {paperConfig.tags.text}&nbsp;
                {/*<Checkbox*/}
                  {/*indeterminate={this.state.indeterminate}*/}
                  {/*onChange={this.onTagsCheckAllChange}*/}
                  {/*checked={this.state.checkTagsAll}*/}
                {/*>*/}
                  {/*Check all*/}
                {/*</Checkbox>*/}
              </span>)}
            >
              {
                getFieldDecorator(paperConfig.tags.dataIndex)(
                  <CheckboxGroup>
                    {
                      Array.isArray(options.tags) ?
                        options.tags.map(({ key, value }) => <Checkbox value={Number(value)} key={value}>{key}</Checkbox>)
                        :
                        []
                    }
                  </CheckboxGroup>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <h1>比赛题目列表</h1>
          {
            Array.isArray(info.problems) && info.problems.map((problem, index) => {
              return (
                <div>
                  <div>{index + 1}</div>
                  <div>
                    {problem.title}
                  </div>
                  <div><Button></Button></div>
                </div>
              )
            })
          }
          <Table
            columns={getColumns(this.handleEdit, this.handleDelete)}
            dataSource={problems || []}
          />
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => mapPropsToFields(props.info),
  onFieldsChange: (props, fields) => {
      props.onChange(fields);
  },
})(ContestPaperDetailForm);
