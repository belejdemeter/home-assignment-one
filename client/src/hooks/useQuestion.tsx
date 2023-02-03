import {useState} from "react";
import api from "../api";
import {Answer} from "../models/answer";



function useQuestion(question: string): { loading: boolean, answers: Answer[], fetch: () => Promise<void>, error: string | null } {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.question.index({question});

            setAnswers(response.data);
        } catch (e: any) {
            setError(e);
        } finally {
            setLoading(false);
        }

    };


    return {
        fetch,
        loading,
        answers,
        error
    }
}

export default useQuestion;