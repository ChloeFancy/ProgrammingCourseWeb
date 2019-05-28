import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { message, Select, Modal, Popconfirm, Input, Form, Radio, Row, Col, Checkbox, InputNumber, Table, Button } from 'antd';
import router from 'umi/router';
import { mapPropsToFields } from '../../lib/form';
import { paperConfig } from '../../configs/contest';
import problemConfig from '../../configs/problemEdit';
import { formatTimeFromTimeStamp, debounce } from '../../lib/common';
import { fetchList } from '../../services/manage/problem';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const DELETE = 1;
const ADD = 0;

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;
const problemCommonColumns = [
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
];

const getColumns = (onEdit, onDelete) => {
  return [
    ...problemCommonColumns,
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

const getAddProblemColumns = (onAdd) => {
  return [
    ...problemCommonColumns,
    {
      title: '管理',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm title="确定添加此题吗？" onConfirm={onAdd(record, index)}>
              <Button>添加</Button>
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
      showAddProblemModal: false,
      problemTable: {},
      searchKeyword: '',
    };
  }


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

  // todo 生成试卷
  generatePaper = () => {
    this.setState({
      modalVisible: false,
    });
    const values = this.props.form.getFieldsValue();
    this.props.generatePaper(values);
  };

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

  handleDelete = (record, index) => {
    return async () => {
      const { getFieldValue } = this.props.form;
      const problemList = [...this.props.problemList];
      problemList.splice(index, 1);
      await this.props.handleModifyPaper({
        problemId: record.id,
        paperId: getFieldValue('id'),
        modifyType: DELETE,
      }, problemList);
    };
  };

  handleAddProblem = (record) => {
    return async () => {
      const { getFieldValue } = this.props.form;
      const problemList = [...this.props.problemList, record];
      await this.props.handleModifyPaper({
        problemId: record.id,
        paperId: getFieldValue('id'),
        modifyType: ADD,
      }, problemList);
    };
  };

  // todo 新增题目D=到试卷
  showAddProblemModal = () => {
    const { paperInfo } = this.props;
    if (paperInfo && paperInfo.id) {
      this.setState({
        showAddProblemModal: true,
      });
    } else {
      message.error('请先生成试卷再新增题目');
    }

  };

  handleAddProblemModalCancel = () => {
    this.setState({
      showAddProblemModal: false,
    });
  };

  handleSearchKeywordChange = (ev) => {
    this.setState({
      searchKeyword: ev.target.value,
    });
  };

  handleSearchProblem = async () => {
    const { problems, total } = await fetchList({ keyword: this.state.searchKeyword });
    this.setState({
      problemTable: {
        dataSource: problems,
        total,
      },
    });
  };

  render() {
    // todo 考虑做个全选
    const { problemList, paperTableLoading, options, form: { getFieldDecorator } } = this.props;
    const { modalVisible, searchKeyword, showAddProblemModal, problemTable } = this.state;
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
        <Row>
          <Col span={10}>
            <FormItem label={getLabel(paperConfig.algorithm.text)}>
              {
                getFieldDecorator(paperConfig.algorithm.dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: '请选择组卷算法',
                    },
                  ],
                })(
                  <Select>
                    {
                      Array.isArray(options.algorithm) ?
                        options.algorithm.map(({ key, value }) => <Option value={Number(value)} key={value}>{key}</Option>)
                        :
                        []
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row><Button onClick={this.handleGeneratePaper}>生成试卷</Button></Row>
        <Row>
          <br />
          <h1>试卷题目列表<Button onClick={this.showAddProblemModal}>新增题目</Button></h1>
          <Table
            loading={paperTableLoading}
            columns={getColumns(this.handleEdit, this.handleDelete)}
            dataSource={problemList || []}
          />
        </Row>
        <Modal
          visible={modalVisible}
          onCancel={this.handleModalCancel}
          onOk={this.generatePaper}
        >
          生成试卷后，当前试题会被全部覆盖，确定重新生成试卷吗？
        </Modal>
        <Modal
          visible={showAddProblemModal}
          onCancel={this.handleAddProblemModalCancel}
          cancelText=""
          onOk={this.handleAddProblem}
        >
          <Input placeholder="请输入题目关键字" value={searchKeyword} onChange={this.handleSearchKeywordChange} />
          <Button onClick={this.handleSearchProblem} type="primary">搜索</Button>
          <Table
            dataSource={problemTable.dataSource}
            columns={getAddProblemColumns(this.handleAddProblem)}
          />
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
