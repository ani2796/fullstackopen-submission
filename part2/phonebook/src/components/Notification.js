const Message = function(content, type) {
    this.content = content;
    this.type = type;
}

const Notification = ({message}) => {
    const {content, type} = message;
    console.log(content, " ", type);

    if(type == null) {
        return null;
    }

    return(
    <div className={type}>
        {content}
    </div>
    )
}

export { Message, Notification };