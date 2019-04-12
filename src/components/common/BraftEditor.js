import React, { PureComponent } from 'react';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './braft-editor.less';

export default class BraftEditorWrapped extends PureComponent {
  render() {
    const { testCaseList, value, onChange } = this.props;
    const RowConfig = {
      type: 'flex',
      justify: 'space-between',
    };
    const controls = [
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold',
        'separator',
        'headings', 'list-ul', 'list-ol', 'code',
    ];

    return (
        <BraftEditor
            value={value}
            onChange={onChange}
            controls={controls}
            className={styles['braft-editor']}
            contentClassName={styles['bf-content']}
        />        
    );
  }
}
