import React from "react";
import Card from "../base/Card";
import {Answer} from "../../models/answer";

interface AnswerListItemProps {
    answer: Answer
}

function AnswerListItem(props: AnswerListItemProps) {
    const { answer } = props;

    return (
        <Card shadow='md'>
            { answer.content }
        </Card>
    )
}

export default AnswerListItem;