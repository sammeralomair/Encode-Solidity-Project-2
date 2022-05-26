import ContentWrapper from "../Components/ContentWrapper/ContentWrapper";
import TextInput from "../Components/Form/TextInput/TextInput";
import PageTemplate from "../PageTemplate/PageTemplate";
import { Formik, Form, FormikProps, useField } from 'formik'
import FTextInput from "../Components/Formik/FTextInput/FTextInput";
import Button from "../Components/Button/Button";
import { useState } from "react";
import Label from "../Components/Form/Label/Label";

import styles from './CreateBallot.module.scss';
import FormGroup from "../Components/Form/FormGroup/FormGroup";

interface BallotProps {
    title: string,
    options: string[]
}

const initialValues : BallotProps = {
    title:'',
    options: []
}

export default function CreateBallot() {
    return (
    <PageTemplate>
        <ContentWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    alert(`Creating ballot titled "${values.title}" with options "${values.options.join('", "')}"`);
                }}
            >
                {(props: FormikProps<BallotProps>) => (
                    <Form>
                        <h1>Create Ballot</h1>
                        <FTextInput name="title" label="Ballot Title" />
                        <FDeletableList name="options" label="Ballot Options" />
                        <Button value="Create Ballot" onClick={() => props.handleSubmit()} />
                    </Form>
                )}
            </Formik>
        </ContentWrapper>
    </PageTemplate>
    );
}

interface FDeletableListProps {
    name: string,
    label: string
}
function FDeletableList({ name } : FDeletableListProps) {
    const [optionToAdd, setOptionToAdd] = useState('');
    const [field, _meta, helpers] = useField(name);

    const onAddItem = () => {
        helpers.setValue([...field.value, optionToAdd]);
        setOptionToAdd('');
    }

    const onDeleteItem = (idx: number) => () => {
        const values = field.value;
        values.splice(idx, 1);
        helpers.setValue([...values]) 
    }

    return (
    <FormGroup>
        <div>
            <Label for={name} label="Proposal Options" />
            <div className={styles.deletableListInput}>
                <TextInput id={name} value={optionToAdd} onChange={(e) => setOptionToAdd(e.target.value)} />
                <div className={styles.actionButton} onClick={onAddItem}>add</div>
            </div>
        </div>
        <ul>
            { field.value.map((v : any, idx : number) => (
                <li className={styles.deletableItem} key={v}>{ v } <div className={styles.actionButton} onClick={onDeleteItem(idx)}>x</div></li>
            ))}
        </ul>
    </FormGroup>
    )
}