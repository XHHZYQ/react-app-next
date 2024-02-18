import { Modal } from 'antd'; { }
import AForm from '../../components/AForm/index.jsx';

export const Modal = (props) => {
  const { visible, title } = props;


  const actionType = { value: 'add' };
  const formModel = {
    displayCtrl: []
  };
  const formRules = {
    displayCtrl: { required: false, message: '请选择需展示的选项' }
  };
  const formItems = {
    displayCtrl: {
      label: '前台列表',
      inputType: 'checkboxGroup',
      model: 'displayCtrl',
      optionCode: 'match.displayCtrl',
      options: []
    }
  };
  const addParam = {
    requestFun: matchDisplayCtrl,
    goBack: false,
    msg: '提交成功',
    beforeHandle: this.beforeHandle,
    resultHandle: () => {
      this.$emit('update:displayVisible', false);
      this.$emit('onSuccess');
    }
  };

  const arr = Object.values(formItems);
  arr.sort((a, b) => a.index - b.index);
  const formList = arr;

  return (
    <Modal title="前台设置" open={visible}>
      <AForm
        formModel={formModel}
        actionType={actionType}
        formRules={formRules}
        formList={formList}
        addParam={addParam}
      />
    </Modal>
  );
};