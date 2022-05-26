import Button, { ButtonStyle } from "../Components/Button/Button";
import ContentWrapper from "../Components/ContentWrapper/ContentWrapper";
import PageTemplate from "../PageTemplate/PageTemplate";

import styles from './ViewBallot.module.scss';

interface Ballot {
    title: string,
    options: string[]
}

export default function ViewBallot() {
    const ballot : Ballot = {
        title: "Favorite Color?",
        options: [
            "Red",
            "Green",
            "Blue"
        ]
    }

    const onVote = (idx: number) => () => {
        alert(idx);
    }

    return (
    <PageTemplate>
        <ContentWrapper>
            <h1>{ballot.title}</h1>
            {ballot.options.map((option: string, idx: number) => (
                <Button className={styles.mb} value={option} buttonStyle={ButtonStyle.Secondary} onClick={onVote(idx)} />
            ))}
        </ContentWrapper>
    </PageTemplate>
    )
}