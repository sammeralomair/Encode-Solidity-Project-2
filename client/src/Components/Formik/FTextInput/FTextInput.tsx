import { useField } from 'formik';
import FormGroup from '../../Form/FormGroup/FormGroup';
import Label from '../../Form/Label/Label';
import TextInput from '../../Form/TextInput/TextInput';

interface FTextInputProps {
    name: string,
    label?: string,
    disabled?: boolean
}

export default function FTextInput({ name, label, disabled } : FTextInputProps) {
    const [field] = useField(name);

    return (
        <FormGroup>
            <Label for={name} label={label} />
            <TextInput id={name} value={field.value} disabled={disabled} onChange={field.onChange(name)} />
        </FormGroup>
    )
}