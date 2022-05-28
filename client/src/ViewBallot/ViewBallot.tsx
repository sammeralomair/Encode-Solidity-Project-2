import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button, { ButtonStyle } from "../Components/Button/Button";
import ContentWrapper from "../Components/ContentWrapper/ContentWrapper";
import PageTemplate from "../PageTemplate/PageTemplate";
import { getBallot } from "../Utils/BallotContract";
import { CustomBallot } from "../Utils/CustomBallot";

import styles from './ViewBallot.module.scss';

interface BallotValues {
    title: string,
    options: string[] 
}

export default function ViewBallot() {
    const { ballotAddress } = useParams();
    const [ballotContract, setBallotContract] = useState<CustomBallot | null>();
    const [ballot, setBallot] = useState<BallotValues | null>();

    useEffect(() => {
        if (!ballotAddress) {
            return;
        }

        const loadBallotContract = async () => {
            setBallotContract(await getBallot(ballotAddress));
        }
        loadBallotContract();
    }, [ballotAddress])

    useEffect(() => {
        if (!ballotContract) {
            return;
        }

        const populateBallot = async () => {
            const options = (await ballotContract.getProposals()).map(p => ethers.utils.parseBytes32String(p.name));
            setBallot({
                title: ethers.utils.parseBytes32String(await ballotContract.title()),
                options
            })
        }

        populateBallot();
    }, [ballotContract])

    const onVote = (idx: number) => () => {
        alert(idx);
    }

    return (
    <PageTemplate>
        <ContentWrapper>
            {ballot && (
            <>
                <h1>{ballot.title}</h1>
                {ballot?.options.map((option: string, idx: number) => (
                    <Button className={styles.mb} value={option} buttonStyle={ButtonStyle.Secondary} onClick={onVote(idx)} />
                ))}
            </>
            )}
            {!ballot && "No Ballot Loaded"}
        </ContentWrapper>
    </PageTemplate>
    )
}