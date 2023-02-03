import React, {useState} from "react";
import Card from "../components/base/Card";
import Button from "../components/base/Button";
import TextField from "../components/base/TextField";
import AnswerList from "../components/home/AnswerList";
import useQuestion from "../hooks/useQuestion";
import AnswersPlaceholder from "../components/home/AnswersPlaceholder";
import AnswerError from "../components/home/AnswerError";

function HomePage() {
    const [question, setQuestion] = useState('');
    const [firstSearch, setFirstSearch] = useState<boolean>(true);
    const { loading, error, answers, fetch } = useQuestion(question);
    const isPlaceholder: boolean = !firstSearch && answers.length == 0 && !error && !loading;
    const isError: boolean = !!error && !loading;

    const handleSearchClick= () => {
        fetch();
        setFirstSearch(false)
    }
    return (
        <section className='py-5 min-h-screen'>

            <Card shadow='sm'>
                <div className="flex gap-2">
                    <div className="w-5/6">
                        <TextField
                            placeholder='Some question here...'
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="w-1/6">
                        <Button block onClick={handleSearchClick}>Search</Button>
                    </div>
                </div>
            </Card>

            <div className='pt-10'>
                {isError && <AnswerError error={error || ''}/>}
                <AnswerList loading={loading} answers={answers}/>
                {isPlaceholder && <AnswersPlaceholder/>}
            </div>
        </section>
    )
}

export default HomePage