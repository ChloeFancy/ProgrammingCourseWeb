import React, { PureComponent } from 'react';
import { message, Icon, Upload, Button, Form, Input, Row, Col, Select, InputNumber } from 'antd';
import BraftEditor from '../common/BraftEditor';
import { mapPropsToFields } from '../../lib/form';
import config from '../../configs/problemEdit';
import request from '../../lib/request';

import InOutExamples from './InOutExamples';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;
const getOptions = (arr) => arr.map(({ key, value }) => (
  <Option key={key} value={Number(value)}>
    {key}
  </Option>
));

class ProblemEditForm extends PureComponent {
  state = {
    fileList: [],
  };

  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     fileList: nextProps.fileList || [],
  //   });
  // }

  // todo 下载链接
  handleDownload = () => {
    const { form: { getFieldValue } } = this.props;
    const judgeFile = getFieldValue('judgeFile');
    if (judgeFile.fileList.length) {
      const judgeFileId = judgeFile.fileList[0].fileId;
      window.open(`//47.100.89.70:8082/download/${judgeFileId}/${judgeFileId}.zip`);
    } else {
      message.error('暂无测试数据，请先上传');
    }
  };

  getUploadProps = () => {
    return {
      action: 'http://47.102.117.222:8082/upload',
      multiple: false,
      beforeUpload: (file) => {
        const isZip = file.type.includes('zip');
        const lengthCorrect = this.state.fileList.length < 1;
        if (!lengthCorrect) {
          message.warning('只能上传一个测试数据压缩包, 请先删除已上传文件再重新上传！');
        }
        if (!isZip) {
          message.warning('请上传zip格式的测试数据压缩包！');
        }
        return isZip && lengthCorrect;
      },
      onSuccess: (FileObj, file) => {
        const { judgeFile = {} }  = this.props.form.getFieldsValue();
        (judgeFile.fileList[0] || {}).fileId = FileObj.fileId;
        this.props.form.setFieldsValue({
          judgeFile,
        });
        file.fileId = FileObj.fileId;
        this.setState({
          fileList: [file],
        });
      },
      onRemove: () => {
        this.setState({
          fileList: [],
        });
      },
      customRequest({
                      action,
                      file,
                      onSuccess,
                    }) {
        const formData = new FormData();
        formData.append('uploadFile', file);
        request({
          url: action,
          data: formData,
          resProto: 'File',
          config: {
            headers: {
              'Content-Type': 'mutipart/form-data',
            },
          }
        }).then(File => {
          const { fileId } = File;
          if (fileId) {
            onSuccess(File, file);
          } else {
            message.error('上传失败');
          }
        }).catch(err => {
          console.error(err);
        });
        return {
          abort() {
            console.log('upload progress is aborted.');
          },
        };
      },
    };
  };

  handlePublishProblem = (ev) => {
    ev.preventDefault();
    this.props.form.validateFieldsAndScroll((err) => {
      if (!err) {
        const { onSubmit, form: { getFieldsValue } } = this.props;
        const values = getFieldsValue();
        onSubmit({
          ...values,
          [config.judgeFile.dataIndex]: values[config.judgeFile.dataIndex].fileList[0].fileId,
          [config.description.dataIndex]: values[config.description.dataIndex].toHTML(),
          [config.hint.dataIndex]: values[config.hint.dataIndex].toHTML(),
        });
      }
    });
  };

  handleAddInOutExamples = () => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    setFieldsValue({
      [config.inOutExamples.dataIndex]: [...(getFieldValue(config.inOutExamples.dataIndex) || []), {}],
    });
  };

  checkInOutExamples = (rule, value, callback) => {
    if (value && !value.length) {
      callback('请添加用例');
    } else {
      callback();
    }
  };

  checkContent = (val) => {
    return (rule, value, callback) => {
      const content = BraftEditor.getValueString(value);
      if (!content) {
        callback(val);
      } else {
        callback();
      }
    };
  };

  render() {
    const { options } = this.props;
    const { getFieldDecorator } = this.props.form;
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };

    return (
      <Form onSubmit={this.handlePublishProblem}>
        <Row>
          <FormItem label={getLabel(config.title.text)}>
            {
                getFieldDecorator(config.title.dataIndex, {
                  rules: [{
                    required: true, message: '请输入标题',
                  }],
                })(
                  <Input />
                )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.description.text)}>
            {
                getFieldDecorator(config.description.dataIndex, {
                  rules: [{
                    required: true, message: '请输入描述内容',
                  }, {
                    validator: this.checkContent('请输入描述内容'),
                  }],
                })(
                  <BraftEditor />
                )
            }
          </FormItem>
        </Row>
        <Row {...RowConfig}>
          <Col span={10}>
            <FormItem label={getLabel(config.judgeLimitTime.text)}>
              {
                getFieldDecorator(config.judgeLimitTime.dataIndex, {
                  rules: [{
                    required: true, message: '请输入时间限制',
                  }],
                })(
                  <InputNumber min={1} max={10000} />
                )
              }
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={getLabel(config.judgeLimitMem.text)}>
              {
                getFieldDecorator(config.judgeLimitMem.dataIndex, {
                  rules: [{
                    required: true, message: '请输入内存限制',
                  }],
                })(
                  <InputNumber min={16} max={32} />
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row {...RowConfig}>
          <Col span={10}>
            <FormItem label={getLabel(config.difficulty.text)}>
              {
                getFieldDecorator(config.difficulty.dataIndex, {
                  rules: [{
                    required: true, message: '请选择难度',
                  }],
                })(
                  <Select>
                    {getOptions(options.difficulty)}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          {/* <Col span={5}>
            <FormItem label={getLabel('前台是否可见')}>
              <Checkbox>可见</Checkbox>
            </FormItem>
          </Col> */}
          <Col span={10}>
            <FormItem label={getLabel(config.tags.text)}>
            {
                getFieldDecorator(config.tags.dataIndex, {
                  rules: [{
                    required: true, message: '请选择知识点',
                  }],
                })(
                  <Select mode="multiple">
                    {getOptions(options.tags)}
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label={getLabel(config.in.text)}>
            {
              getFieldDecorator(config.in.dataIndex, {
                rules: [{
                  required: true, message: '请输入输入描述',
                }],
              })(
                <TextArea rows={6} />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.out.text)}>
            {
              getFieldDecorator(config.out.dataIndex, {
                rules: [{
                  required: true, message: '请输入输出描述',
                }],
              })(
                <TextArea rows={6} />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem
            label={<span>样例&nbsp;&nbsp;<Button onClick={this.handleAddInOutExamples}>添加</Button></span>}
          >
            {
              getFieldDecorator(config.inOutExamples.dataIndex, {
                rules: [{
                  required: true, message: '请添加样例',
                }, {
                  validator: this.checkInOutExamples,
                }],
              })(
                <InOutExamples />
              )
            }
          </FormItem>
        </Row>
        {/* <Row>
          <FormItem label={getLabel('Special Judge')}>
            <Checkbox>
              Special Judge用于答案不唯一的情况,需要自己上传判题代码。上传测试用后如需要修改,
              必须重新上传对应类型的新测试用例。
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/QingdaoU/OnlineJudge/wiki/SpecialJudge"
              >
                帮助和示例
              </a>
            </Checkbox>
          </FormItem>
        </Row> */}
        <Row>
          <FormItem
            label={getLabel(
              <span>
                测试数据<a onClick={this.handleDownload}>下载</a>
              </span>
            )}
          >
            <div>
              请将所有测试用例打包在一个zip文件中上传，所有文件要在压缩包的根目录，且输入输出文件名要以从1开始连续数字标识要对应例如：
              1.in 1.out 2.in 2.out(普通题目)或者1.in 2.in 3.in(Special Judge)
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/QingdaoU/OnlineJudge/wiki/%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B%E4%B8%8A%E4%BC%A0"
              >
                帮助
              </a>
            </div>
            {/* <Table columns={testCaseColumns} dataSource={testCaseList} /> */}
            <Row>
              <Col span={10}>
                {getFieldDecorator(config.judgeFile.dataIndex, {
                  rules: [{
                    required: true, message: '请上传测试数据zip文件',
                  }],
                })(<Upload
                  {...this.getUploadProps()}
                  fileList={this.state.fileList}
                >
                  <Button type="primary">
                    <Icon type="upload" />
                    选择文件
                  </Button>
                </Upload>)}
              </Col>
            </Row>
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.hint.text)}>
            {
              getFieldDecorator(config.hint.dataIndex, {
                rules: [{
                  required: true, message: '请输入提示',
                }, {
                  validator: this.checkContent('请输入提示'),
                }],
              })(
                <BraftEditor />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <Button htmlType="submit" type="primary">发布题目</Button>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: (props) => mapPropsToFields(props.problemInfo),
  onFieldsChange: (props, fields) => {
      props.onChange(fields);
  },
})(ProblemEditForm);
