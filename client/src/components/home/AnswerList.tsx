import React from "react";
import Card from "../base/Card";
import {Answer} from "../../models/answer";
import AnswerListItem from "./AnswerListItem";

interface AnswerListProps {
    loading: boolean,
    answers: Answer[]
}

function LoadingPlaceholderItem() {
    return (
        <Card>
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                </div>
            </div>
        </Card>
    )
}

function AnswerList(props: AnswerListProps) {
    const {loading, answers} = props;

    return (
        <div className='flex flex-col gap-2 w-2/3 mx-auto'>
            {loading
                ? (
                <>
                    <LoadingPlaceholderItem/>
                    <LoadingPlaceholderItem/>
                    <LoadingPlaceholderItem/>
                    <LoadingPlaceholderItem/>
                </>)
                : (
                    <>
                        {answers.map(answer => <AnswerListItem key={answer.id} answer={answer}/> )}
                    </>
                )}
        </div>
    )
}

export default AnswerList;