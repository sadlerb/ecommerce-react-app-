import './from-input.styles.scss'

function formInput({label,...otherProps}) {
    return (
        <div className="group">
            <input {...otherProps} className='form-input'/>
            {
                label &&
                <label className={`${otherProps.value.length ? 'shrink':''} form-input-label`} >{label}</label>}
            
        </div>
    )
}

export default formInput