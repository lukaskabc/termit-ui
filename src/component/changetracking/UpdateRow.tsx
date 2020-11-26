import * as React from "react";
import withI18n, {HasI18n} from "../hoc/withI18n";
import {FormattedDate, FormattedTime, injectIntl} from "react-intl";
import {UpdateRecord, UpdateValueType} from "../../model/changetracking/UpdateRecord";
import AssetLabel from "../misc/AssetLabel";
import OutgoingLink from "../misc/OutgoingLink";
import {Badge, Label} from "reactstrap";
import {FaArrowRight} from "react-icons/fa";

interface UpdateRowProps extends HasI18n {
    record: UpdateRecord;
}

export const UpdateRow: React.FC<UpdateRowProps> = props => {
    const record = props.record;
    const created = new Date(record.timestamp);
    return <tr>
        <td>
            <div>
                <FormattedDate value={created}/>{" "}
                <FormattedTime value={created}/>
            </div>
            <div className="italics last-edited-message ml-2">
                {record.author.fullName}
            </div>
        </td>
        <td>
            <Badge color="secondary">{props.i18n(record.typeLabel)}</Badge>
        </td>
        <td>
            <AssetLabel iri={record.changedAttribute.iri}/>
        </td>
        <td>
            {renderValue(record.originalValue)}
        </td>
        <td>
            {renderValue(record.newValue)}
        </td>
    </tr>;
};

function renderValue(value?: UpdateValueType) {
    if (!value) {
        return null;
    }
    if (Array.isArray(value)) {
        return <ul>{value.map((v, i) => <li key={i}>{renderSingleValue(v)}</li>)}</ul>;
    } else {
        return renderSingleValue(value);
    }
}

function renderSingleValue(value: any) {
    if ((value as { iri?: string }).iri) {
        const iri = (value as { iri: string }).iri;
        return <OutgoingLink label={<AssetLabel iri={iri}/>} iri={iri}/>;
    } else if (value["@language"]) {
        return <Label>{value["@language"]}<FaArrowRight className="ml-1 mr-1"/>{value["@value"]}</Label>
    }
    return <Label>{value}</Label>;
}

export default injectIntl(withI18n(UpdateRow));
