import React, { PureComponent } from 'react';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import BraftEditor from '../common/BraftEditor';
import { mapPropsToFields } from '../../lib/form';
import config from '../../configs/problemEdit';

import styles from './problemEditForm.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const testCaseColumns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '输入文件名',
    dataIndex: 'inputName',
    key: 'inputName',
  },
  {
    title: '输出文件名',
    dataIndex: 'outputName',
    key: 'outputName',
  },
];

const getLabel = text => <span style={{ fontSize: 16, fontWeight: 700 }}>{text}</span>;

class ProblemEditForm extends PureComponent {
  handlePublishProblem = () => {
    const {  } = this.props;
    console.log(this.props.form.getFieldsValue());
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
                getFieldDecorator(config.title.dataIndex)(
                  <Input />
                )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.description.text)}>
            {
                getFieldDecorator(config.description.dataIndex)(
                  <BraftEditor />
                )
            }
          </FormItem>
        </Row>
        <Row {...RowConfig}>
          <Col span={10}>
            <FormItem label={getLabel(config.judgeLimitTime.text)}>
              {
                getFieldDecorator(config.judgeLimitTime.dataIndex)(
                  <Input />
                )
              }
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={getLabel(config.judgeLimitMem.text)}>
              {
                getFieldDecorator(config.judgeLimitMem.dataIndex)(
                  <Input />
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row {...RowConfig}>
          <Col span={5}>
            <FormItem label={getLabel(config.difficulty.text)}>
              {
                getFieldDecorator(config.difficulty.dataIndex)(
                  <Select>
                    {options.difficulty.map(({ key, value }) => (
                      <Option key={key} value={value}>
                        {key}
                      </Option>
                    ))}
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
          <Col span={11}>
            <FormItem label={getLabel(config.tags.text)}>
            {
                getFieldDecorator(config.tags.dataIndex)(
                  <Select mode="multiple">
                    {options.tags.map(({ key, value }) => (
                      <Option key={key} value={value}>
                        {key}
                      </Option>
                    ))}
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label={getLabel(config.in.text)}>
            {
              getFieldDecorator(config.in.dataIndex)(
                <TextArea rows={6} />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.out.text)}>
            {
              getFieldDecorator(config.out.dataIndex)(
                <TextArea rows={6} />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem
            label={getLabel(
              <span>
                样例&nbsp;&nbsp;<Button>添加</Button>
              </span>
            )}
          >
            <div>
              {[].map(item => {
                return (
                  <div>
                    <div>
                      {item.name}
                      <Button>折叠</Button>
                      <Button>删除</Button>
                    </div>
                    <Row>
                      <Col span={12}>
                        <FormItem label="样例输入">
                          <TextArea>{item.input}</TextArea>
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem label="样例输出">
                          <TextArea>{item.output}</TextArea>
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          </FormItem>
        </Row>
        <Row>
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
        </Row>
        <Row>
          <FormItem
            label={getLabel(
              <span>
                测试数据<a>下载</a>
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
            <Upload>
              <Button type="primary">
                <Icon type="upload" />
                选择文件
              </Button>
            </Upload>
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.hint.text)}>
            {
              getFieldDecorator(config.hint.dataIndex)(
                <BraftEditor />
              )
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel(config.source.text)}>
            {
              getFieldDecorator(config.source.dataIndex)(
                <Input />
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

// todo
export default Form.create({
  mapPropsToFields: (props) => mapPropsToFields(props.problemInfo),
  onFieldsChange: (props, fields) => {
      props.onChange(fields);
  },
})(ProblemEditForm);
