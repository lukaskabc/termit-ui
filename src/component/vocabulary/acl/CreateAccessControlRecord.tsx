import React from "react";
import { AccessControlRecord } from "../../../model/AccessControlList";
import ConfirmCancelDialog from "../../misc/ConfirmCancelDialog";
import { useI18n } from "../../hook/useI18n";
import AccessControlRecordForm from "./AccessControlRecordForm";

interface CreateAccessControlRecordProps {
  show: boolean;
  onSubmit: (record: AccessControlRecord<any>) => void;
  onCancel: () => void;
}

const CreateAccessControlRecord: React.FC<CreateAccessControlRecordProps> = ({
  show,
  onSubmit,
  onCancel,
}) => {
  const { i18n } = useI18n();
  const [record, setRecord] = React.useState<AccessControlRecord<any>>(
    {} as AccessControlRecord<any>
  );
  const onChange = (change: Partial<AccessControlRecord<any>>) => {
    setRecord(Object.assign({}, record, change));
  };
  const submit = () => {
    onSubmit(record);
    setRecord({} as AccessControlRecord<any>);
  };
  const onClose = () => {
    setRecord({} as AccessControlRecord<any>);
    onCancel();
  };

  return (
    <ConfirmCancelDialog
      show={show}
      id="create-acr"
      confirmKey="save"
      onClose={onClose}
      onConfirm={submit}
      confirmDisabled={!record.holder || !record.level}
      title={i18n("vocabulary.acl.record.create.modal.title")}
    >
      <AccessControlRecordForm record={record} onChange={onChange} />
    </ConfirmCancelDialog>
  );
};

export default CreateAccessControlRecord;
