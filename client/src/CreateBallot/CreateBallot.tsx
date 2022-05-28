import ContentWrapper from "../Components/ContentWrapper/ContentWrapper";
import TextInput from "../Components/Form/TextInput/TextInput";
import PageTemplate from "../PageTemplate/PageTemplate";
import { Formik, Form, FormikProps, useField } from 'formik'
import FTextInput from "../Components/Formik/FTextInput/FTextInput";
import Button from "../Components/Button/Button";
import { useState } from "react";
import Label from "../Components/Form/Label/Label";
import { useNavigate } from 'react-router-dom';

import styles from './CreateBallot.module.scss';
import FormGroup from "../Components/Form/FormGroup/FormGroup";
import { createBallot } from "../Utils/BallotContract";
import clsx from "clsx";

interface BallotProps {
    title: string,
    options: string[]
}

const initialValues : BallotProps = {
    title:'',
    options: []
}

export default function CreateBallot() {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    return (
    <PageTemplate>
        <ContentWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    alert(`Creating ballot titled "${values.title}" with options "${values.options.join('", "')}"`);
                    setIsCreating(true);
                    const contract = await createBallot(values.title, values.options);
                    setIsCreating(false);

                    if (!contract) {
                        alert("Failed to create contract");
                        return;
                    }

                    navigate(`/ballot/${contract?.address}`)
                }}
            >
                {(props: FormikProps<BallotProps>) => (
                    <Form>
                        <h1>Create Ballot</h1>
                        <FTextInput name="title" label="Ballot Title" disabled={isCreating} />
                        <FDeletableList name="options" label="Ballot Options" disabled={isCreating} />
                        <Button value="Create Ballot" isLoading={isCreating} onClick={() => props.handleSubmit()} />
                    </Form>
                )}
            </Formik>
        </ContentWrapper>
    </PageTemplate>
    );
}

interface FDeletableListProps {
    name: string,
    label: string,
    disabled?: boolean
}
function FDeletableList({ name, label, disabled } : FDeletableListProps) {
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
            <Label for={name} label={label} />
            <div className={styles.deletableListInput}>
                <TextInput 
                    id={name} 
                    value={optionToAdd} 
                    disabled={disabled}
                    onChange={(e) => setOptionToAdd(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && onAddItem()}
                />
                <div className={getActionButtonStyle(disabled)} onClick={onAddItem}>add</div>
            </div>
        </div>
        <ul>
            { field.value.map((v : any, idx : number) => (
                <li className={styles.deletableItem} key={v}>{ v } <div className={getActionButtonStyle(disabled)} onClick={onDeleteItem(idx)}>x</div></li>
            ))}
        </ul>
    </FormGroup>
    )
}
function getActionButtonStyle(disabled?: boolean) {
    return clsx({
        [styles.actionButton]: true,
        [styles.actionButtonDisabled]: disabled
    });
}