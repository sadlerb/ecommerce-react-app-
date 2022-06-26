import {Group,FormInputLabel,Input} from './from-input.styles.jsx'

function FormInput({label,...otherProps}) {
    return (
        <Group>
            <Input {...otherProps} />
            {
                label &&
                <FormInputLabel
                shrink={otherProps.value.length}>{label}</FormInputLabel>}
            
        </Group>
    )
}

export default FormInput