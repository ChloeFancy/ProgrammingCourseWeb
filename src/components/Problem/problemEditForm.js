import React, { PureComponent } from 'react';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import BraftEditor from '../common/BraftEditor';

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
  render() {
    const { testCaseList } = this.props;
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };

    return (
      <Form>
        <Row>
          <FormItem label={getLabel('题目标题')}>
            <Input />
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('题目描述')}>
            <BraftEditor />
          </FormItem>
        </Row>
        <Row {...RowConfig}>
          <Col span={10}>
            <FormItem label={getLabel('时间限制(ms, 范围1-10000ms)')}>
              <Input />
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={getLabel('内存限制(MB, 最低16M, Java不能低于32M)')}>
              <Input />
            </FormItem>
          </Col>
        </Row>

        <Row {...RowConfig}>
          <Col span={5}>
            <FormItem label={getLabel('难度')}>
              <Select>
                {[].map(({ key, value }) => (
                  <Option key={key} value={value}>
                    {key}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label={getLabel('前台是否可见')}>
              <Checkbox>可见</Checkbox>
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem label={getLabel('标签')}>
              <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
                {[].map(({ key, value }) => (
                  <Option key={key} value={value}>
                    {key}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label={getLabel('输入描述')}>
            <TextArea rows={6} />
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('输出描述')}>
            <TextArea rows={6} />
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
            <Table columns={testCaseColumns} dataSource={testCaseList} />
            <Upload>
              <Button type="primary">
                <Icon type="upload" />
                选择文件
              </Button>
            </Upload>
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('提示')}>
            <BraftEditor />
          </FormItem>
        </Row>
        <Row>
          <FormItem label={getLabel('来源')}>
            <Input />
          </FormItem>
        </Row>
        <Row>
          <Button type="primary">发布题目</Button>
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
})(ProblemEditForm);
