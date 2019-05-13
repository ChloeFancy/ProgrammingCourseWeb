import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Popconfirm, Form, Radio, Row, Col, Checkbox, InputNumber, Table, Button } from 'antd';
import router from 'umi/router';
import { mapPropsToFields } from '../../lib/form';
import { paperConfig } from '../../configs/contest';
import problemConfig from '../../configs/problemEdit';
import { formatTimeFromTimeStamp, debounce } from '../../lib/common';

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
      render: (text, record, index) => {
        return (
          <div>
            <Button onClick={onEdit(record)}>编辑</Button>
            <Popconfirm title="确定删除此题吗？" onConfirm={onDelete(record, index)}>
              <Button>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};

class ContestPaperDetailForm extends PureComponent {
  static propTypes = {
      options: PropTypes.object,
      generatePaper: PropTypes.func,
  };

  static defaultProps = {
      options: {},
      generatePaper: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  // todo 生成试卷
  generatePaper = () => {
    this.setState({
      modalVisible: false,
    });
    const values = this.props.getFieldsValue;
    this.props.generatePaper(values);
  };

  handleGeneratePaper = debounce(() => {
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err) => {
      if (!err) {
        const { getFieldValue } = this.props.form;
        if (getFieldValue('id')) {
          this.setState({
            modalVisible: true,
          });
        } else {
          this.generatePaper();
        }
      }
    });
  }, 200);

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleEdit = (record) => {
    return () => {
      router.push(`/admin/problem/edit/${record.id}`);
    };
  };

  // todo 从试卷中删除题目
  handleDelete = (record, index) => {
    return async () => {
      const { getFieldValue } = this.props.form;
      const problemList = [...this.props.problemList];
      problemList.splice(index, 1);
      await this.props.handleDeleteProblem({
        problemId: record.id,
        paperId: getFieldValue('id'),
      }, problemList);
    };
  };

  render() {
    // todo 考虑做个全选
    const { problemList, paperTableLoading, options, form: { getFieldDecorator } } = this.props;
    const { modalVisible } = this.state;
    return (
      <Form>
        <h1>试卷信息</h1>
        <Row>
          <FormItem label={getLabel(paperConfig.problemNum.text)}>
            {
              getFieldDecorator(paperConfig.problemNum.dataIndex, {
                rules: [
                  {
                    required: true,
                    message: '请输入试题数目',
                  },
                ],
              })(
                <InputNumber />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(paperConfig.difficulty.text)}>
            {
              getFieldDecorator(paperConfig.difficulty.dataIndex, {
                rules: [
                  {
                    required: true,
                    message: '请选择试卷难度',
                  },
                ],
              })(
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
              </span>)}
            >
              {
                getFieldDecorator(paperConfig.tags.dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: '请选择知识点范围',
                    },
                  ],
                })(
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
        <Row><Button onClick={this.handleGeneratePaper}>生成试卷</Button></Row>
        <Row>
          <br />
          <h1>比赛题目列表<Button>新增题目</Button></h1>
          <Table
            loading={paperTableLoading}
            columns={getColumns(this.handleEdit, this.handleDelete)}
            dataSource={problemList || []}
          />
        </Row>
        <Modal visible={modalVisible} onCancel={this.handleModalCancel} onOk={this.generatePaper}>
          生成试卷后，当前试题会被全部覆盖，确定重新生成试卷吗？
        </Modal>
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
