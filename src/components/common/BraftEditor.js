import React, { PureComponent } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './braft-editor.less';

export default class BraftEditorWrapped extends PureComponent {
  static createEditorState = BraftEditor.createEditorState;

  static getValueString = (value) => {
    return JSON.parse(value.toRAW()).blocks.reduce((prev, { text }) => {
      return prev + text;
    }, '');
  };

  render() {
    const { value, onChange } = this.props;

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
